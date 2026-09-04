
import { env } from "./env"
import { emailTransporter } from "./transporter"

interface SendEmailOptions {
    to?: string | string[];
    subject: string;
    text?: string;
    html?: string;
    attachments?: {
        filename: string
        path: string
        contentType?: string
    }[]
}

export const sendEMail = async ({
    // to = env.smtp.to,
    to = "yuvrajs22it@student.mes.ac.in",
    subject,
    text,
    html,
    attachments,
  }: SendEmailOptions) => {

    await emailTransporter.sendMail({
        from: env.smtp.user,
        to,
        subject,
        text,
        html,
        attachments,
    })

  }