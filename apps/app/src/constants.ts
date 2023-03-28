import { BigNumber } from 'ethers'
import { NETWORK } from 'pt-utilities'

/**
 * Supported networks
 */
export const SUPPORTED_NETWORKS = Object.freeze({
  mainnets: [NETWORK.mainnet, NETWORK.polygon, NETWORK.optimism, NETWORK.arbitrum],
  testnets: [NETWORK.goerli]
})

/**
 * Prize Pools
 */
export const PRIZE_POOLS = Object.freeze({
  [NETWORK.goerli]: {
    address: '0x13231cAe073c27F9274c15c883c51E257F5B10a2',
    prizeTokenAddress: '0xc26EF73D0cdF27D5F184DF3e05ac6e2f490ccEDf',
    drawPeriodInSeconds: 7_200,
    tierShares: BigNumber.from('100000000000000000000')
  }
})
// TODO: remove or clean up these once it is more clear how prize pools are to be conveyed to the app
export const formatPrizePools = () => {
  return Object.keys(PRIZE_POOLS).map((network) => {
    const info = PRIZE_POOLS[network] as {
      address: string
      prizeTokenAddress?: string
      drawPeriodInSeconds?: number
      tierShares?: BigNumber
    }
    return {
      chainId: parseInt(network),
      address: info.address,
      options: {
        prizeTokenAddress: info.prizeTokenAddress,
        drawPeriodInSeconds: info.drawPeriodInSeconds,
        tierShares: info.tierShares
      }
    }
  })
}

/**
 * RPCs
 */
export const RPC_URLS = {
  [NETWORK.mainnet]: process.env.MAINNET_RPC_URL,
  [NETWORK.polygon]: process.env.POLYGON_RPC_URL,
  [NETWORK.optimism]: process.env.OPTIMISM_RPC_URL,
  [NETWORK.arbitrum]: process.env.ARBITRUM_RPC_URL,
  [NETWORK.goerli]: process.env.GOERLI_RPC_URL
}
