import {
  Navbar,
  Hero,
  StatsBar,
  Features,
  HowItWorks,
  AppShowcase,
  Testimonials,
  Pricing,
  FinalCTA,
  Footer,
} from '@/components/landing'

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <HowItWorks />
      <AppShowcase />
      <Testimonials />
      <Pricing />
      <FinalCTA />
      <Footer />
    </>
  )
}
