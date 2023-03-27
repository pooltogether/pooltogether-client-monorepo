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
    '0x208773bcde09b1835b2af2a14fa59e1f9dcd9758': tokenLogoUrls.dai,
    '0x3f304d47bbeffee5ed5aa7a1fb529e165ccca081': tokenLogoUrls.dai,
    '0x546f4d36168f90439aac3b65a366a4563c340314': tokenLogoUrls.dai,
    '0xd271423e918ff3fa328a5b3300d5c9ed07615f34': tokenLogoUrls.usdc,
    '0x12edb464540ee3100db6c694747f33232976a7df': tokenLogoUrls.usdc,
    '0x6def68cd3954a4a13ff74c578c2fd74a761a87fd': tokenLogoUrls.usdc,
    '0xd5d322390ad95c644c99d6a5badd7c2eb5afc712': tokenLogoUrls.gusd,
    '0x2cfbbd4d2b3efe316b51a0b54e9ac1ea14e3a6c1': tokenLogoUrls.gusd,
    '0xc9c958e5af0fec3c5c17e53ba533497fae3e8946': tokenLogoUrls.wbtc,
    '0xee876aa37580f1c08cb42d38716d3f49040d88f8': tokenLogoUrls.wbtc,
    '0x7d8f096a502e47d9910e654b9183b55235b6e5a6': tokenLogoUrls.weth,
    '0x9ed5697dfceea545c26f11e59cf76db4cd56ffb5': tokenLogoUrls.weth
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
