import { useCoingeckoSimpleTokenPrices, useCoingeckoTokenPrices } from 'pt-hooks'
import { CoingeckoTokenPrices } from 'pt-types'
import { getVaultsByChainId, NETWORK } from 'pt-utilities'
import { SUPPORTED_NETWORKS } from '@constants/networks'
import defaultVaultList from '@data/defaultVaultList'

/**
 * Returns token prices from CoinGecko for all SUPPORTED_NETWORKS
 * @param currencies optional currencies array (default is ['usd'])
 * @returns
 */
export const useAllCoingeckoTokenPrices = (currencies: string[] = ['usd']) => {
  const {
    data: coingeckoSimpleTokenPrices,
    isFetched: isFetchedCoingeckoSimpleTokenPrices,
    refetch: refetchCoingeckoSimpleTokenPrices
  } = useCoingeckoSimpleTokenPrices(currencies)

  const tokenAddresses: { [chainId: number]: string[] } = {}
  SUPPORTED_NETWORKS.mainnets.forEach((network) => {
    const vaults = getVaultsByChainId(network, defaultVaultList)
    tokenAddresses[network] = vaults.map((vault) => vault.extensions.underlyingAsset.address)
  })

  // TODO: need a better way to query coingecko for all SUPPORTED_NETWORKS
  const {
    data: ethCoingeckoTokenPrices,
    isFetched: isFetchedEthCoingeckoTokenPrices,
    refetch: refetchEthCoingeckoTokenPrices
  } = useCoingeckoTokenPrices(NETWORK.mainnet, tokenAddresses[NETWORK.mainnet], currencies)
  const {
    data: polyCoingeckoTokenPrices,
    isFetched: isFetchedPolyCoingeckoTokenPrices,
    refetch: refetchPolyCoingeckoTokenPrices
  } = useCoingeckoTokenPrices(NETWORK.polygon, tokenAddresses[NETWORK.polygon], currencies)
  const {
    data: opCoingeckoTokenPrices,
    isFetched: isFetchedOpCoingeckoTokenPrices,
    refetch: refetchOpCoingeckoTokenPrices
  } = useCoingeckoTokenPrices(NETWORK.optimism, tokenAddresses[NETWORK.optimism], currencies)
  const {
    data: arbCoingeckoTokenPrices,
    isFetched: isFetchedArbCoingeckoTokenPrices,
    refetch: refetchArbCoingeckoTokenPrices
  } = useCoingeckoTokenPrices(NETWORK.arbitrum, tokenAddresses[NETWORK.arbitrum], currencies)

  const data: { simple: CoingeckoTokenPrices; [chainId: number]: CoingeckoTokenPrices } = {
    simple: coingeckoSimpleTokenPrices,
    [NETWORK.mainnet]: ethCoingeckoTokenPrices,
    [NETWORK.polygon]: polyCoingeckoTokenPrices,
    [NETWORK.optimism]: opCoingeckoTokenPrices,
    [NETWORK.arbitrum]: arbCoingeckoTokenPrices
  }

  const isFetched =
    isFetchedCoingeckoSimpleTokenPrices &&
    isFetchedEthCoingeckoTokenPrices &&
    isFetchedPolyCoingeckoTokenPrices &&
    isFetchedOpCoingeckoTokenPrices &&
    isFetchedArbCoingeckoTokenPrices

  const refetch = async () => {
    await Promise.all([
      refetchCoingeckoSimpleTokenPrices(),
      refetchEthCoingeckoTokenPrices(),
      refetchPolyCoingeckoTokenPrices(),
      refetchOpCoingeckoTokenPrices(),
      refetchArbCoingeckoTokenPrices()
    ])
  }

  return { data, isFetched, refetch }
}
