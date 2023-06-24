import { SECONDS_PER_DAY } from '@shared/utilities'
import { GetStaticProps } from 'next'
import { MainSection } from '@components/Community/MainSection'
import { Layout } from '@components/Layout'

interface CommunityPageProps {
  messages: IntlMessages
}

export const getStaticProps: GetStaticProps<CommunityPageProps> = async ({ locale }) => {
  const messages: IntlMessages = (await import(`../../messages/${locale}.json`)).default

  return {
    props: { messages },
    revalidate: SECONDS_PER_DAY
  }
}

export default function CommunityPage() {
  return (
    <Layout className='bg-pt-bg-purple-dark md:bg-transparent'>
      <MainSection className='-mt-[4.25rem] md:mt-0' />
    </Layout>
  )
}
