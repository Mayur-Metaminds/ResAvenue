import { MapPin, Phone } from "lucide-react"

export default function OfficeLocations() {
  return (
    <section className="w-full py-10">
      <div className="flex flex-col">
        {/* India Office */}
        <div>
          <h2 className="font-plus-jakarta-700 pl-8 py-2.5 text-xl text-[#ED862E] capitalize">
            India Office
          </h2>

          <div className="mb-2 flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-orange-400" />
            <p className="font-source-sans-400 text-[16px] leading-[22.75px] text-[#FFF]">
              AvenuesAI Ltd, Level II, Plaza Asiad, S. V. Road,
              <br className="hidden sm:block" />
              Santa Cruz (West), Mumbai - 400054, India.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="mt-1 h-5 w-5 shrink-0 text-orange-400" />
            <p className="font-source-sans-400 text-[16px] leading-[22.75px] text-[#FFF]">
              +91-22-67425555 / 26000816 / 26000846 / 26491524 / 32913622 /
              66920419
            </p>
          </div>
        </div>

        {/* Dubai Office */}
        <div>
          <h2 className="font-plus-jakarta-700 pt-6 pl-8 py-2.5 text-xl text-[#ED862E] capitalize">
            Dubai Office
          </h2>

          <div className="mb-2 flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-orange-400" />
            <p className="font-source-sans-400 text-[16px] leading-[22.75px] text-[#FFF]">
              Avenues World FZ - LLC., Dubai Internet City, Building # 17, Level
              2, Office # 253,
              <br className="hidden sm:block" />
              Opp. DIC Metro Station (seaside), Dubai, United Arab Emirates
            </p>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="mt-1 h-5 w-5 shrink-0 text-orange-400" />
            <p className="font-source-sans-400 text-[16px] leading-[22.75px] text-[#FFF]">
              +971 4 5531029
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
