import { NextResponse } from "next/server"

import {
  contactSubmissionSchema,
  createContactSubmission,
} from "@/services/strapi/contact.service"
import { StrapiHttpError } from "@/services/strapi/client"

/**
 * POST /api/contact
 *
 * Public endpoint that accepts a JSON contact-form payload, validates it
 * against the shared Zod schema, and forwards it to Strapi using the
 * server-side API token. Keeps the token off the client and lets Strapi
 * permissions stay locked down to authenticated requests.
 */
export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    )
  }

  const parsed = contactSubmissionSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    )
  }

  try {
    await createContactSubmission(parsed.data)
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (err) {
    if (err instanceof StrapiHttpError) {
      // Forward a sanitized message; never leak Strapi internals.
      return NextResponse.json(
        { error: "Could not save submission" },
        { status: err.status >= 500 ? 502 : err.status }
      )
    }
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 })
  }
}
