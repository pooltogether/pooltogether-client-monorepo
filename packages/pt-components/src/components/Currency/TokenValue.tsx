import { BigNumber, utils } from 'ethers'
import { useMemo } from 'react'
import { useProvider } from 'wagmi'
import { useToken } from 'pt-hyperstructure-hooks'
import { TokenWithAmount, TokenWithPrice } from 'pt-types'
import { CurrencyValue, CurrencyValueProps } from './CurrencyValue'

export interface TokenValueProps extends Omit<CurrencyValueProps, 'baseValue'> {
  token: { chainId: number; address: string } & Partial<TokenWithPrice> & Partial<TokenWithAmount>
}

export const TokenValue = (props: TokenValueProps) => {
  const { token, ...rest } = props

  const provider = useProvider({ chainId: token.chainId })

  const { data: tokenData } = useToken(provider, token.address)

  const tokenValue = useMemo(() => {
    if (!!token?.price) {
      const amount = BigNumber.from(token.amount ?? 0)
      const decimals = token.decimals ?? tokenData?.decimals
      if (!amount.isZero() && decimals !== undefined) {
        const formattedAmount = parseFloat(utils.formatUnits(amount, decimals))
        return formattedAmount * token.price
      }
    }

    return 0
  }, [token, tokenData])

  return <CurrencyValue baseValue={tokenValue} {...rest} />
}
