import { sendEMail } from "../../../../utils/email/sendEmail"
import {
  createContactSubmissionEmail,
  createContactSubmissionEmailSubject,
} from "../../../../utils/email/templates/contact-submission"

export default {
  async afterCreate(event) {
    const { result } = event

    const html = createContactSubmissionEmail(result)

    try {
      await sendEMail({
        subject: createContactSubmissionEmailSubject(result),
        html,
      })

      console.log(
        "Contact submission email sent successfully and Lifecycle called"
      )
    } catch (error) {
      console.error("Failed to send contact submission email", error)
    }
  },
}
