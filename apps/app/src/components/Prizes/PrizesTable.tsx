import { PrizePool } from 'pt-client-js'
import { TokenValue } from 'pt-components'
import { useAllPrizeInfo, usePrizeTokenData, usePrizeTokenPrice } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { formatDailyCountToFrequency, getPrizeTextFromFrequency } from 'pt-utilities'

interface PrizesTableProps {
  prizePool: PrizePool
}

export const PrizesTable = (props: PrizesTableProps) => {
  const { prizePool } = props

  const { data: allPrizeInfo, isFetched: isFetchedAllPrizeInfo } = useAllPrizeInfo([prizePool])
  const { data: tokenData, isFetched: isFetchedTokenData } = usePrizeTokenData(prizePool)
  const { tokenPrice, isFetched: isFetchedTokenPrice } = usePrizeTokenPrice(prizePool)

  return (
    <>
      <div className='flex w-[36rem] text-sm text-pt-purple-100/50 mt-8 pb-2 border-b-[0.5px] border-b-current'>
        <span className='flex-grow pl-16 text-left'>Estimated Prize Value</span>
        <span className='flex-grow pr-16 text-right'>Estimated Frequency</span>
      </div>
      {isFetchedAllPrizeInfo && isFetchedTokenData && isFetchedTokenPrice ? (
        <div className='flex flex-col gap-3 mb-8'>
          {Object.values(allPrizeInfo)[0].map((prize, i) => {
            const frequency = formatDailyCountToFrequency(prize.dailyFrequency)

            return (
              <div
                key={`pp-prizes-${prizePool.chainId}-${i}`}
                className='flex w-[36rem] items-center'
              >
                <span className='flex-grow text-3xl text-pt-teal pl-16 text-left'>
                  <TokenValue
                    token={{ ...tokenData, price: tokenPrice, balance: prize.amount.toString() }}
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
