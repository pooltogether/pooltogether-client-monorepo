export interface Token {
  chainId: number
  address: string
  symbol: string
  name: string
  decimals: number
}

export interface TokenWithUsdPrice extends Token {
  usdPrice: number
}

export interface TokenWithLogo extends Token {
  logoURI: string
}

export interface TokenWithSupply extends Token {
  totalSupply: string
}

export interface TokenWithBalance extends Token {
  balance: string
}
