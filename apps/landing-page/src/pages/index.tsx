import { CryptoSection } from '@components/Home/CryptoSection'
import { HeroSection } from '@components/Home/HeroSection'
import { MissionSection } from '@components/Home/MissionSection'
import { SavingSection } from '@components/Home/SavingSection'
import { StatsSection } from '@components/Home/StatsSection'
import { Layout } from '@components/Layout'

export default function HomePage() {
  return (
    <Layout>
      {/* TODO: this margin should be a % on mobile */}
      <HeroSection className='mt-28 md:mt-32' />
      <StatsSection />
      <SavingSection />
      <MissionSection className='pt-[105%] md:pt-0' />
      {/* TODO: this margin should be a % on mobile */}
      <CryptoSection className='mt-32 md:mt-0' />
    </Layout>
  )
}
