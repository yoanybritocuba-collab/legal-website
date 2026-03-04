import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { AppointmentBooking } from "@/components/appointment-booking"
import { CtaBanner } from "@/components/cta-banner"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <AppointmentBooking />
      <CtaBanner />
      <Testimonials />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
