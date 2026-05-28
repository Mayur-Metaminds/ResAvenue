import ContactUsBody from "@/components/ContactUs/ContactUsBody"
import ContactUsHero from "@/components/ContactUs/ContactUsHero"
import { LogoMarquee } from "@/components/landing/LogoMarquee"

function ContactUsWrapper() {
  return (
    <div className="flex min-h-screen flex-col bg-white pb-10">
      <ContactUsHero />
      <ContactUsBody />
      <LogoMarquee />
    </div>
  )
}

export default ContactUsWrapper
