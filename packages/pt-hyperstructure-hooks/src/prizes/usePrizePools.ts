import { BigNumber } from 'ethers'
import { useProvider } from 'wagmi'
import { PrizePool } from 'pt-client-js'
import { useProvidersByChain } from '../blockchain/useProviders'

/**
 * Returns a keyed object of prize pool IDs and `PrizePool` instances
 * @param data data for each prize pool
 * @returns
 */
export const usePrizePools = (
  data: {
    chainId: number
    address: string
    options?: { prizeTokenAddress?: string; drawPeriodInSeconds?: number; tierShares?: BigNumber }
  }[]
): { [prizePoolId: string]: PrizePool } => {
  const providers = useProvidersByChain()

  const prizePools: { [prizePoolId: string]: PrizePool } = {}
  data.forEach((prizePoolData) => {
    const provider = providers[prizePoolData.chainId]
    if (!!provider) {
      const prizePool = new PrizePool(
        prizePoolData.chainId,
        prizePoolData.address,
        provider,
        prizePoolData.options
      )
      prizePools[prizePool.id] = prizePool
    }
  })

  return prizePools
}

/**
 * Returns an instance of a `PrizePool` class
 * @param chainId the prize pool's chain ID
 * @param address the prize pool's address
 * @param options optional parameters to skip some data fetching
 * @returns
 */
export const usePrizePool = (
  chainId: number,
  address: string,
  options?: { prizeTokenAddress?: string; drawPeriodInSeconds?: number; tierShares?: BigNumber }
): PrizePool => {
  const provider = useProvider({ chainId })

  return new PrizePool(chainId, address, provider, options)
}
