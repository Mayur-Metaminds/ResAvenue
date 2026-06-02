"use client"

import { useState } from "react"

import { ContactUsCheckIcon } from "../../../public/svg/commonSvg"
import {
  contactServiceOptions,
  contactSubmissionSchema,
  submitContactForm,
} from "@/services/strapi/contact.service"
import type {
  ContactFormErrors,
  ContactService,
  ContactSubmitStatus,
} from "@/types/api"

export default function ContactForm() {
  const [selected, setSelected] = useState<ContactService>("Direct Connect")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    propertyName: "",
    siteUrl: "",
    message: "",
  })
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<ContactSubmitStatus>({ kind: "idle" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof typeof formData
    const value = e.target.value
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error message systematically when user begins re-typing
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name as keyof ContactFormErrors]
        return next
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status.kind === "submitting") return

    const result = contactSubmissionSchema.safeParse({
      ...formData,
      service: selected,
    })

    if (!result.success) {
      const formattedErrors: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          formattedErrors[issue.path[0].toString()] = issue.message
        }
      })
      setErrors(formattedErrors)
      setStatus({ kind: "idle" })
      return
    }

    setErrors({})
    setStatus({ kind: "submitting" })

    try {
      await submitContactForm(result.data)
      setStatus({ kind: "success" })
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        propertyName: "",
        siteUrl: "",
        message: "",
      })
      setSelected("Direct Connect")
    } catch (err) {
      setStatus({
        kind: "error",
        message:
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
      })
    }
  }

  return (
    <section className="flex w-full items-center justify-center px-1 md:px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl rounded-[14px] md:rounded-[15px] border border-[#00000033] bg-[#FFFFFF1A] p-4 shadow-2xl backdrop-blur-xl md:p-8">
        {/* Form Grid */}
        <div className="grid grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-x-6 md:gap-y-7">
          {/* First Name */}
          <div>
            <label className="typo-body1 text-white lg:[font-family:var(--font-plus-jakarta)] lg:text-[16px] lg:leading-4">
              Name<span className="text-[#ED862E]">*</span>
            </label>

            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              className="w-full border-b border-white/30 bg-transparent py-2 text-[8.315px] text-white transition outline-none placeholder:text-[8.315px] placeholder:text-white/40 focus:border-orange-400 md:py-3 md:text-sm md:placeholder:text-sm"
            />
            {errors.firstName && (
              <p className="font-plus-jakarta-500 mt-1 text-[8.315px] text-red-400 md:text-xs">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="typo-body1 text-white lg:[font-family:var(--font-plus-jakarta)] lg:text-[16px] lg:leading-4">
              Last Name<span className="text-[#ED862E]">*</span>
            </label>

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className="w-full border-b border-white/30 bg-transparent py-2 text-[8.315px] text-white transition outline-none placeholder:text-[8.315px] placeholder:text-white/40 focus:border-orange-400 md:py-3 md:text-sm md:placeholder:text-sm"
            />
            {errors.lastName && (
              <p className="font-plus-jakarta-500 mt-1 text-[8.315px] text-red-400 md:text-xs">{errors.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="typo-body1 text-white lg:[font-family:var(--font-plus-jakarta)] lg:text-[16px] lg:leading-4">
              Email address<span className="text-[#ED862E]">*</span>
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="John@hotel.com"
              className="w-full border-b border-white/30 bg-transparent py-2 text-[8.315px] text-white transition outline-none placeholder:text-[8.315px] placeholder:text-white/40 focus:border-orange-400 md:py-3 md:text-sm md:placeholder:text-sm"
            />
            {errors.email && (
              <p className="font-plus-jakarta-500 mt-1 text-[8.315px] text-red-400 md:text-xs">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="typo-body1 text-white lg:[font-family:var(--font-plus-jakarta)] lg:text-[16px] lg:leading-4">
              Phone<span className="text-[#ED862E]">*</span>
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 88888 88888"
              className="w-full border-b border-white/30 bg-transparent py-2 text-[8.315px] text-white transition outline-none placeholder:text-[8.315px] placeholder:text-white/40 focus:border-orange-400 md:py-3 md:text-sm md:placeholder:text-sm"
            />
            {errors.phone && (
              <p className="font-plus-jakarta-500 mt-1 text-[8.315px] text-red-400 md:text-xs">{errors.phone}</p>
            )}
          </div>

          {/* Property Name */}
          <div>
            <label className="typo-body1 text-white lg:[font-family:var(--font-plus-jakarta)] lg:text-[16px] lg:leading-4">
              Property Name<span className="text-[#ED862E]">*</span>
            </label>

            <input
              type="text"
              name="propertyName"
              value={formData.propertyName}
              onChange={handleChange}
              placeholder="The Grand Resort"
              className="w-full border-b border-white/30 bg-transparent py-2 text-[8.315px] text-white transition outline-none placeholder:text-[8.315px] placeholder:text-white/40 focus:border-orange-400 md:py-3 md:text-sm md:placeholder:text-sm"
            />
            {errors.propertyName && (
              <p className="font-plus-jakarta-500 mt-1 text-[8.315px] text-red-400 md:text-xs">{errors.propertyName}</p>
            )}
          </div>

          {/* Site URL */}
          <div>
            <label className="typo-body1 text-white lg:[font-family:var(--font-plus-jakarta)] lg:text-[16px] lg:leading-4">
              Site URL
            </label>

            <input
              type="text"
              name="siteUrl"
              value={formData.siteUrl}
              onChange={handleChange}
              placeholder="https://yourcompany.com"
              className="w-full border-b border-white/30 bg-transparent py-2 text-[8.315px] text-white transition outline-none placeholder:text-[8.315px] placeholder:text-white/40 focus:border-orange-400 md:py-3 md:text-sm md:placeholder:text-sm"
            />
            {errors.siteUrl && (
              <p className="font-plus-jakarta-500 mt-1 text-[8.315px] text-red-400 md:text-xs">{errors.siteUrl}</p>
            )}
          </div>
        </div>

        {/* Services */}
        <div className="mt-6 md:mt-8">
          <h3 className="font-plus-jakarta-700 mb-4 text-[9.503px] leading-[100%] text-white lg:text-[16px]">
            Services interested in
          </h3>

          <div className="-mx-4 overflow-x-auto px-4 md:-mx-8 md:px-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max flex-nowrap gap-2 pb-2 md:gap-3">
              {contactServiceOptions.map((service) => (
                <button
                  key={service}
                  type="button"
                  onClick={() => setSelected(service)}
                  className={`shrink-0 cursor-pointer whitespace-nowrap rounded-full border px-3 py-1.5 text-[14px] leading-[19.6px] transition-all duration-200 md:px-5 md:py-2 ${selected === service
                    ? "font-plus-jakarta-700 border-white/40 bg-[#ED862E] text-white"
                    : "font-plus-jakarta-700 border-white/20 text-white hover:border-orange-400 lg:font-normal"
                    }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="mt-5 md:mt-7">
          <textarea
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write a message here..."
            className="w-full resize-none rounded-xl border border-white/10 bg-transparent px-3 py-3 text-[8.315px] text-white transition outline-none placeholder:text-[8.315px] placeholder:text-white/40 focus:border-orange-400 md:px-4 md:py-4 md:text-sm md:placeholder:text-sm"
          />
          {errors.message && (
            <p className="font-plus-jakarta-500 mt-1 text-[8.315px] text-red-400 md:text-xs">{errors.message}</p>
          )}
        </div>

        {/* Status messages */}
        {status.kind === "success" && (
          <p className="font-plus-jakarta-500 mt-5 text-center text-[10px] text-emerald-300 md:text-sm" role="status">
            Thanks — we&apos;ve received your message and will be in touch soon.
          </p>
        )}
        {status.kind === "error" && (
          <p className="font-plus-jakarta-500 mt-5 text-center text-[10px] text-red-400 md:text-sm" role="alert">
            {status.message}
          </p>
        )}

        {/* Button */}
        <div className="mt-6 flex justify-center md:mt-8">
          <button
            type="submit"
            disabled={status.kind === "submitting"}
            className="typo-body1 cursor-pointer rounded-full bg-[#ED862E] px-5 py-2.5 md:py-3 text-white font-bold shadow-lg transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60 md:px-10 md:py-4 lg:[font-family:var(--font-plus-jakarta)] lg:text-[15px] lg:leading-6 lg:font-semibold"
          >
            {status.kind === "submitting" ? "Sending…" : "Contact Resavenue →"}
          </button>
        </div>

        {/* Footer */}
        <div className="font-plus-jakarta-500 mt-5 flex items-center justify-center gap-2 text-[8.315px] leading-[14.255px] text-white md:mt-7 lg:text-[14px] lg:leading-[24px]">
          <ContactUsCheckIcon className="h-4 w-4 shrink-0" />
          <p>
            Your information is secure and will not be shared with third parties.
          </p>
        </div>
      </form>
    </section>
  )
}