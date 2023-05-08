import { NETWORK } from 'pt-utilities'

/**
 * Token Logo URLs
 */
const tokenLogoUrls = Object.freeze({
  usdc: 'https://etherscan.io/token/images/centre-usdc_28.png',
  dai: 'https://assets.coingecko.com/coins/images/9956/small/4943.png?1636636734',
  weth: 'https://etherscan.io/token/images/weth_28.png',
  wbtc: 'https://etherscan.io/token/images/wbtc_28.png?v=1',
  gusd: 'https://assets.coingecko.com/coins/images/5992/small/gemini-dollar-gusd.png?1536745278'
})

/**
 * Token Logo Overrides
 *
 * NOTE: All addresses are lowercase
 */
export const TOKEN_LOGO_OVERRIDES: Record<NETWORK, { [address: string]: string }> = Object.freeze({
  [NETWORK.mainnet]: {
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': tokenLogoUrls.usdc
  },
  [NETWORK.goerli]: {
    '0xef8743fb2f5bea4a6e6e821895d479042a9bb5ca': tokenLogoUrls.dai,
    '0x62a918876ad2135bdcd35149c9787311d4417912': tokenLogoUrls.usdc,
    '0x1d0cde537d5ee72fb43a16027874626dd82741f3': tokenLogoUrls.gusd,
    '0x6bc6556e16654f72c097f6863418926510aa3006': tokenLogoUrls.wbtc,
    '0xe86425cfb3a55e9eb1d5f2a79f6b583e94921071': tokenLogoUrls.weth
  },
  [NETWORK.sepolia]: {},
  [NETWORK.bsc]: {},
  [NETWORK['bsc-testnet']]: {},
  [NETWORK.xdai]: {},
  [NETWORK.polygon]: {
    '0x2791bca1f2de4661ed88a30c99a7a9449aa84174': tokenLogoUrls.usdc
  },
  [NETWORK.mumbai]: {},
  [NETWORK.optimism]: {
    '0x4200000000000000000000000000000000000006': tokenLogoUrls.weth
  },
  [NETWORK['optimism-goerli']]: {},
  [NETWORK.avalanche]: {
    '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f': tokenLogoUrls.wbtc
  },
  [NETWORK.fuji]: {},
  [NETWORK.celo]: {},
  [NETWORK['celo-testnet']]: {},
  [NETWORK.arbitrum]: {},
  [NETWORK['arbitrum-goerli']]: {}
})

/**
 * TX Gas Amount Estimates
 */
export const TX_GAS_ESTIMATES = Object.freeze({
  approve: 50_000,
  deposit: 250_000,
  withdraw: 200_000
})
