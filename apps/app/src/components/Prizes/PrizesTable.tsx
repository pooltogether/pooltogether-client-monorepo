import { utils } from 'ethers'
import { CurrencyValue } from 'pt-components'
import { useAllPrizeInfo, usePrizePool, usePrizeTokenData } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { formatDailyCountToFrequency, getPrizeTextFromFrequency, NETWORK } from 'pt-utilities'
import { PRIZE_POOLS } from '@constants'

interface PrizesTableProps {
  chainId: NETWORK
}

export const PrizesTable = (props: PrizesTableProps) => {
  const { chainId } = props

  const prizePool = usePrizePool(chainId, PRIZE_POOLS[chainId].address, {
    prizeTokenAddress: PRIZE_POOLS[chainId].prizeTokenAddress
  })

  const { data: allPrizeInfo, isFetched: isFetchedAllPrizeInfo } = useAllPrizeInfo([prizePool])
  const { data: prizeTokenData, isFetched: isFetchedPrizeTokenData } = usePrizeTokenData(prizePool)

  return (
    <>
      <div className='flex w-[36rem] text-sm text-pt-purple-100/50 mt-8 pb-2 border-b-[0.5px] border-b-current'>
        <span className='flex-grow pl-16 text-left'>Estimated Prize Value</span>
        <span className='flex-grow pr-16 text-right'>Estimated Frequency</span>
      </div>
      {isFetchedAllPrizeInfo && isFetchedPrizeTokenData ? (
        <div className='flex flex-col gap-3 mb-8'>
          {Object.values(allPrizeInfo)[0].map((prize, i) => {
            const frequency = formatDailyCountToFrequency(prize.dailyFrequency)

            return (
              <div
                key={`pp-prizes-${prizePool.chainId}-${i}`}
                className='flex w-[36rem] items-center'
              >
                <span className='flex-grow text-3xl text-pt-teal pl-16 text-left'>
                  <CurrencyValue
                    baseValue={utils.formatUnits(prize.amount, prizeTokenData.decimals)}
                    hideZeroes={true}
                  />
                </span>
                <span className='flex-grow text-xl text-pt-purple-100 pr-16 text-right'>
                  {getPrizeTextFromFrequency(frequency, 'daily')}
                </span>
              </div>
            )
          })}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  )
}
