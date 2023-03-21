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
    '0xa2025b15a1757311bfd68cb14eaefcc237af5b43': tokenLogoUrls.usdc,
    '0x86aaf4df222dd89067d228d325b643c4da000860': tokenLogoUrls.usdc,
    '0x346ca12ac254b843879733b17c6ed3d9c53333f0': tokenLogoUrls.usdc,
    '0xf07e44afcacaf8d1307ef5a2405659a3e07b05a0': tokenLogoUrls.usdc,
    '0x4dfcdafcc71228bab8f1e4e95d7fad360a6fadb4': tokenLogoUrls.dai,
    '0x56159f593155e3079a2d0ae253e97c703dbe54a8': tokenLogoUrls.dai,
    '0xcfda8a87481ec851c7dc5cf23582ede0c9a7a35b': tokenLogoUrls.dai,
    '0x76196827f50e179fdc23898d3637f7a8b88e8116': tokenLogoUrls.gusd,
    '0xd13905ef313f0f8cd0855e25c566354a2b7b9780': tokenLogoUrls.gusd,
    '0xe1b3ec5885148f6f2379ede684916c8f68ab129d': tokenLogoUrls.wbtc,
    '0xf33e8157569e09a9090e058b0a6d685d394258ed': tokenLogoUrls.wbtc,
    '0xba3cfe4d6abfed02044d14f876d07722e967ec74': tokenLogoUrls.weth,
    '0x0a30769c05876521b79d61669513129abeef5b84': tokenLogoUrls.weth
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
