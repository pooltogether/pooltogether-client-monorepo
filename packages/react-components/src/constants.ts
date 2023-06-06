import { NETWORK } from '@pooltogether/utilities'

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
  [NETWORK.goerli]: {},
  [NETWORK.sepolia]: {
    '0x501b79e61843b3432e5b48d59cb7e6a93185e50c': tokenLogoUrls.dai,
    '0x1977822061d8a394726803e2c2f6524a4e3e7aff': tokenLogoUrls.usdc,
    '0xa577c58435e0334b5039f5e71ccb4a45641c3495': tokenLogoUrls.gusd,
    '0x3bd2312250c67ca96c442fe8490a27d24d70e41c': tokenLogoUrls.wbtc,
    '0xa4de6eb323dd2f8a8b4d07b6b295dc57bb1de30a': tokenLogoUrls.weth
  },
  [NETWORK.bsc]: {},
  [NETWORK['bsc-testnet']]: {},
  [NETWORK.xdai]: {},
  [NETWORK.polygon]: {
    '0x2791bca1f2de4661ed88a30c99a7a9449aa84174': tokenLogoUrls.usdc
  },
  [NETWORK.mumbai]: {
    '0x2990cf846ec4738a672273df204cd93196d98d5f': tokenLogoUrls.dai,
    '0xa7e7dc95b2cf9311c8be9a96e8e111ccf0408add': tokenLogoUrls.usdc,
    '0x0e3ca10c2e675ee8a93a1331d54981d99107e6e8': tokenLogoUrls.gusd,
    '0x14e8733e7f178c77ed99faa08bbf042100da4268': tokenLogoUrls.wbtc,
    '0x5617889c4030db7c3fad0e4a015460e0430b454c': tokenLogoUrls.weth
  },
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
