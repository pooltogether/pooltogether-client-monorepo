import classNames from 'classnames'
import { PrizePoolCard } from 'pt-components'
import { usePrizePools, usePrizeTokenData } from 'pt-hyperstructure-hooks'
import { getTokenPriceFromObject } from 'pt-utilities'
import { formatPrizePools } from '@constants/config'
import { useAllTokenPrices } from '@hooks/useAllTokenPrices'

export const PrizePoolCards = () => {
  const formattedPrizePoolInfo = formatPrizePools()
  const prizePools = usePrizePools(formattedPrizePoolInfo)
  const numPrizePools = formattedPrizePoolInfo.length

  // TODO: need to get data for prize pool with the largest grand prize, not assuming they are all the same
  const { data: prizeTokenData, isFetched: isFetchedPrizeTokenData } = usePrizeTokenData(
    Object.values(prizePools)[0]
  )

  const { data: tokenPrices } = useAllTokenPrices()
  const prizeTokenUsdPrice =
    isFetchedPrizeTokenData && !!prizeTokenData
      ? getTokenPriceFromObject(prizeTokenData.chainId, prizeTokenData.address, tokenPrices)
      : 0

  return (
    <div
      className={classNames('grid gap-4 bg-pt-bg-purple-dark p-4 rounded-lg', {
        'grid-cols-1': numPrizePools === 1,
        'grid-cols-2': numPrizePools % 2 === 0 && numPrizePools % 3 !== 0,
        'grid-cols-3': numPrizePools % 3 === 0
      })}
    >
      {Object.values(prizePools).map((prizePool) => {
        return (
          <PrizePoolCard
            key={`pp-${prizePool.id}`}
            prizePool={prizePool}
            tokenUsdPrice={prizeTokenUsdPrice}
            href={`/deposit?network=${prizePool.chainId}`}
          />
        )
      })}
    </div>
  )
}
