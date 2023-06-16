import { CryptoSection } from '@components/Home/CryptoSection'
import { HeroSection } from '@components/Home/HeroSection'
import { MissionSection } from '@components/Home/MissionSection'
import { SavingSection } from '@components/Home/SavingSection'
import { StatsSection } from '@components/Home/StatsSection'
import { Layout } from '@components/Layout'

export default function HomePage() {
  return (
    <Layout>
      <HeroSection className='pt-10 md:mt-32' />
      <StatsSection />
      <SavingSection />
      <MissionSection className='pt-[105%] md:pt-0' />
      <CryptoSection className='mt-[35%] md:mt-0' />
    </Layout>
  )
}
