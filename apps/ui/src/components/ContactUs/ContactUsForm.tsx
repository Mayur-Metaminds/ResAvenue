"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState } from "react"

import { ContactUsCheckIcon } from "../../../public/svg/commonSvg"
import { NextIcon } from "../../../public/svg/Contact-Us"
import { Button } from "@/components/ui/button"
import {
  contactServiceOptions,
  contactSubmissionSchema,
  mapContactFormErrors,
  submitContactForm,
} from "@/services/strapi/contact.service"
import type {
  ContactFormErrors,
  ContactService,
  ContactSubmitStatus,
} from "@/types/api"

export default function ContactForm() {
  const [selected, setSelected] = useState<ContactService[]>([])
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

  const tabsScrollRef = useRef<HTMLDivElement>(null)
  const dragStartX = useRef(0)
  const dragScrollLeft = useRef(0)
  const isDragging = useRef(false)

  const onTabsMouseDown = (e: React.MouseEvent) => {
    isDragging.current = false
    dragStartX.current = e.pageX
    dragScrollLeft.current = tabsScrollRef.current?.scrollLeft ?? 0
    tabsScrollRef.current?.setAttribute("data-pressed", "true")
  }

  const onTabsMouseMove = (e: React.MouseEvent) => {
    if (!tabsScrollRef.current?.hasAttribute("data-pressed")) return
    const delta = e.pageX - dragStartX.current
    if (Math.abs(delta) > 4) isDragging.current = true
    tabsScrollRef.current.scrollLeft = dragScrollLeft.current - delta
  }

  const onTabsMouseUp = () => {
    tabsScrollRef.current?.removeAttribute("data-pressed")
  }

  const handleServiceClick = (service: ContactService) => {
    if (!isDragging.current) {
      setSelected((prev) =>
        prev.includes(service)
          ? prev.filter((s) => s !== service)
          : [...prev, service]
      )

      if (errors.services) {
        setErrors((prev) => {
          const next = { ...prev }
          delete next.services
          return next
        })
      }
    }
  }

  const scrollTabs = (direction: "prev" | "next") => {
    const el = tabsScrollRef.current
    if (!el) return
    const amount = el.clientWidth * 0.6
    el.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    })
  }

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

  const inputClassName = (fieldName: keyof ContactFormErrors) =>
    `w-full text-white typo-body3 placeholder:text-white/60 placeholder:typo-body3 placeholder:font-normal! border-b py-[8px] outline-none md:py-[16px] ${errors[fieldName]
      ? "border-red-400 focus:border-red-400"
      : "border-[#FFF] focus:border-orange-400"
    }`

  const scrollToFirstError = () => {
    requestAnimationFrame(() => {
      document
        .querySelector("[data-field-error='true']")
        ?.scrollIntoView({ behavior: "smooth", block: "center" })
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status.kind === "submitting") return

    const result = contactSubmissionSchema.safeParse({
      ...formData,
      services: selected,
    })

    if (!result.success) {
      setErrors(mapContactFormErrors(result.error))
      setStatus({ kind: "idle" })
      scrollToFirstError()
      return
    }

    setErrors({})
    setStatus({ kind: "submitting" })

    try {
      await submitContactForm(result.data)
      setStatus({ kind: "success" })
      // setFormData({
      //   firstName: "",
      //   lastName: "",
      //   email: "",
      //   phone: "",
      //   propertyName: "",
      //   siteUrl: "",
      //   message: "",
      // })
      // setSelected([])
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
    <section className="flex w-full items-start justify-start">
      <form noValidate onSubmit={handleSubmit} className="w-full overflow-hidden rounded-[14px] md:rounded-[15px] border border-[#00000033] bg-[#FFFFFF1A] p-4 shadow-2xl backdrop-blur-xl xl:p-8">
        {/* Form Grid */}
        <div className="grid grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-x-6 md:gap-y-7">
          {/* First Name */}
          <div data-field-error={errors.firstName ? "true" : undefined}>
            <label htmlFor="firstName" className="typo-body5 font-normal! text-white">
              First Name<span className="text-[#F00]">*</span>
            </label>

            <input
              id="firstName"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="john"
              maxLength={100}
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby={errors.firstName ? "firstName-error" : undefined}
              className={inputClassName("firstName")}
            />
            {errors.firstName && (
              <p id="firstName-error" className="font-plus-jakarta-500 mt-1 text-[8.315px] text-red-400 md:text-xs">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div data-field-error={errors.lastName ? "true" : undefined}>
            <label htmlFor="lastName" className="typo-body5 font-normal! text-white">
              Last Name<span className="text-[#F00]">*</span>
            </label>

            <input
              id="lastName"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              maxLength={100}
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
              className={inputClassName("lastName")}
            />
            {errors.lastName && (
              <p id="lastName-error" className="font-plus-jakarta-500 mt-1 text-[8.315px] text-red-400 md:text-xs">{errors.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div data-field-error={errors.email ? "true" : undefined}>
            <label htmlFor="email" className="typo-body5 font-normal! text-white">
              Email<span className="text-[#F00]">*</span>
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@hotel.com"
              maxLength={254}
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={inputClassName("email")}
            />
            {errors.email && (
              <p id="email-error" className="font-plus-jakarta-500 mt-1 text-[8.315px] text-red-400 md:text-xs">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div data-field-error={errors.phone ? "true" : undefined}>
            <label htmlFor="phone" className="typo-body5 font-normal! text-white">
              Phone<span className="text-[#F00]">*</span>
            </label>

            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 88888 88888"
              maxLength={15}
              autoComplete="tel"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={inputClassName("phone")}
            />
            {errors.phone && (
              <p id="phone-error" className="font-plus-jakarta-500 mt-1 text-[8.315px] text-red-400 md:text-xs">{errors.phone}</p>
            )}
          </div>

          {/* Property Name */}
          <div data-field-error={errors.propertyName ? "true" : undefined}>
            <label htmlFor="propertyName" className="typo-body5 font-normal! text-white">
              Property Name<span className="text-[#F00]">*</span>
            </label>

            <input
              id="propertyName"
              type="text"
              name="propertyName"
              value={formData.propertyName}
              onChange={handleChange}
              placeholder="Your Hotel Name"
              maxLength={200}
              aria-invalid={Boolean(errors.propertyName)}
              aria-describedby={errors.propertyName ? "propertyName-error" : undefined}
              className={inputClassName("propertyName")}
            />
            {errors.propertyName && (
              <p id="propertyName-error" className="font-plus-jakarta-500 mt-1 text-[8.315px] text-red-400 md:text-xs">{errors.propertyName}</p>
            )}
          </div>

          {/* Site URL */}
          <div data-field-error={errors.siteUrl ? "true" : undefined}>
            <label htmlFor="siteUrl" className="typo-body5 font-normal! text-white">
              Site URL
            </label>

            <input
              id="siteUrl"
              type="url"
              name="siteUrl"
              value={formData.siteUrl}
              onChange={handleChange}
              placeholder="https://yourhotel.com"
              maxLength={500}
              aria-invalid={Boolean(errors.siteUrl)}
              aria-describedby={errors.siteUrl ? "siteUrl-error" : undefined}
              className={inputClassName("siteUrl")}
            />
            {errors.siteUrl && (
              <p id="siteUrl-error" className="font-plus-jakarta-500 mt-1 text-[8.315px] text-red-400 md:text-xs">{errors.siteUrl}</p>
            )}
          </div>
        </div>

        {/* Services */}
        <div className="my-[24px]" data-field-error={errors.services ? "true" : undefined}>
          <div className="mb-[7px] md:mb-[16px] flex items-center justify-between gap-3">
            <label className="typo-body5 font-bold! text-white">
              Services interested in<span className="text-[#F00]">*</span>
            </label>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                aria-label="Previous services"
                onClick={() => scrollTabs("prev")}
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-orange-400 hover:text-orange-400"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next services"
                onClick={() => scrollTabs("next")}
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-orange-400 hover:text-orange-400"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            ref={tabsScrollRef}
            onMouseDown={onTabsMouseDown}
            onMouseMove={onTabsMouseMove}
            onMouseUp={onTabsMouseUp}
            onMouseLeave={onTabsMouseUp}
            className="-mx-4 cursor-grab overflow-x-auto px-4 active:cursor-grabbing md:-mx-8 md:px-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex w-max flex-nowrap gap-2 pb-2 md:gap-3">
              {contactServiceOptions.map((service) => (
                <button
                  key={service}
                  type="button"
                  onClick={() => handleServiceClick(service)}
                  className={`shrink-0 cursor-pointer whitespace-nowrap rounded-full border px-3 py-1.5 leading-[19.6px] transition-all duration-200 md:px-5 md:py-2 ${selected.includes(service)
                    ? "border-white/40 bg-[#ED862E] text-white"
                    : "border-white/20 text-white hover:border-orange-400"
                    }`}
                >
                  <span className="grid">
                    <span aria-hidden="true" className="invisible col-start-1 row-start-1 font-source-sans-600 text-[16px] leading-[19.6px]">{service}</span>
                    <span className={`col-start-1 row-start-1 text-[16px] leading-[19.6px] ${selected.includes(service) ? "font-source-sans-600" : "font-source-sans-400"}`}>{service}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
          {errors.services && (
            <p id="services-error" className="font-plus-jakarta-500 mt-2 text-[8.315px] text-red-400 md:text-xs" role="alert">{errors.services}</p>
          )}
        </div>

        {/* Message */}
        <div className="mt-[12px] md:mt-[32px]" data-field-error={errors.message ? "true" : undefined}>
          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write a message here..."
            maxLength={5000}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`w-full resize-none rounded-xl border bg-transparent px-3 py-3 text-[16px] text-white transition outline-none placeholder:text-[#FFF] placeholder:typo-body5 placeholder:font-normal! p-[12px] md:p-[10px] ${errors.message
              ? "border-red-400 focus:border-red-400"
              : "border-white/10 focus:border-orange-400"
              }`}
          />
          {errors.message && (
            <p id="message-error" className="font-plus-jakarta-500 mt-1 text-[8.315px] text-red-400 md:text-xs">{errors.message}</p>
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
        <div className="mt-[24px] flex justify-center">
          <Button
            type="submit"
            disabled={status.kind === "submitting"}
            className="typo-body5 gap-[4px] md:py-[14px] md:px-[32px] py-[8px] px-[16px]"
            icon={status.kind !== "submitting" && <NextIcon />}
          >
            {status.kind === "submitting" ? "Sending…" : "Contact ResAvenue"}
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-[16px] flex sm:items-center justify-center gap-[6px] ">
          <ContactUsCheckIcon className="h-4 w-4 shrink-0" />
          <p className="typo-body3 font-normal! text-[#FFF] opacity-50 text-center">
            Your information is secure and will not be shared with third parties.
          </p>
        </div>
      </form>
    </section>
  )
}