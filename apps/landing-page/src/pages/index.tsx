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
  messages: IntlMessages
}

export const getStaticProps: GetStaticProps<HomePageProps> = async ({ locale }) => {
  const protocolStats = await getProtocolStats()

  const messages: IntlMessages = (await import(`../../messages/${locale}.json`)).default

  return {
    props: { protocolStats, messages },
    revalidate: SECONDS_PER_DAY
  }
}

export default function HomePage(props: HomePageProps) {
  const { protocolStats } = props

  useHydrateAtoms([[protocolStatsAtom, protocolStats]])

  return (
    <Layout>
      <HeroSection className='md:mt-[5rem]' />
      <StatsSection />
      <SavingSection />
      <MissionSection />
      <CryptoSection className='mt-[35%] md:mt-0' />
    </Layout>
  )
}
