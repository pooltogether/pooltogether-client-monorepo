import { BigNumber, utils } from 'ethers'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { useTokenBalancesAcrossChains, useVaultBalances } from 'pt-hooks'
import { VaultInfo } from 'pt-types'
import { Button } from 'pt-ui'
import { getVaultId, getVaultUnderlyingTokensFromVaultList } from 'pt-utilities'
import { VAULT_FILTER_ID, VAULT_FILTERS } from '@constants/filters'
import defaultVaultList from '@data/defaultVaultList'
import { useAllCoingeckoTokenPrices } from '@hooks/useAllCoingeckoTokenPrices'
import { useProviders } from '@hooks/useProviders'

interface VaultFiltersProps {
  onFilter: (filteredVaults: VaultInfo[]) => void
}

// TODO: add chain-specific filters with logos instead of names
export const VaultFilters = (props: VaultFiltersProps) => {
  const providers = useProviders()
  // const { data: vaultBalances, isFetched: isFetchedVaultBalances } = useVaultBalances(
  //   providers,
  //   defaultVaultList
  // )

  const vaultUnderlyingTokenAddresses = getVaultUnderlyingTokensFromVaultList(defaultVaultList)

  const { address: userAddress } = useAccount()
  const { data: userTokenBalances, isFetched: isFetchedUserTokenBalances } =
    useTokenBalancesAcrossChains(providers, userAddress, vaultUnderlyingTokenAddresses)

  const { data: tokenPrices, isFetched: isFetchedTokenPrices } = useAllCoingeckoTokenPrices()

  const [filterId, setFilterId] = useState<VAULT_FILTER_ID>('all')

  const filterIds = Object.keys(VAULT_FILTERS) as VAULT_FILTER_ID[]

  useEffect(() => {
    let filteredVaults: VaultInfo[] = [...defaultVaultList.tokens]

    switch (filterId) {
      case 'popular': {
        filteredVaults = defaultVaultList.tokens.filter((vault) => {
          const usdPrice =
            isFetchedTokenPrices && !!tokenPrices
              ? tokenPrices[vault.chainId][
                  vault.extensions.underlyingAsset.address.toLowerCase()
                ]?.['usd'] ?? 0
              : 0
          // const vaultId = getVaultId(vault)
          // const tokenAmount = isFetchedVaultBalances && !!vaultBalances ? vaultBalances[vaultId] : 0
          // TODO: remove this once vaults are setup (and uncomment code above):
          const tokenAmount = utils.parseUnits('50000', vault.decimals)
          const formattedTokenAmount = Number(utils.formatUnits(tokenAmount, vault.decimals))
          return VAULT_FILTERS[filterId].validation(formattedTokenAmount * usdPrice)
        })
        break
      }
      case 'stablecoin': {
        filteredVaults = defaultVaultList.tokens.filter((vault) =>
          VAULT_FILTERS[filterId].validation(vault)
        )
        break
      }
      case 'userWallet': {
        filteredVaults = defaultVaultList.tokens.filter((vault) => {
          const userWalletBalance = BigNumber.from(
            isFetchedUserTokenBalances && !!userTokenBalances
              ? userTokenBalances[vault.chainId]?.[vault.extensions.underlyingAsset.address]
                  ?.balance ?? 0
              : 0
          )
          return VAULT_FILTERS[filterId].validation(userWalletBalance)
        })
        break
      }
    }

    props.onFilter(filteredVaults)
  }, [filterId])

  // TODO: use tabs from flowbite once they are setup
  return (
    <div>
      <span>Filter</span>
      {filterIds.map((id) => {
        if (id === 'popular' && !isFetchedTokenPrices) return
        if (id === 'userWallet' && !isFetchedUserTokenBalances) return
        return (
          <Button onClick={() => setFilterId(id)} theme={'purple'} key={`bt-filter-${id}`}>
            {VAULT_FILTERS[id].name}
          </Button>
        )
      })}
    </div>
  )
}
