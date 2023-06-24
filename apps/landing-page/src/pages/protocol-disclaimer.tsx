import { SECONDS_PER_DAY } from '@shared/utilities'
import { GetStaticProps } from 'next'
import { Layout } from '@components/Layout'
import { ProtocolDisclaimer } from '@components/ProtocolDisclaimer'

interface ProtocolDisclaimerPageProps {
  messages: IntlMessages
}

export const getStaticProps: GetStaticProps<ProtocolDisclaimerPageProps> = async ({ locale }) => {
  const messages: IntlMessages = (await import(`../../messages/${locale}.json`)).default

  return {
    props: { messages },
    revalidate: SECONDS_PER_DAY
  }
}

export default function ProtocolDisclaimerPage() {
  return (
    <Layout className='bg-pt-bg-purple-dark'>
      <ProtocolDisclaimer className='md:mt-28' />
    </Layout>
  )
}
