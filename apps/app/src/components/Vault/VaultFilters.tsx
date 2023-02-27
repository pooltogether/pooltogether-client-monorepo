import { utils } from 'ethers'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { useVaultBalances } from 'pt-hooks'
import { VaultInfo } from 'pt-types'
import { Button } from 'pt-ui'
import { getVaultId } from 'pt-utilities'
import { VAULT_FILTER_ID, VAULT_FILTERS } from '@constants/filters'
import defaultVaultList from '@data/defaultVaultList'
import { useAllCoingeckoTokenPrices } from '@hooks/useAllCoingeckoTokenPrices'
import { useProviders } from '@hooks/useProviders'

interface VaultFiltersProps {
  onFilter: (filteredVaults: VaultInfo[]) => void
}

export const VaultFilters = (props: VaultFiltersProps) => {
  // const providers = useProviders()
  // const { data: vaultBalances, isFetched: isFetchedVaultBalances } = useVaultBalances(
  //   providers,
  //   defaultVaultList
  // )

  // const { address: userAddress } = useAccount()

  const { data: tokenPrices, isFetched: isFetchedTokenPrices } = useAllCoingeckoTokenPrices()

  const [filterId, setFilterId] = useState<VAULT_FILTER_ID>('all')

  const filterIds = Object.keys(VAULT_FILTERS) as VAULT_FILTER_ID[]
  const vaults = defaultVaultList.tokens

  useEffect(() => {
    let filteredVaults: VaultInfo[] = [...vaults]

    switch (filterId) {
      case 'popular': {
        filteredVaults = vaults.filter((vault) => {
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
        filteredVaults = vaults.filter((vault) => VAULT_FILTERS[filterId].validation(vault))
        break
      }
      case 'userWallet': {
        filteredVaults = vaults.filter((vault) => {
          // TODO: need `useTokenBalancesAcrossChains`
          // return VAULT_FILTERS[filterId].validation()
          return false
        })
        break
      }
    }

    props.onFilter(filteredVaults)
  }, [filterId])

  // TODO: need to hide some filters until the data they need to work is fetched
  // TODO: use tabs from flowbite once they are setup
  return (
    <div>
      <span>Filter</span>
      {filterIds.map((id) => {
        return (
          <Button onClick={() => setFilterId(id)} theme={'purple'} key={`bt-filter-${id}`}>
            {VAULT_FILTERS[id].name}
          </Button>
        )
      })}
    </div>
  )
}
