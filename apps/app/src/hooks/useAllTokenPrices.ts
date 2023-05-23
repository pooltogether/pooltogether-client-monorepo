import {
  useCoingeckoSimpleTokenPrices,
  useCoingeckoTokenPricesAcrossChains
} from 'pt-generic-hooks'
import { useSelectedVaults } from 'pt-hyperstructure-hooks'
import { CoingeckoTokenPrices } from 'pt-types'
import { TESTNET_TOKEN_PRICES } from 'pt-utilities'
import { PRIZE_POOLS } from '@constants/config'

/**
 * Returns token prices for all vaults' underlying tokens
 * @param currencies optional currencies array (default is ['eth'])
 * @returns
 */
export const useAllTokenPrices = () => {
  const {
    data: coingeckoSimpleTokenPrices,
    isFetched: isFetchedCoingeckoSimpleTokenPrices,
    refetch: refetchCoingeckoSimpleTokenPrices
  } = useCoingeckoSimpleTokenPrices()

  const { vaults, isFetched: isFetchedVaultData } = useSelectedVaults()

  const tokenAddresses: { [chainId: number]: `0x${string}`[] } = {}

  // Adding vault token addresses:
  if (!!vaults.underlyingTokenAddresses) {
    Object.assign(tokenAddresses, vaults.underlyingTokenAddresses.byChain)
  }

  // Adding prize token addresses:
  if (!!vaults.underlyingTokenAddresses) {
    Object.entries(PRIZE_POOLS).forEach((prizePool) => {
      const chainId = parseInt(prizePool[0])
      const prizeTokenAddress = prizePool[1].prizeTokenAddress as `0x${string}`
      if (tokenAddresses[chainId] === undefined) {
        tokenAddresses[chainId] = [prizeTokenAddress]
      } else if (!tokenAddresses[chainId].includes(prizeTokenAddress)) {
        tokenAddresses[chainId].push(prizeTokenAddress)
      }
    })
  }

  const {
    data: coingeckoTokenPrices,
    isFetched: isFetchedCoingeckoTokenPrices,
    refetch: refetchCoingeckoTokenPrices
  } = useCoingeckoTokenPricesAcrossChains(tokenAddresses)

  const data: { simple: CoingeckoTokenPrices; [chainId: number]: CoingeckoTokenPrices } = {
    simple: coingeckoSimpleTokenPrices,
    ...coingeckoTokenPrices,
    ...TESTNET_TOKEN_PRICES
  }

  const isFetched =
    isFetchedCoingeckoSimpleTokenPrices && isFetchedVaultData && isFetchedCoingeckoTokenPrices

  const refetch = () => {
    refetchCoingeckoSimpleTokenPrices()
    refetchCoingeckoTokenPrices()
  }

  return { data, isFetched, refetch }
}
