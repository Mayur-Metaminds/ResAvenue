/**
 * contact-submission controller
 *
 * NOTE: the cast on the UID is a bootstrap workaround. Strapi only adds new
 * content-type UIDs to `types/generated/contentTypes.d.ts` after a successful
 * dist build, but the TS check rejects unknown UIDs — so the very first build
 * fails. Once Strapi has booted and regenerated the types, the cast can be
 * removed.
 */

import { factories } from "@strapi/strapi"

export default factories.createCoreController(
  "api::contact-submission.contact-submission" as never
)
