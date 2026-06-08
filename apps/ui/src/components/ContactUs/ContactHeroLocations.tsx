import { MapPin, Phone } from "lucide-react"

export default function OfficeLocations() {
  return (
    <section className="w-full py-10">
      <div className="flex flex-col">
        {/* India Office */}
        <div className="w-full">
          <h2 className="font-plus-jakarta-700 pl-8 py-2.5 text-xl text-[#ED862E] capitalize">
            India Office
          </h2>

          <div className="mb-2 flex items-start gap-4">
            <span className="flex h-[22.4px] shrink-0 items-center xl:h-[22.75px]">
              <MapPin className="h-6 w-6 text-orange-400" />
            </span>
            <p className="typo-body1 text-[#FFF] xl:text-[16px]! xl:leading-[22.75px]!">
              AvenuesAI Ltd, Level II, Plaza Asiad, S. V. Road,
              Santa Cruz (West), Mumbai - 400054, India.
            </p>
          </div>

          <div className="flex items-start gap-4">
            <span className="flex h-[22.4px] shrink-0 items-center xl:h-[22.75px]">
              <Phone className="h-6 w-6 text-orange-400" />
            </span>
            <p className="typo-body1 text-[#FFF] xl:text-[16px]! xl:leading-[22.75px]!">
              +91-22-67425555 / 26000816 / 26000846 / 26491524 / 32913622 /
              66920419
            </p>
          </div>
        </div>

        {/* Dubai Office */}
        <div className="w-full">
          <h2 className="font-plus-jakarta-700 pt-6 pl-8 py-2.5 text-xl text-[#ED862E] capitalize">
            Dubai Office
          </h2>

          <div className="mb-2 flex items-start gap-4">
            <span className="flex h-[22.4px] shrink-0 items-center xl:h-[22.75px]">
              <MapPin className="h-6 w-6 text-orange-400" />
            </span>
            <p className="typo-body1 text-[#FFF] xl:text-[16px]! xl:leading-[22.75px]!">
              Avenues World FZ - LLC., Dubai Internet City, Building # 17, Level
              2, Office # 253,
              <br className="hidden sm:block" />
              Opp. DIC Metro Station (seaside), Dubai, United Arab Emirates
            </p>
          </div>

          <div className="flex items-start gap-4">
            <span className="flex h-[22.4px] shrink-0 items-center xl:h-[22.75px]">
              <Phone className="h-6 w-6 text-orange-400" />
            </span>
            <p className="typo-body1 text-[#FFF] xl:text-[16px]! xl:leading-[22.75px]!">
              +971 4 5531029
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
