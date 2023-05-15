import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { BigNumber } from 'ethers'
import { useState } from 'react'
import { PrizePool } from 'pt-client-js'
import { TokenValue } from 'pt-components'
import { usePrizeDrawWinners, usePrizeTokenData } from 'pt-hyperstructure-hooks'
import { SubgraphPrizePoolDraw } from 'pt-types'
import { useSelectedPrizePool } from '@hooks/useSelectedPrizePool'

export const PrizePoolWinners = () => {
  const { selectedPrizePool } = useSelectedPrizePool()

  const { data: draws } = usePrizeDrawWinners(selectedPrizePool)

  const baseNumDraws = 6
  const [numDraws, setNumDraws] = useState<number>(baseNumDraws)

  if (!!selectedPrizePool && !!draws && draws.length > 0) {
    return (
      <div className='flex flex-col w-[36rem] gap-4 items-center px-11 py-8 bg-pt-transparent rounded-lg'>
        <span className='text-xl font-semibold'>Recent Prize Pool Winners</span>
        <ul className='flex flex-col w-full'>
          {draws.slice(0, numDraws).map((draw) => {
            return <DrawRow key={`dr-${draw.id}`} draw={draw} prizePool={selectedPrizePool} />
          })}
        </ul>
        {draws.length > numDraws && (
          <span
            className='font-semibold text-pt-purple-200 cursor-pointer'
            onClick={() => setNumDraws(numDraws + baseNumDraws)}
          >
            Show More
          </span>
        )}
      </div>
    )
  }
}

interface DrawRowProps {
  draw: SubgraphPrizePoolDraw
  prizePool: PrizePool
}

// TODO: open draw info modal when row clicked
const DrawRow = (props: DrawRowProps) => {
  const { draw, prizePool } = props

  const { data: tokenData } = usePrizeTokenData(prizePool)

  const uniqueWallets = new Set<string>(draw.prizeClaims.map((claim) => claim.winner.id))
  const totalPrizeAmount = draw.prizeClaims.reduce((a, b) => a.add(b.payout), BigNumber.from(0))

  return (
    <div className='inline-flex gap-4 justify-between px-3 py-2 font-semibold text-pt-purple-100 rounded-lg cursor-pointer whitespace-nowrap hover:bg-pt-transparent'>
      <span>Draw #{draw.id}</span>
      {!!tokenData && (
        <span className='inline-flex gap-2'>
          {uniqueWallets.size} wallet{uniqueWallets.size === 1 ? '' : 's'} won{' '}
          <span className='text-pt-purple-50'>
            <TokenValue token={{ ...tokenData, amount: totalPrizeAmount.toString() }} />
          </span>{' '}
          in prizes <ChevronRightIcon className='h-6 w-6' />
        </span>
      )}
      {!tokenData && <>-</>}
    </div>
  )
}
