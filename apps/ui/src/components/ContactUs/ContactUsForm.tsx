"use client"

import { useState } from "react"

const services = [
  "Direct Connect",
  "Channel Connect",
  "Property Management System",
]

export default function ContactForm() {
  const [selected, setSelected] = useState("Direct Connect")

  return (
    <section className="flex w-full items-center justify-center px-4">
      <div className="w-full max-w-2xl rounded-[28px] border border-[#00000033] bg-[#FFFFFF1A] p-4 shadow-2xl backdrop-blur-xl md:p-8">
        {/* Form Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 md:gap-x-6 md:gap-y-7">
          {/* First Name */}
          <div>
            <label className="text-[9.503px] leading-[100%] text-white/90 md:text-sm">
              Name<span className="text-[#ED862E]">*</span>
            </label>

            <input
              type="text"
              placeholder="First name"
              className="w-full border-b border-white/30 bg-transparent py-2 text-[8.315px] text-white transition outline-none placeholder:text-[8.315px] placeholder:text-white/40 focus:border-orange-400 md:py-3 md:text-sm md:placeholder:text-sm"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="text-[9.503px] text-white/90 md:text-sm">
              Last Name<span className="text-[#ED862E]">*</span>
            </label>

            <input
              type="text"
              placeholder="Last name"
              className="w-full border-b border-white/30 bg-transparent py-2 text-[8.315px] text-white transition outline-none placeholder:text-[8.315px] placeholder:text-white/40 focus:border-orange-400 md:py-3 md:text-sm md:placeholder:text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-[9.503px] text-white/90 md:text-sm">
              Email address<span className="text-[#ED862E]">*</span>
            </label>

            <input
              type="email"
              placeholder="John@hotel.com"
              className="w-full border-b border-white/30 bg-transparent py-2 text-[8.315px] text-white transition outline-none placeholder:text-[8.315px] placeholder:text-white/40 focus:border-orange-400 md:py-3 md:text-sm md:placeholder:text-sm"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-[9.503px] text-white/90 md:text-sm">
              Phone<span className="text-[#ED862E]">*</span>
            </label>

            <input
              type="text"
              placeholder="+91 88888 88888"
              className="w-full border-b border-white/30 bg-transparent py-2 text-[8.315px] text-white transition outline-none placeholder:text-[8.315px] placeholder:text-white/40 focus:border-orange-400 md:py-3 md:text-sm md:placeholder:text-sm"
            />
          </div>

          {/* Property Name */}
          <div>
            <label className="text-[9.503px] text-white/90 md:text-sm">
              Property Name<span className="text-[#ED862E]">*</span>
            </label>

            <input
              type="text"
              placeholder="The Grand Resort"
              className="w-full border-b border-white/30 bg-transparent py-2 text-[8.315px] text-white transition outline-none placeholder:text-[8.315px] placeholder:text-white/40 focus:border-orange-400 md:py-3 md:text-sm md:placeholder:text-sm"
            />
          </div>

          {/* Site URL */}
          <div>
            <label className="text-[9.503px] text-white/90 md:text-sm">
              Site URL
            </label>

            <input
              type="text"
              placeholder="https://yourcompany.com"
              className="w-full border-b border-white/30 bg-transparent py-2 text-[8.315px] text-white transition outline-none placeholder:text-[8.315px] placeholder:text-white/40 focus:border-orange-400 md:py-3 md:text-sm md:placeholder:text-sm"
            />
          </div>
        </div>

        {/* Services */}
        <div className="mt-6 md:mt-8">
          <h3 className="mb-3 text-[9.503px] font-medium text-white md:mb-4 md:text-sm">
            Services interested in
          </h3>

          <div className="flex flex-wrap gap-2 md:gap-3">
            {services.map((service) => (
              <button
                key={service}
                type="button"
                onClick={() => setSelected(service)}
                className={`rounded-full border px-3 py-1.5 text-[8.9px] transition-all duration-200 md:px-5 md:py-2 md:text-sm ${
                  selected === service
                    ? "border-orange-500 bg-[#ED862E] text-white"
                    : "border-white/20 text-white/80 hover:border-orange-400"
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
            placeholder="Write a message here..."
            className="w-full resize-none rounded-xl border border-white/10 bg-transparent px-3 py-3 text-[8.315px] text-white transition outline-none placeholder:text-[8.315px] placeholder:text-white/40 focus:border-orange-400 md:px-4 md:py-4 md:text-sm md:placeholder:text-sm"
          />
        </div>

        {/* Button */}
        <div className="mt-6 flex justify-center md:mt-8">
          <button className="rounded-full bg-[#ED862E] px-6 py-3 text-[8.9px] font-medium text-white shadow-lg transition hover:bg-orange-600 md:px-10 md:py-4 md:text-sm">
            Contact Resavenue →
          </button>
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-center gap-2 text-center text-[8.315px] text-white/50 md:mt-7 md:text-xs">
          <span>🛡️</span>
          <p>
            Your information is secure and will not be shared with third
            parties.
          </p>
        </div>
      </div>
    </section>
  )
}
