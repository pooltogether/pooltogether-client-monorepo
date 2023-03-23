import { BigNumber } from 'ethers'
import { NETWORK } from 'pt-utilities'

/**
 * Supported networks
 */
export const SUPPORTED_NETWORKS = Object.freeze({
  mainnets: [NETWORK.mainnet, NETWORK.polygon, NETWORK.optimism, NETWORK.arbitrum],
  testnets: [NETWORK.goerli, NETWORK.mumbai, NETWORK['optimism-goerli'], NETWORK['arbitrum-goerli']]
})

/**
 * Stablecoin symbols
 */
export const STABLECOIN_SYMBOLS = Object.freeze(['USDC', 'DAI', 'GUSD'])

/**
 * Prize Pools
 */
export const PRIZE_POOLS = Object.freeze({
  [NETWORK.goerli]: {
    address: '0x29A2C67a6F3bEF9c77B59B135E528d8A49b9b1F1',
    prizeTokenAddress: '0xFfF6e20deb5cC0E66Bc697eB779f7a884ecFaB5d',
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
