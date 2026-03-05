import Navbar from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Testimonials } from "@/components/testimonials"
import { AppointmentBooking } from "@/components/appointment-booking"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import BackToTop from "@/components/back-to-top"
import ScrollAnimation from "@/components/scroll-animation"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ScrollAnimation><Services /></ScrollAnimation>
      <ScrollAnimation><About /></ScrollAnimation>
      <ScrollAnimation><Testimonials /></ScrollAnimation>
      <ScrollAnimation><AppointmentBooking /></ScrollAnimation>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </main>
  )
}