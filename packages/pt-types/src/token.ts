export interface Token {
  chainId: number
  address: string
  symbol: string
  name: string
  decimals: string
}

export interface TokenWithUsdPrice extends Token {
  usdPrice: number
}

export interface TokenWithImage extends Token {
  image: string
}

export interface TokenWithSupply extends Token {
  totalSupply: string
}

export interface TokenWithBalance extends Token {
  balance: string
}
