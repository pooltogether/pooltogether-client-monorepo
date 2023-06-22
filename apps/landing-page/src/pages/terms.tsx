import { Layout } from '@components/Layout'
import { TermsOfService } from '@components/TermsOfService'

export default function TermsPage() {
  return (
    <Layout className='bg-pt-bg-purple-dark'>
      <TermsOfService className='md:mt-28' />
    </Layout>
  )
}
