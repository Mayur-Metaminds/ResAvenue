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
            <label className="font-plus-jakarta-500 text-[9.503px] leading-[100%] text-white lg:text-[16px]">
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
            <label className="font-plus-jakarta-500 text-[9.503px] leading-[100%] text-white lg:text-[16px]">
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
            <label className="font-plus-jakarta-500 text-[9.503px] leading-[100%] text-white lg:text-[16px]">
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
            <label className="font-plus-jakarta-500 text-[9.503px] leading-[100%] text-white lg:text-[16px]">
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
            <label className="font-plus-jakarta-500 text-[9.503px] leading-[100%] text-white lg:text-[16px]">
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
            <label className="font-plus-jakarta-500 text-[9.503px] leading-[100%] text-white lg:text-[16px]">
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
            placeholder="Write a message here..."
            className="w-full resize-none rounded-xl border border-white/10 bg-transparent px-3 py-3 text-[8.315px] text-white transition outline-none placeholder:text-[8.315px] placeholder:text-white/40 focus:border-orange-400 md:px-4 md:py-4 md:text-sm md:placeholder:text-sm"
          />
        </div>

        {/* Button */}
        <div className="mt-6 flex justify-center md:mt-8">
          <button className="font-plus-jakarta-700 cursor-pointer rounded-full bg-[#ED862E] px-6 py-3 text-[8.909px] leading-[14.255px] text-white shadow-lg transition hover:bg-orange-600 md:px-10 md:py-4 lg:text-[15px] lg:leading-6">
            Contact Resavenue →
          </button>
        </div>

        {/* Footer */}
        <div className="font-plus-jakarta-500 mt-5 flex items-center justify-center gap-2 text-[8.315px] leading-[14.255px] text-white md:mt-7 lg:text-[14px] lg:leading-[24px]">
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
