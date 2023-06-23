import { SECONDS_PER_DAY } from '@shared/utilities'
import { GetStaticProps } from 'next'
import { MainSection } from '@components/Help/MainSection'
import { Layout } from '@components/Layout'

interface HelpPageProps {
  messages: IntlMessages
}

export const getStaticProps: GetStaticProps<HelpPageProps> = async ({ locale }) => {
  const messages: IntlMessages = (await import(`../../messages/${locale}.json`)).default

  return {
    props: { messages },
    revalidate: SECONDS_PER_DAY
  }
}

export default function HelpPage() {
  return (
    <Layout className='bg-pt-bg-purple-dark'>
      <MainSection className='-mt-[4.25rem] md:mt-0' />
    </Layout>
  )
}
