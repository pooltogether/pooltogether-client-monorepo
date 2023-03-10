import { Button, ExternalLink } from 'pt-ui'
import { NETWORK } from 'pt-utilities'
import { Layout } from '@components/Layout'
import { PrizePoolDropdown } from '@components/PrizePoolDropdown'
import { PrizesTable } from '@components/Prizes/PrizesTable'

export default function PrizesPage() {
  // TODO: get selected network from dropdown and/or wallet connection
  const selectedNetwork = NETWORK.optimism

  return (
    <Layout className='gap-8 mb-20'>
      <span className='text-6xl py-2'>🏆</span>
      <PrizePoolDropdown />
      <Button href={`/deposit?network=${selectedNetwork}`}>Deposit to Win</Button>
      <PrizesTable chainId={selectedNetwork} />
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
