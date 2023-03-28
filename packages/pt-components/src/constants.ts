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
    '0x84f2acce713207b6f3b6bdad67a122d225279a9a': tokenLogoUrls.dai,
    '0x61e0a5e77db8e659c8753630046025876414715d': tokenLogoUrls.dai,
    '0xb49f1bbd905a7a869dd50c1df7d42e7907bce7b4': tokenLogoUrls.dai,
    '0xc6db350c20fb957c30c9d9661e33686be38ad3fb': tokenLogoUrls.usdc,
    '0x8b6d7fcce0455872631e5fe1b793a1ce154556a0': tokenLogoUrls.usdc,
    '0xa07af90b215b4edccabc99dd45cca6d1127790ec': tokenLogoUrls.usdc,
    '0xad1d0f9964dbf3596bd93d3f8b630ae813b7a8f6': tokenLogoUrls.gusd,
    '0x0ea26b1023ace3dcbbc2a11343b7a188bc4b5b9c': tokenLogoUrls.gusd,
    '0x46d2df182fe9d47d4705ab5ce117fe4f871df0e6': tokenLogoUrls.wbtc,
    '0x50f7638aae955ec17d1173d8aaca69923923afc6': tokenLogoUrls.wbtc,
    '0x1d2c74dec8e8d2c9673dcda26b2890f434e46780': tokenLogoUrls.weth,
    '0xe322f82175964b8dfaebac6c448442a176eef492': tokenLogoUrls.weth
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
