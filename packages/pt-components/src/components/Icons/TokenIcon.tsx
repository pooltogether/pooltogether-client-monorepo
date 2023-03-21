import classNames from 'classnames'
import { TokenWithLogo } from 'pt-types'
import { BasicIcon } from 'pt-ui'
import { NETWORK } from 'pt-utilities'
import { TOKEN_LOGO_OVERRIDES } from '../../constants'

export interface TokenIconProps {
  token: Partial<TokenWithLogo>
  className?: string
}

export const TokenIcon = (props: TokenIconProps) => {
  const { token, className } = props

  const altText = !!token.symbol
    ? `${token.symbol} Logo`
    : !!token.name
    ? `${token.name} Logo`
    : undefined

  if (token.logoURI) {
    return (
      <img
        src={token.logoURI}
        alt={altText}
        className={classNames('h-6 w-6 rounded-full', className)}
      />
    )
  }

  if (token.chainId && token.address) {
    const logoOverride =
      TOKEN_LOGO_OVERRIDES[token.chainId as NETWORK]?.[token.address.toLowerCase()]
    if (!!logoOverride) {
      return (
        <img
          src={logoOverride}
          alt={altText}
          className={classNames('h-6 w-6 rounded-full', className)}
        />
      )
    }

    // TODO: fetch token data from coingecko and display token icon
  }

  return (
    <BasicIcon
      content={!!token.symbol ? token.symbol.slice(0, 2).toUpperCase() : '?'}
      className={classNames(className)}
    />
  )
}
