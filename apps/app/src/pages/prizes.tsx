import { ExternalLink } from 'pt-ui'
import { Layout } from '@components/Layout'
import { PrizePoolDisplay } from '@components/Prizes/PrizePoolDisplay'

export default function PrizesPage() {
  return (
    <Layout className='gap-8'>
      <span className='text-6xl py-2'>🏆</span>
      <PrizePoolDisplay />
      {/* TODO: add link */}
      <ExternalLink
        href='#'
        text='Learn more about how prizes work'
        size='medium'
        className='text-pt-purple-300'
      />
    </Layout>
  )
}
