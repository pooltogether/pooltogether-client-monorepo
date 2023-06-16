import { MainSection } from '@components/Help/MainSection'
import { Layout } from '@components/Layout'

export default function HelpPage() {
  return (
    <Layout className='bg-pt-bg-purple-dark'>
      {/* TODO: ideally the bottom margin is based on help card content size */}
      <MainSection className='-mt-[18.5%] mb-[30rem] md:mt-0 md:mb-0' />
    </Layout>
  )
}
