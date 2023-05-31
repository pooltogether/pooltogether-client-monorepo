import { PrizePool } from 'pt-client-js'
import { TokenValueAndAmount } from 'pt-components'
import { usePrizeTokenData } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'

interface AccountWinAmountProps {
  prizePool: PrizePool
  amount: bigint
  className?: string
  valueClassName?: string
  amountClassName?: string
}

export const AccountWinAmount = (props: AccountWinAmountProps) => {
  const { prizePool, amount, className, valueClassName, amountClassName } = props

  const { data: tokenData } = usePrizeTokenData(prizePool)

  if (!tokenData) {
    return <Spinner />
  }

  return (
    <TokenValueAndAmount
      token={{ ...tokenData, amount }}
      className={className}
      valueClassName={valueClassName}
      amountClassName={amountClassName}
    />
  )
}
