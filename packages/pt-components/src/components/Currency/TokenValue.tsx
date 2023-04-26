import { BigNumber, utils } from 'ethers'
import { useMemo } from 'react'
import { useToken, useTokenPrices } from 'pt-hyperstructure-hooks'
import { TokenWithAmount } from 'pt-types'
import { Spinner } from 'pt-ui'
import { getTokenPriceFromObject } from 'pt-utilities'
import { CurrencyValue, CurrencyValueProps } from './CurrencyValue'

export interface TokenValueProps extends Omit<CurrencyValueProps, 'baseValue'> {
  token: { chainId: number; address: string } & Partial<TokenWithAmount>
}

export const TokenValue = (props: TokenValueProps) => {
  const { token, baseCurrency, ...rest } = props

  const { data: tokenData, isFetching: isFetchingTokenData } = useToken(
    token.chainId,
    token.address
  )

  const { data: tokenPrices, isFetching: isFetchingTokenPrices } = useTokenPrices(
    token.chainId,
    [token.address],
    !!baseCurrency ? [baseCurrency] : undefined
  )

  const tokenPrice = !!tokenData
    ? getTokenPriceFromObject(
        token.chainId,
        token.address,
        {
          [token.chainId]: tokenPrices ?? {}
        },
        baseCurrency
      )
    : undefined

  const tokenValue = useMemo(() => {
    if (!!tokenPrice) {
      const amount = BigNumber.from(token.amount ?? 0)
      const decimals = token.decimals ?? tokenData?.decimals
      if (!amount.isZero() && decimals !== undefined) {
        const formattedAmount = parseFloat(utils.formatUnits(amount, decimals))
        return formattedAmount * tokenPrice
      }
    }

    return 0
  }, [token, tokenData])

  if (isFetchingTokenData || isFetchingTokenPrices) {
    return <Spinner />
  }

  return <CurrencyValue baseValue={tokenValue} baseCurrency={baseCurrency} {...rest} />
}
