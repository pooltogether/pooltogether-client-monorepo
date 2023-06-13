import { CryptoSection } from '@components/Home/CryptoSection'
import { HeroSection } from '@components/Home/HeroSection'
import { MissionSection } from '@components/Home/MissionSection'
import { SavingSection } from '@components/Home/SavingSection'
import { StatsSection } from '@components/Home/StatsSection'
import { Layout } from '@components/Layout'

export default function HomePage() {
  return (
    <Layout className='mt-32'>
      <HeroSection />
      <StatsSection />
      <SavingSection />
      <MissionSection />
      <CryptoSection />
    </Layout>
  )
}
