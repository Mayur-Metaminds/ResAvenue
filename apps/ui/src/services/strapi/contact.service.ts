import { z } from "zod"

import type {
  ContactFormErrors,
  ContactSubmissionInput,
  ContactSubmissionRecord,
  ContactSubmissionSuccessResponse,
} from "@/types/api"
import { CONTACT_SERVICE_OPTIONS } from "@/types/api"

import { strapiFetch } from "./client"
import type { StrapiResponse } from "./types"

/**
 * Re-export the enum tuple so consumers can grab schema + options from a
 * single import while the canonical declaration lives in `@/types/api`.
 */
export { CONTACT_SERVICE_OPTIONS as contactServiceOptions } from "@/types/api"

const normalizePhoneDigits = (value: string): string => value.replace(/\D/g, "")

/** Accepts 10-digit Indian mobile or +91 / 91 prefixed numbers (12 digits). */
export const isValidIndianPhone = (value: string): boolean => {
  const digits = normalizePhoneDigits(value)

  if (digits.length === 10) {
    return /^[6-9]\d{9}$/.test(digits)
  }

  if (digits.length === 12 && digits.startsWith("91")) {
    return /^91[6-9]\d{9}$/.test(digits)
  }

  return false
}

/**
 * Zod validator — mirrors the Strapi schema and the TS types in
 * `@/types/api/contact`. Used by both the form and the proxy route so
 * client and server agree on what's valid.
 */
export const contactSubmissionSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(100, "First name must be 100 characters or less"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(100, "Last name must be 100 characters or less"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .max(254, "Email must be 254 characters or less")
    .pipe(z.email("Invalid email address")),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .max(15, "Phone number is too long")
    .refine(isValidIndianPhone, {
      message: "Enter a valid 10-digit mobile number or +91 number",
    }),
  propertyName: z
    .string()
    .trim()
    .min(1, "Property name is required")
    .max(200, "Property name must be 200 characters or less"),
  siteUrl: z
    .string()
    .trim()
    .max(500, "Site URL must be 500 characters or less")
    .refine((value) => value === "" || z.url().safeParse(value).success, {
      message: "Invalid URL",
    }),
  services: z
    .array(z.enum(CONTACT_SERVICE_OPTIONS))
    .min(1, "Please select at least one service"),
  message: z
    .string()
    .trim()
    .max(5000, "Message must be 5000 characters or less")
    .optional(),
}) satisfies z.ZodType<ContactSubmissionInput>

/** Maps a Zod error to a single message per form field. */
export function mapContactFormErrors(error: z.ZodError): ContactFormErrors {
  const formatted: ContactFormErrors = {}

  for (const issue of error.issues) {
    const field = issue.path[0]
    if (typeof field === "string" && !(field in formatted)) {
      formatted[field as keyof ContactFormErrors] = issue.message
    }
  }

  return formatted
}

/**
 * Server-side: forward a validated contact submission to Strapi.
 * Called from the Next.js route handler — never from a client component.
 */
export async function createContactSubmission(input: ContactSubmissionInput) {
  return strapiFetch<StrapiResponse<ContactSubmissionRecord>>(
    "/contact-submissions",
    {
      method: "POST",
      body: { data: input },
      // Submissions must always hit Strapi — never serve a cached response.
      revalidate: false,
      tags: ["strapi", "contact-submissions"],
    }
  )
}

/**
 * Client-side: POST a contact submission through the Next.js proxy route.
 * Use this from form components. Throws on non-2xx with the server's message.
 */
export async function submitContactForm(
  input: ContactSubmissionInput
): Promise<ContactSubmissionSuccessResponse> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    let message = `Request failed (${response.status})`
    try {
      const json = (await response.json()) as { error?: string }
      if (json?.error) message = json.error
    } catch {
      // non-JSON body — keep the default message
    }
    throw new Error(message)
  }

  return (await response.json()) as ContactSubmissionSuccessResponse
}
