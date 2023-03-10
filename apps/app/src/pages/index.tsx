import { Button } from 'pt-ui'
import { CurrencyValue } from '@components/CurrencyValue'
import { Layout } from '@components/Layout'
import { NextDrawCountdown } from '@components/NextDrawCountdown'
import { PrizePoolCard } from '@components/PrizePool/PrizePoolCard'
import { useNetworks } from '@hooks/useNetworks'

export default function HomePage() {
  const networks = useNetworks()

  // TODO: get largest grand prize
  const largestGrandPrize = 5_000

  return (
    <Layout className='gap-8 mb-20'>
      <div className='flex flex-col items-center gap-3'>
        <span className='text-5xl font-semibold'>
          Deposit for a chance to win up to{' '}
          <CurrencyValue baseValue={largestGrandPrize} hideZeroes={true} />
        </span>
        <span className='text-pt-purple-100'>
          Deposit into prize pools for a weekly chance to win.
        </span>
      </div>
      <NextDrawCountdown />
      <Button href='/deposit'>Deposit to Win</Button>
      <div className='grid grid-cols-2 gap-4 bg-pt-bg-purple-dark p-4 rounded-lg'>
        {networks.map((network) => {
          return <PrizePoolCard key={`pp-${network}`} chainId={network} />
        })}
      </div>
    </Layout>
  )
}
