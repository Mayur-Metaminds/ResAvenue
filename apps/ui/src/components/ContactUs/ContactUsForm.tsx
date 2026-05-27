"use client"

import { useState } from "react"
import { z } from "zod"

const services = [
  "Direct Connect",
  "Channel Connect",
  "Property Management System",
]

// Define Zod validation schema
const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  propertyName: z.string().min(1, "Property name is required"),
  siteUrl: z.string().url("Invalid URL layout").optional().or(z.literal("")),
  service: z.string(),
  message: z.string().optional(),
})

export default function ContactForm() {
  const [selected, setSelected] = useState("Direct Connect")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    propertyName: "",
    siteUrl: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error message systematically when user begins re-typing
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const result = contactSchema.safeParse({
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
    } else {
      setErrors({})
      // Process validated payload here safely via result.data
      console.log("Form successfully validated:", result.data)
    }
  }

  return (
    <section className="flex w-full items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl rounded-[28px] border border-[#00000033] bg-[#FFFFFF1A] p-4 shadow-2xl backdrop-blur-xl md:p-8">
        {/* Form Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 md:gap-x-6 md:gap-y-7">
          {/* First Name */}
          <div>
            <label className="font-plus-jakarta-500 text-[9.503px] leading-[100%] text-white lg:text-[16px]">
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
            <label className="font-plus-jakarta-500 text-[9.503px] leading-[100%] text-white lg:text-[16px]">
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
            <label className="font-plus-jakarta-500 text-[9.503px] leading-[100%] text-white lg:text-[16px]">
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
            <label className="font-plus-jakarta-500 text-[9.503px] leading-[100%] text-white lg:text-[16px]">
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
            <label className="font-plus-jakarta-500 text-[9.503px] leading-[100%] text-white lg:text-[16px]">
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
            <label className="font-plus-jakarta-500 text-[9.503px] leading-[100%] text-white lg:text-[16px]">
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

          <div className="flex flex-wrap gap-2 md:gap-3">
            {services.map((service) => (
              <button
                key={service}
                type="button"
                onClick={() => setSelected(service)}
                className={`cursor-pointer rounded-full border px-3 py-1.5 text-[8.9px] transition-all duration-200 md:px-5 md:py-2 md:text-sm ${
                  selected === service
                    ? "font-plus-jakarta-700 border-white/40 bg-[#ED862E] text-white"
                    : "font-plus-jakarta-500 border-white/20 text-white/80 hover:border-orange-400"
                }`}
              >
                {service}
              </button>
            ))}
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

        {/* Button */}
        <div className="mt-6 flex justify-center md:mt-8">
          <button type="submit" className="font-plus-jakarta-700 cursor-pointer rounded-full bg-[#ED862E] px-6 py-3 text-[8.909px] leading-[14.255px] text-white shadow-lg transition hover:bg-orange-600 md:px-10 md:py-4 lg:text-[15px] lg:leading-6">
            Contact Resavenue →
          </button>
        </div>

        {/* Footer */}
        <div className="font-plus-jakarta-500 mt-5 flex items-center justify-center gap-2 text-[8.315px] leading-[14.255px] text-white md:mt-7 lg:text-[14px] lg:leading-[24px]">
          <span>🛡️</span>
          <p>
            Your information is secure and will not be shared with third parties.
          </p>
        </div>
      </form>
    </section>
  )
}