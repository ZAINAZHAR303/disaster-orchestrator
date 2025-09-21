import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import BenefitsSection from '@/components/BenefitsSection'
import ApplicationsSection from '@/components/ApplicationsSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <HeroSection />
      <BenefitsSection />
      <ApplicationsSection />
      <Footer />
    </div>
  )
}