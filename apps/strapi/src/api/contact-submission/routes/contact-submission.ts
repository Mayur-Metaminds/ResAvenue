/**
 * contact-submission router
 *
 * See `controllers/contact-submission.ts` for why the UID is cast as `never`.
 */

import { factories } from "@strapi/strapi"

export default factories.createCoreRouter(
  "api::contact-submission.contact-submission" as never
)
