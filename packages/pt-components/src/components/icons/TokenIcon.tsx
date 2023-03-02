import classNames from 'classnames'
import { TokenWithLogo } from 'pt-types'
import { FallbackIcon } from './FallbackIcon'

export interface TokenIconProps {
  token: Partial<TokenWithLogo>
  className?: string
}

export const TokenIcon = (props: TokenIconProps) => {
  const { token, className } = props

  if (token.logoURI) {
    return (
      <img
        src={token.logoURI}
        alt={token.symbol ? `${token.symbol} Logo` : token.name ? `${token.name} Logo` : undefined}
        className={classNames('h-6 w-6', className)}
      />
    )
  }

  if (token.chainId && token.address) {
    // TODO: fetch token data from coingecko and display token icon
  }

  return <FallbackIcon symbol={token.symbol ?? ''} />
}
