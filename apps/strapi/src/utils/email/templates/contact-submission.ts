/** Brand palette aligned with the ResAvenue frontend (#010C28, #071330, #ED862E). */
const BRAND = {
  navy: "#010C28",
  navyDeep: "#071330",
  orange: "#ED862E",
  orangeSoft: "#FFF7ED",
  orangeText: "#C75F13",
  text: "#0F172A",
  textMuted: "#475569",
  label: "#64748B",
  placeholder: "#94A3B8",
  surface: "#F8FAFC",
  border: "#E2E8F0",
  pageBg: "#F4F6FA",
  white: "#FFFFFF",
} as const

export interface ContactSubmission {
  firstName: string
  lastName: string
  email: string
  phone: string
  propertyName: string
  siteUrl?: string | null
  services?: unknown
  message?: string | null
  createdAt?: string
}

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")

const normalizeServices = (services: unknown): string[] => {
  if (Array.isArray(services)) {
    return services.filter(Boolean).map(String)
  }

  if (typeof services === "string" && services.trim()) {
    try {
      const parsed = JSON.parse(services)
      if (Array.isArray(parsed)) {
        return parsed.filter(Boolean).map(String)
      }
    } catch {
      return [services]
    }
  }

  return []
}

const formatSubmittedAt = (createdAt?: string): string => {
  if (!createdAt) return "Just now"

  const date = new Date(createdAt)
  if (Number.isNaN(date.getTime())) return "Just now"

  return date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

export const createContactSubmissionEmailSubject = (
  contactSubmission: Pick<ContactSubmission, "propertyName">
): string => {
  const property = contactSubmission.propertyName?.trim()

  if (property) {
    return `ResAvenue · New enquiry — ${property}`
  }

  return "ResAvenue · New website enquiry"
}

const renderServicePills = (services: string[]): string => {
  if (services.length === 0) {
    return `<span style="color:${BRAND.placeholder};font-size:14px;line-height:22px;">None selected</span>`
  }

  return services
    .map(
      (service) => `
      <span
        style="
          display:inline-block;
          margin:0 8px 8px 0;
          padding:8px 14px;
          border:1px solid ${BRAND.orange};
          border-radius:999px;
          background-color:${BRAND.orangeSoft};
          color:${BRAND.orangeText};
          font-size:13px;
          line-height:18px;
          font-weight:600;
        "
      >
        ${escapeHtml(service)}
      </span>`
    )
    .join("")
}

const renderDetailCell = (
  label: string,
  valueHtml: string,
  options: { borderBottom?: boolean; width?: string } = {}
): string => {
  const { borderBottom = true, width = "50%" } = options

  return `
    <td
      width="${width}"
      style="
        width:${width};
        padding:16px 20px;
        ${borderBottom ? `border-bottom:1px solid ${BRAND.border};` : ""}
        vertical-align:top;
      "
    >
      <div style="font-size:11px;line-height:16px;font-weight:700;letter-spacing:0.6px;color:${BRAND.label};text-transform:uppercase;">
        ${label}
      </div>
      <div style="margin-top:6px;font-size:15px;line-height:22px;font-weight:600;color:${BRAND.text};">
        ${valueHtml}
      </div>
    </td>`
}

export const createContactSubmissionEmail = (
  contactSubmission: ContactSubmission
): string => {
  const {
    firstName,
    lastName,
    email,
    phone,
    propertyName,
    siteUrl,
    services,
    message,
    createdAt,
  } = contactSubmission

  const safeFirstName = escapeHtml(firstName)
  const safeLastName = escapeHtml(lastName)
  const safeEmail = escapeHtml(email)
  const safePhone = escapeHtml(phone)
  const safePropertyName = escapeHtml(propertyName)
  const fullName = `${safeFirstName} ${safeLastName}`
  const serviceList = normalizeServices(services)
  const submittedAt = formatSubmittedAt(createdAt)
  const trimmedSiteUrl = siteUrl?.trim()
  const trimmedMessage = message?.trim()
  const replySubject = encodeURIComponent(
    `Re: Your ResAvenue enquiry — ${propertyName.trim()}`
  )

  const siteUrlHtml = trimmedSiteUrl
    ? `<a href="${escapeHtml(trimmedSiteUrl)}" style="color:${BRAND.orange};text-decoration:none;font-weight:600;">${escapeHtml(trimmedSiteUrl)}</a>`
    : `<span style="color:${BRAND.placeholder};">Not provided</span>`

  const emailLinkHtml = `<a href="mailto:${safeEmail}" style="color:${BRAND.orange};text-decoration:none;font-weight:600;">${safeEmail}</a>`

  const phoneLinkHtml = `<a href="tel:${safePhone.replace(/\s+/g, "")}" style="color:${BRAND.text};text-decoration:none;font-weight:600;">${safePhone}</a>`

  const messageHtml = trimmedMessage
    ? escapeHtml(trimmedMessage).replace(/\n/g, "<br />")
    : `<span style="color:${BRAND.placeholder};">No message provided</span>`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>ResAvenue · New website enquiry</title>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.pageBg};font-family:Arial,Helvetica,sans-serif;color:${BRAND.text};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    New contact form submission for ${safePropertyName}. ${fullName} · ${serviceList.length} service${serviceList.length === 1 ? "" : "s"} selected.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin:0;padding:0;background-color:${BRAND.pageBg};">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:640px;background-color:${BRAND.white};border-radius:14px;overflow:hidden;border:1px solid ${BRAND.border};">

          <!-- Header -->
          <tr>
            <td style="padding:0;background-color:${BRAND.navy};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="height:4px;background-color:${BRAND.orange};font-size:0;line-height:0;">&nbsp;</td>
                </tr>
                <tr>
                  <td style="padding:28px 32px 24px;">
                    <div style="font-size:12px;line-height:18px;font-weight:700;letter-spacing:0.8px;color:${BRAND.orange};text-transform:uppercase;">
                      ResAvenue · Contact Form
                    </div>
                    <div style="margin-top:10px;font-size:26px;line-height:34px;font-weight:700;color:${BRAND.white};">
                      New website enquiry received
                    </div>
                    <div style="margin-top:8px;font-size:15px;line-height:23px;color:#CBD5E1;">
                      A visitor has submitted your contact form. Review the details below and respond at your earliest convenience.
                    </div>
                    <div style="margin-top:16px;font-size:13px;line-height:20px;color:#94A3B8;">
                      Received ${submittedAt}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact details -->
          <tr>
            <td style="padding:28px 32px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border:1px solid ${BRAND.border};border-radius:12px;overflow:hidden;">
                <tr>
                  <td colspan="2" style="padding:16px 20px;background-color:${BRAND.surface};border-bottom:1px solid ${BRAND.border};font-size:16px;line-height:24px;font-weight:700;color:${BRAND.navy};">
                    Contact details
                  </td>
                </tr>
                <tr>
                  ${renderDetailCell("First name", safeFirstName)}
                  ${renderDetailCell("Last name", safeLastName)}
                </tr>
                <tr>
                  ${renderDetailCell("Email", emailLinkHtml)}
                  ${renderDetailCell("Phone", phoneLinkHtml)}
                </tr>
                <tr>
                  ${renderDetailCell("Property name", safePropertyName)}
                  ${renderDetailCell("Site URL", siteUrlHtml, { borderBottom: false })}
                </tr>
              </table>
            </td>
          </tr>

          <!-- Quick actions -->
          <tr>
            <td style="padding:20px 32px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <a
                      href="mailto:${safeEmail}?subject=${replySubject}"
                      style="display:inline-block;margin:0 6px 10px;padding:12px 24px;background-color:${BRAND.orange};border-radius:8px;color:${BRAND.white};font-size:14px;line-height:20px;font-weight:700;text-decoration:none;"
                    >
                      Reply via email
                    </a>
                    <a
                      href="tel:${safePhone.replace(/\s+/g, "")}"
                      style="display:inline-block;margin:0 6px 10px;padding:11px 24px;border:1px solid ${BRAND.border};border-radius:8px;background-color:${BRAND.white};color:${BRAND.navy};font-size:14px;line-height:20px;font-weight:700;text-decoration:none;"
                    >
                      Call contact
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Services -->
          <tr>
            <td style="padding:24px 32px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border:1px solid ${BRAND.border};border-radius:12px;">
                <tr>
                  <td style="padding:18px 20px;">
                    <div style="font-size:16px;line-height:24px;font-weight:700;color:${BRAND.navy};">
                      Services interested in
                    </div>
                    <div style="margin-top:14px;line-height:0;">
                      ${renderServicePills(serviceList)}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:24px 32px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border:1px solid ${BRAND.border};border-radius:12px;">
                <tr>
                  <td style="padding:18px 20px;">
                    <div style="font-size:16px;line-height:24px;font-weight:700;color:${BRAND.navy};">
                      Message
                    </div>
                    <div style="margin-top:12px;padding:16px;background-color:${BRAND.surface};border-left:4px solid ${BRAND.orange};font-size:14px;line-height:23px;color:${BRAND.textMuted};">
                      ${messageHtml}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:18px 32px;background-color:${BRAND.navyDeep};text-align:center;">
              <div style="font-size:12px;line-height:18px;color:#94A3B8;">
                This enquiry was submitted through the ResAvenue website contact form.
              </div>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>`
}
