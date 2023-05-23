import { useAtomValue } from 'jotai'
import { parseUnits } from 'viem'
import { PrizePool, Vault } from 'pt-client-js'
import { usePrizeOdds, useVaultShareData } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { formatNumberForDisplay } from 'pt-utilities'
import { depositFormShareAmountAtom } from '../Form/DepositForm'

interface OddsProps {
  vault: Vault
  prizePool: PrizePool
}

export const Odds = (props: OddsProps) => {
  const { vault, prizePool } = props

  const formShareAmount = useAtomValue(depositFormShareAmountAtom)

  const { data: shareData } = useVaultShareData(vault)

  const { data: prizeOdds, isFetched: isFetchedPrizeOdds } = usePrizeOdds(
    prizePool,
    vault,
    !!shareData && !!formShareAmount
      ? parseUnits(`${parseFloat(formShareAmount)}`, shareData.decimals)
      : 0n,
    { isCumulative: true }
  )

  return (
    <div className='flex flex-col items-center gap-2 font-semibold'>
      <span className='text-sm text-pt-purple-100'>Daily Chance of Winning</span>
      <span className='text-xl text-pt-purple-50'>
        {isFetchedPrizeOdds && !!prizeOdds ? (
          formShareAmount !== '0' ? (
            `1 in ${formatNumberForDisplay(prizeOdds.oneInX, { maximumSignificantDigits: 3 })}`
          ) : (
            '-'
          )
        ) : (
          <Spinner />
        )}
      </span>
    </div>
  )
}
