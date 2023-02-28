import classNames from 'classnames'
import { BigNumber, utils } from 'ethers'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { useTokenBalancesAcrossChains, useVaultBalances } from 'pt-hooks'
import { VaultInfo } from 'pt-types'
import { TabItem, Tabs } from 'pt-ui'
import {
  getNiceNetworkNameByChainId,
  getVaultId,
  getVaultUnderlyingTokensFromVaultList
} from 'pt-utilities'
import { VAULT_FILTERS } from '@constants/filters'
import { NETWORK_ICONS, SUPPORTED_NETWORKS } from '@constants/networks'
import defaultVaultList from '@data/defaultVaultList'
import { useAllCoingeckoTokenPrices } from '@hooks/useAllCoingeckoTokenPrices'
import { useProviders } from '@hooks/useProviders'

interface VaultFiltersProps {
  onFilter: (filteredVaults: VaultInfo[]) => void
  className?: string
}

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

  const [tab, setTab] = useState<number>(0)

  const tabItems: TabItem[] = [
    { name: 'all', title: VAULT_FILTERS.all.name },
    { name: 'popular', title: VAULT_FILTERS.popular.name, disabled: !isFetchedTokenPrices },
    {
      name: 'userWallet',
      title: VAULT_FILTERS.userWallet.name,
      disabled: !isFetchedUserTokenBalances
    },
    { name: 'stablecoin', title: VAULT_FILTERS.stablecoin.name },
    ...SUPPORTED_NETWORKS.mainnets.map((network) => {
      const networkName = getNiceNetworkNameByChainId(network)
      return {
        name: networkName,
        title: (
          <img
            src={NETWORK_ICONS[network].iconUrl}
            alt={`${networkName} Logo`}
            className='h-6 w-6'
          />
        )
      }
    })
  ]

  // TODO: add chain filter functionality
  useEffect(() => {
    const tabName = tabItems[tab].name
    let filteredVaults: VaultInfo[] = [...defaultVaultList.tokens]

    switch (tabName) {
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
          return VAULT_FILTERS[tabName].validation(formattedTokenAmount * usdPrice)
        })
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
          return VAULT_FILTERS[tabName].validation(userWalletBalance)
        })
        break
      }
      case 'stablecoin': {
        filteredVaults = defaultVaultList.tokens.filter((vault) =>
          VAULT_FILTERS[tabName].validation(vault)
        )
        break
      }
    }

    props.onFilter(filteredVaults)
  }, [tab])

  return (
    <div className={classNames('w-full flex items-center gap-6', props.className)}>
      <span className='text-lg font-semibold'>Filter</span>
      <Tabs items={tabItems} onActiveTabChange={setTab} className='flex-grow' />
      <span className='dark:text-pt-purple-100 cursor-pointer'>Manage Prize Asset List</span>
    </div>
  )
}
