"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState } from "react"

import { ContactUsCheckIcon } from "../../../public/svg/commonSvg"
import { NextIcon } from "../../../public/svg/Contact-Us"
import { Button } from "@/components/ui/button"
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
    if (!isDragging.current) setSelected(service)
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
    <section className="flex w-full items-start justify-start">
      <form onSubmit={handleSubmit} className="w-full overflow-hidden rounded-[14px] md:rounded-[15px] border border-[#00000033] bg-[#FFFFFF1A] p-4 shadow-2xl backdrop-blur-xl xl:p-8">
        {/* Form Grid */}
        <div className="grid grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-x-6 md:gap-y-7">
          {/* First Name */}
          <div>
            <label className="typo-body5 font-normal! text-white">
              First Name<span className="text-[#F00]">*</span>
            </label>

            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              className="w-full text-white typo-body3 placeholder:text-white/60 placeholder:typo-body3 placeholder:font-normal! border-b border-[#FFF] py-[8px] outline-none focus:border-orange-400 md:py-[16px]"
            />
            {errors.firstName && (
              <p className="font-plus-jakarta-500 mt-1 text-[8.315px] text-red-400 md:text-xs">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="typo-body5 font-normal! text-white">
              Last Name<span className="text-[#F00]">*</span>
            </label>

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className="w-full text-white typo-body3 placeholder:text-white/60 placeholder:typo-body3 placeholder:font-normal! border-b border-[#FFF] py-[8px] outline-none focus:border-orange-400 md:py-[16px]"
            />
            {errors.lastName && (
              <p className="font-plus-jakarta-500 mt-1 text-[8.315px] text-red-400 md:text-xs">{errors.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="typo-body5 font-normal! text-white">
              Email<span className="text-[#F00]">*</span>
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="John@hotel.com"
              className="w-full text-white typo-body3 placeholder:text-white/60 placeholder:typo-body3 placeholder:font-normal! border-b border-[#FFF] py-[8px] outline-none focus:border-orange-400 md:py-[16px]"
            />
            {errors.email && (
              <p className="font-plus-jakarta-500 mt-1 text-[8.315px] text-red-400 md:text-xs">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="typo-body5 font-normal! text-white">
              Phone<span className="text-[#F00]">*</span>
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 88888 88888"
              className="w-full text-white typo-body3 placeholder:text-white/60 placeholder:typo-body3 placeholder:font-normal! border-b border-[#FFF] py-[8px] outline-none focus:border-orange-400 md:py-[16px]"
            />
            {errors.phone && (
              <p className="font-plus-jakarta-500 mt-1 text-[8.315px] text-red-400 md:text-xs">{errors.phone}</p>
            )}
          </div>

          {/* Property Name */}
          <div>
            <label className="typo-body5 font-normal! text-white">
              Property Name<span className="text-[#F00]">*</span>
            </label>

            <input
              type="text"
              name="propertyName"
              value={formData.propertyName}
              onChange={handleChange}
              placeholder="The Grand Resort"
              className="w-full text-white typo-body3 placeholder:text-white/60 placeholder:typo-body3 placeholder:font-normal! border-b border-[#FFF] py-[8px] outline-none focus:border-orange-400 md:py-[16px]"
            />
            {errors.propertyName && (
              <p className="font-plus-jakarta-500 mt-1 text-[8.315px] text-red-400 md:text-xs">{errors.propertyName}</p>
            )}
          </div>

          {/* Site URL */}
          <div>
            <label className="typo-body5 font-normal! text-white">
              Site URL
            </label>

            <input
              type="text"
              name="siteUrl"
              value={formData.siteUrl}
              onChange={handleChange}
              placeholder="https://yourcompany.com"
              className="w-full text-white     typo-body3 placeholder:text-white/60 placeholder:typo-body3 placeholder:font-normal! border-b border-[#FFF] py-[8px] outline-none focus:border-orange-400 md:py-[16px]"
            />
            {errors.siteUrl && (
              <p className="font-plus-jakarta-500 mt-1 text-[8.315px] text-red-400 md:text-xs">{errors.siteUrl}</p>
            )}
          </div>
        </div>

        {/* Services */}
        <div className="my-[24px]">
          <div className="mb-[7px] md:mb-[16px] flex items-center justify-between gap-3">
            <label className="typo-body5 font-bold! text-white">
              Services interested in
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
                  className={`shrink-0 cursor-pointer whitespace-nowrap rounded-full border px-3 py-1.5 leading-[19.6px] transition-all duration-200 md:px-5 md:py-2 ${selected === service
                    ? "border-white/40 bg-[#ED862E] text-white"
                    : "border-white/20 text-white hover:border-orange-400"
                    }`}
                >
                  <span className="grid">
                    <span aria-hidden="true" className="invisible col-start-1 row-start-1 font-source-sans-600 text-[16px] leading-[19.6px]">{service}</span>
                    <span className={`col-start-1 row-start-1 text-[16px] leading-[19.6px] ${selected === service ? "font-source-sans-600" : "font-source-sans-400"}`}>{service}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="mt-[12px] md:mt-[32px]">
          <textarea
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write a message here..."
            className="w-full resize-none rounded-xl border border-white/10 bg-transparent px-3 py-3 text-[16px] text-white transition outline-none placeholder:text-[#FFF] placeholder:typo-body5 placeholder:font-normal! focus:border-orange-400 p-[12px] md:p-[10px] "
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
        <div className="mt-[24px] flex justify-center">
          <Button
            type="submit"
            disabled={status.kind === "submitting"}
            className="typo-body5 gap-[4px] md:py-[14px] md:px-[32px] py-[8px] px-[16px]"
            icon={status.kind !== "submitting" && <NextIcon />}
          >
            {status.kind === "submitting" ? "Sending…" : "Contact Resavenue"}
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