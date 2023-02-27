import { useCoingeckoSimpleTokenPrices, useCoingeckoTokenPricesAcrossChains } from 'pt-hooks'
import { CoingeckoTokenPrices } from 'pt-types'
import { getVaultsByChainId } from 'pt-utilities'
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

  const {
    data: coingeckoTokenPrices,
    isFetched: isFetchedCoingeckoTokenPrices,
    refetch: refetchCoingeckoTokenPrices
  } = useCoingeckoTokenPricesAcrossChains(tokenAddresses, currencies)

  const data: { simple: CoingeckoTokenPrices; [chainId: number]: CoingeckoTokenPrices } = {
    simple: coingeckoSimpleTokenPrices,
    ...coingeckoTokenPrices
  }

  const isFetched = isFetchedCoingeckoSimpleTokenPrices && isFetchedCoingeckoTokenPrices

  const refetch = async () => {
    await Promise.all([refetchCoingeckoSimpleTokenPrices(), refetchCoingeckoTokenPrices()])
  }

  return { data, isFetched, refetch }
}
