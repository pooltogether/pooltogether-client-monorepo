import { PrizePool } from 'pt-client-js'
import { TokenValueAndAmount } from 'pt-components'
import { usePrizeTokenData } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'

interface AccountWinAmountProps {
  prizePool: PrizePool
  amount: string
}

export const AccountWinAmount = (props: AccountWinAmountProps) => {
  const { prizePool, amount } = props

  const { data: tokenData } = usePrizeTokenData(prizePool)

  if (!tokenData) {
    return <Spinner />
  }

  return <TokenValueAndAmount token={{ ...tokenData, amount }} />
}
