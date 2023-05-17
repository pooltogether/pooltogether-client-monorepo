import { BigNumber, utils } from 'ethers'
import { useMemo, useState } from 'react'
import { useAccount } from 'wagmi'
import { PrizePool, Vault } from 'pt-client-js'
import {
  useAllUserVaultBalances,
  useAllVaultBalances,
  useAllVaultExchangeRates,
  useAllVaultPrizePowers,
  useSelectedVaults
} from 'pt-hyperstructure-hooks'
import { CoingeckoTokenPrices, TokenWithAmount } from 'pt-types'
import { getAssetsFromShares, getTokenPriceFromObject } from 'pt-utilities'
import { useAllTokenPrices } from './useAllTokenPrices'

export type SortId = 'prizePower' | 'totalDeposits' | 'myBalance'
type SortDirection = 'asc' | 'desc'

/**
 * Returns a sorted array of vaults
 *
 * NOTE: In order to sort by prize power, provide a prize pool in `options`.
 * @param vaults an unsorted array of vaults
 * @param options optional settings
 * @returns
 */
export const useSortedVaults = (
  vaults: Vault[],
  options?: { prizePool?: PrizePool; defaultSortId?: SortId; defaultSortDirection?: SortDirection }
) => {
  const [sortVaultsBy, setSortVaultsBy] = useState<SortId>(options?.defaultSortId ?? 'prizePower')
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    options?.defaultSortDirection ?? 'desc'
  )

  const { address: userAddress } = useAccount()

  const { vaults: selectedVaults, isFetched: isFetchedSelectedVaults } = useSelectedVaults()

  const { data: allVaultBalances, isFetched: isFetchedAllVaultBalances } =
    useAllVaultBalances(selectedVaults)

  const { data: allUserVaultBalances, isFetched: isFetchedAllUserVaultBalances } =
    useAllUserVaultBalances(selectedVaults, userAddress)

  const { data: allPrizePowers, isFetched: isFetchedAllPrizePowers } = useAllVaultPrizePowers(
    selectedVaults,
    options?.prizePool
  )

  const { data: allVaultExchangeRates, isFetched: isFetchedAllVaultExchangeRates } =
    useAllVaultExchangeRates(selectedVaults)

  const { data: allTokenPrices, isFetched: isFetchedAllTokenPrices } = useAllTokenPrices()

  const isFetched =
    isFetchedSelectedVaults &&
    isFetchedAllVaultBalances &&
    (isFetchedAllUserVaultBalances || !userAddress) &&
    (isFetchedAllPrizePowers || !options?.prizePool) &&
    isFetchedAllVaultExchangeRates &&
    isFetchedAllTokenPrices

  // TODO: take into account sortDirection
  const sortedVaults = useMemo(() => {
    if (isFetched) {
      let sortedVaults = sortVaultsByPrizePower(vaults, allPrizePowers)
      if (sortVaultsBy === 'totalDeposits') {
        sortedVaults = sortVaultsByTotalDeposits(sortedVaults, allVaultBalances, allTokenPrices)
      } else if (sortVaultsBy === 'myBalance' && !!allUserVaultBalances) {
        sortedVaults = sortVaultsByUserBalances(
          sortedVaults,
          allVaultBalances,
          allTokenPrices,
          allUserVaultBalances,
          allVaultExchangeRates
        )
      }
      return sortedVaults
    } else {
      return []
    }
  }, [vaults, sortVaultsBy, isFetched])

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
  }

  return {
    sortedVaults,
    sortVaultsBy,
    setSortVaultsBy,
    sortDirection,
    setSortDirection,
    toggleSortDirection,
    isFetched
  }
}

const sortVaultsByPrizePower = (vaults: Vault[], prizePowers: { [vaultId: string]: number }) => {
  if (!!prizePowers) {
    return vaults.sort((a, b) => (prizePowers[b.id] ?? 0) - (prizePowers[a.id] ?? 0))
  } else {
    return vaults
  }
}

const sortVaultsByTotalDeposits = (
  vaults: Vault[],
  vaultBalances: { [vaultId: string]: TokenWithAmount },
  tokenPrices: { [chainId: number]: CoingeckoTokenPrices }
) => {
  return vaults.sort((a, b) => {
    const aAmount = parseFloat(utils.formatUnits(vaultBalances[a.id]?.amount ?? '0', a.decimals))
    const bAmount = parseFloat(utils.formatUnits(vaultBalances[b.id]?.amount ?? '0', b.decimals))

    const aPrice = getTokenPriceFromObject(a.chainId, vaultBalances[a.id]?.address, tokenPrices)
    const bPrice = getTokenPriceFromObject(b.chainId, vaultBalances[b.id]?.address, tokenPrices)

    const aValue = aAmount * aPrice
    const bValue = bAmount * bPrice

    return bValue - aValue
  })
}

const sortVaultsByUserBalances = (
  vaults: Vault[],
  vaultBalances: { [vaultId: string]: TokenWithAmount },
  tokenPrices: { [chainId: number]: CoingeckoTokenPrices },
  userBalances: { [vaultId: string]: TokenWithAmount },
  exchangeRates: { [vaultId: string]: BigNumber }
) => {
  return vaults.sort((a, b) => {
    const aAmount = parseFloat(
      utils.formatUnits(
        getAssetsFromShares(
          BigNumber.from(userBalances[a.id]?.amount ?? 0),
          exchangeRates[a.id] ?? BigNumber.from(0),
          a.decimals
        ),
        a.decimals
      )
    )
    const bAmount = parseFloat(
      utils.formatUnits(
        getAssetsFromShares(
          BigNumber.from(userBalances[b.id]?.amount ?? 0),
          exchangeRates[b.id] ?? BigNumber.from(0),
          b.decimals
        ),
        b.decimals
      )
    )

    const aPrice = getTokenPriceFromObject(a.chainId, vaultBalances[a.id]?.address, tokenPrices)
    const bPrice = getTokenPriceFromObject(b.chainId, vaultBalances[b.id]?.address, tokenPrices)

    const aValue = aAmount * aPrice
    const bValue = bAmount * bPrice

    return bValue - aValue
  })
}
