/**
 * Type definitions for the public contact form. Shared by:
 *   - the React form (apps/ui/src/components/ContactUs/ContactUsForm.tsx)
 *   - the Zod schema + service wrappers (apps/ui/src/services/strapi/contact.service.ts)
 *   - the Next.js proxy route (apps/ui/src/app/api/contact/route.ts)
 *
 * Keep this file in lockstep with the Strapi schema at:
 *   apps/strapi/src/api/contact-submission/content-types/contact-submission/schema.json
 */

import type { APIResponse } from "."

/**
 * Allowed `services` values. Declared as a `readonly` tuple so it can power
 * both the Zod `enum` and the TypeScript union below without drift.
 */
export const CONTACT_SERVICE_OPTIONS = [
  "Direct Connect",
  "Revenue Management",
  "Website Builder",
  "Channel Connect",
  "Distribution Network",
  "Tours & Packages Engine",
  "Property Management System",
  "Event Management",
  "Mobile App Ecosystem",
] as const

export type ContactService = (typeof CONTACT_SERVICE_OPTIONS)[number]

/** Payload accepted by `POST /api/contact` (and by Strapi after the proxy). */
export interface ContactSubmissionInput {
  firstName: string
  lastName: string
  email: string
  phone: string
  propertyName: string
  /** Optional. Empty string is also accepted by the schema. */
  siteUrl?: string
  services: ContactService[]
  message?: string
}

/** Persisted Strapi record. Strapi v5 — fields are flat on the entity. */
export interface ContactSubmissionRecord extends ContactSubmissionInput {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
}

/** Raw response from Strapi for a single contact-submission entity. */
export type ContactSubmissionStrapiResponse =
  APIResponse<ContactSubmissionRecord>

/** Success body returned by the Next.js proxy route. */
export interface ContactSubmissionSuccessResponse {
  ok: true
}

/** Validation-failure body returned by the proxy (HTTP 422). */
export interface ContactSubmissionValidationErrorResponse {
  error: "Validation failed"
  issues: Partial<Record<keyof ContactSubmissionInput, string[]>>
}

/** Generic upstream / transport failure returned by the proxy. */
export interface ContactSubmissionErrorResponse {
  error: string
}

export type ContactSubmissionResponse =
  | ContactSubmissionSuccessResponse
  | ContactSubmissionValidationErrorResponse
  | ContactSubmissionErrorResponse

/** UI state machine for the form submit lifecycle. */
export type ContactSubmitStatus =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string }

/** Per-field validation error map keyed by `ContactSubmissionInput` keys. */
export type ContactFormErrors = Partial<
  Record<keyof ContactSubmissionInput, string>
>
