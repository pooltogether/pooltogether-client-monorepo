import { SECONDS_PER_DAY } from '@shared/utilities'
import { useHydrateAtoms } from 'jotai/utils'
import { GetStaticProps } from 'next'
import { protocolStatsAtom } from 'src/serverAtoms'
import { ProtocolStats } from 'src/types'
import { getProtocolStats } from 'src/utils'
import { CryptoSection } from '@components/Home/CryptoSection'
import { HeroSection } from '@components/Home/HeroSection'
import { MissionSection } from '@components/Home/MissionSection'
import { SavingSection } from '@components/Home/SavingSection'
import { StatsSection } from '@components/Home/StatsSection'
import { Layout } from '@components/Layout'

interface HomePageProps {
  protocolStats: ProtocolStats
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const protocolStats = await getProtocolStats()

  return {
    props: { protocolStats },
    revalidate: SECONDS_PER_DAY
  }
}

export default function HomePage(props: HomePageProps) {
  const { protocolStats } = props

  useHydrateAtoms([[protocolStatsAtom, protocolStats]])

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
