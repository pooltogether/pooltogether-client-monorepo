import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { BigNumber } from 'ethers'
import { useState } from 'react'
import { TokenValue } from 'pt-components'
import { PrizePoolDraw, usePrizePoolDraws } from '@hooks/usePrizePoolDraws'
import { useSelectedPrizePool } from '@hooks/useSelectedPrizePool'

export const PrizePoolWinners = () => {
  const { selectedPrizePool } = useSelectedPrizePool()

  const { data: draws } = usePrizePoolDraws(selectedPrizePool)

  const baseNumDraws = 6
  const [numDraws, setNumDraws] = useState<number>(baseNumDraws)

  if (!!draws && draws.length > 0) {
    return (
      <div className='flex flex-col w-[36rem] gap-4 items-center px-11 py-8 bg-pt-transparent rounded-lg'>
        <span className='text-xl font-semibold'>Recent Prize Pool Winners</span>
        <ul className='flex flex-col w-full gap-4 px-3 py-2'>
          {draws.slice(0, numDraws).map((draw) => {
            return <DrawRow key={`dr-${draw.id}`} draw={draw} />
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
  draw: PrizePoolDraw
}

// TODO: row hover effect
// TODO: open draw info modal when row clicked
const DrawRow = (props: DrawRowProps) => {
  const { draw } = props

  const uniqueWallets = new Set<string>(draw.prizes.map((prize) => prize.winner))
  const totalPrizeAmount = draw.prizes.reduce((a, b) => a.add(b.token.amount), BigNumber.from(0))

  const token = draw.prizes[0]?.token

  return (
    <div className='inline-flex gap-4 justify-between font-semibold text-pt-purple-100 whitespace-nowrap'>
      <span>Draw #{draw.id}</span>
      {!!token && (
        <span className='inline-flex gap-2'>
          {uniqueWallets.size} wallet{uniqueWallets.size === 1 ? '' : 's'} won{' '}
          <span className='text-pt-purple-50'>
            <TokenValue token={{ ...token, amount: totalPrizeAmount.toString() }} />
          </span>{' '}
          in prizes <ChevronRightIcon className='h-6 w-6' />
        </span>
      )}
      {!token && <>-</>}
    </div>
  )
}
