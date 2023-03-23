import Link from 'next/link'
import { CurrencyValue, NextDrawCountdown, PrizePoolCard } from 'pt-components'
import { useLargestGrandPrize, usePrizePools } from 'pt-hyperstructure-hooks'
import { Button } from 'pt-ui'
import { Layout } from '@components/Layout'
import { formatPrizePools } from '@constants'
import { useNetworks } from '@hooks/useNetworks'

export default function HomePage() {
  const networks = useNetworks()

  const prizePools = usePrizePools(formatPrizePools())
  const { data: largestGrandPrize, isFetched: isFetchedLargestGrandPrize } = useLargestGrandPrize(
    Object.values(prizePools)
  )

  // TODO: need to get prize asset info and convert gp bignumber to number

  return (
    <Layout className='gap-8'>
      <div className='flex flex-col items-center gap-3'>
        <span className='text-5xl font-averta font-semibold'>
          Deposit for a chance to win up to{' '}
          {/* <CurrencyValue baseValue={largestGrandPrize} hideZeroes={true} /> */}
        </span>
        <span className='text-pt-purple-100'>
          Deposit into prize pools for a weekly chance to win.
        </span>
      </div>
      <NextDrawCountdown />
      <Link href='/deposit' passHref={true}>
        <Button>Deposit to Win</Button>
      </Link>
      <div className='grid grid-cols-2 gap-4 bg-pt-bg-purple-dark p-4 rounded-lg'>
        {networks.map((network) => {
          return (
            <PrizePoolCard
              key={`pp-${network}`}
              chainId={network}
              href={`/deposit?network=${network}`}
            />
          )
        })}
      </div>
    </Layout>
  )
}
