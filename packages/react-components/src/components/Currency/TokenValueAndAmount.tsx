import classNames from 'classnames'
import { TokenWithAmount } from 'hyperstructure-client-js'
import { useToken } from 'hyperstructure-react-hooks'
import { Spinner } from 'ui'
import { formatBigIntForDisplay } from 'utilities'
import { TokenValue } from './TokenValue'

export interface TokenValueAndAmountProps {
  token: { chainId: number; address: `0x${string}` } & Partial<TokenWithAmount>
  className?: string
  valueClassName?: string
  amountClassName?: string
}

export const TokenValueAndAmount = (props: TokenValueAndAmountProps) => {
  const { token, className, valueClassName, amountClassName } = props

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
    <div className={classNames('flex flex-col items-center', className)}>
      <span className={valueClassName}>
        <TokenValue token={token} />
      </span>
      <span className={classNames('text-pt-purple-200', amountClassName)}>
        {formatBigIntForDisplay(amount, decimals)} {symbol}
      </span>
    </div>
  )
}
