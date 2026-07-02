import { z } from "zod"

import type {
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

/**
 * Zod validator — mirrors the Strapi schema and the TS types in
 * `@/types/api/contact`. Used by both the form and the proxy route so
 * client and server agree on what's valid.
 */
export const contactSubmissionSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  email: z.email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required").max(32),
  propertyName: z.string().min(1, "Property name is required").max(200),
  siteUrl: z.url("Invalid URL").max(500).optional().or(z.literal("")),
  service: z.array(z.enum(CONTACT_SERVICE_OPTIONS)).min(1, "Please select at least one service"),
  message: z.string().optional(),
}) satisfies z.ZodType<ContactSubmissionInput>

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
