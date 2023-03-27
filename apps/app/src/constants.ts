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
    address: '0xabfc9363B8ac86D0E638480FEf0bf078DDf49B40',
    prizeTokenAddress: '0x6D2C34B059c0146CEf7b655fB166c02212967884',
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
