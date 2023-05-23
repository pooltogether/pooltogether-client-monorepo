import { useToken } from 'pt-hyperstructure-hooks'
import { TokenWithAmount } from 'pt-types'
import { Spinner } from 'pt-ui'
import { formatBigIntForDisplay } from 'pt-utilities'
import { TokenValue } from './TokenValue'

export interface TokenValueAndAmountProps {
  token: { chainId: number; address: string } & Partial<TokenWithAmount>
}

export const TokenValueAndAmount = (props: TokenValueAndAmountProps) => {
  const { token } = props

  const { data: tokenData, isFetching: isFetchingTokenData } = useToken(
    token.chainId,
    token.address
  )

  const amount = token.amount ?? 0n
  const decimals = token.decimals ?? tokenData?.decimals
  const symbol = token.symbol ?? tokenData?.symbol

  if (isFetchingTokenData || decimals === undefined || !symbol) {
    return <Spinner />
  }

  return (
    <div className='flex flex-col items-center'>
      <TokenValue token={token} />
      <span className='text-sm text-pt-purple-200'>
        {formatBigIntForDisplay(amount, decimals)} {symbol}
      </span>
    </div>
  )
}
