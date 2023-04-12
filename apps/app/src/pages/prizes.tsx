import { ExternalLink } from 'pt-ui'
import { Layout } from '@components/Layout'
import { PrizePoolDisplay } from '@components/Prizes/PrizePoolDisplay'
import { PrizePoolWinners } from '@components/Prizes/PrizePoolWinners'

export default function PrizesPage() {
  return (
    <Layout className='gap-8'>
      <span className='text-6xl py-2'>🏆</span>
      <PrizePoolDisplay />
      {/* TODO: add link */}
      <ExternalLink
        href='#'
        text='Learn more about how prizes work'
        className='text-pt-purple-300'
      />
      <PrizePoolWinners />
    </Layout>
  )
}
