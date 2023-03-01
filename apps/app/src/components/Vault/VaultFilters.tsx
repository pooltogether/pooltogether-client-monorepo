import classNames from 'classnames'
import { BigNumber, utils } from 'ethers'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { NetworkIcon } from 'pt-components'
import { useTokenBalancesAcrossChains, useVaultBalances } from 'pt-hooks'
import { VaultInfo } from 'pt-types'
import { Selection, SelectionItem } from 'pt-ui'
import { getVaultId, getVaultUnderlyingTokensFromVaultList } from 'pt-utilities'
import { STABLECOIN_SYMBOLS } from '@constants/filters'
import { SUPPORTED_NETWORKS } from '@constants/networks'
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

  const [filterId, setFilterId] = useState<string>('all')

  const filterItems: SelectionItem[] = [
    { id: 'all', content: 'Show All' },
    { id: 'popular', content: 'Popular', disabled: !isFetchedTokenPrices },
    { id: 'userWallet', content: 'In My Wallet', disabled: !isFetchedUserTokenBalances },
    { id: 'stablecoin', content: 'Stablecoins' },
    ...SUPPORTED_NETWORKS.mainnets.map((network) => {
      return { id: network.toString(), content: <NetworkIcon chainId={network} /> }
    })
  ]

  useEffect(() => {
    const stringNetworks = SUPPORTED_NETWORKS.mainnets.map((network) => network.toString())
    let filteredVaults: VaultInfo[] = [...defaultVaultList.tokens]

    if (filterId === 'popular') {
      filteredVaults = defaultVaultList.tokens.filter((vault) => {
        const usdPrice =
          isFetchedTokenPrices && !!tokenPrices
            ? tokenPrices[vault.chainId][vault.extensions.underlyingAsset.address.toLowerCase()]?.[
                'usd'
              ] ?? 0
            : 0
        // const vaultId = getVaultId(vault)
        // const tokenAmount = isFetchedVaultBalances && !!vaultBalances ? vaultBalances[vaultId] : 0
        // TODO: remove this once vaults are setup (and uncomment code above):
        const tokenAmount = utils.parseUnits('50000', vault.decimals)
        const formattedTokenAmount = Number(utils.formatUnits(tokenAmount, vault.decimals))
        const totalUsdBalance = formattedTokenAmount * usdPrice
        return totalUsdBalance > 100_000
      })
    } else if (filterId === 'userWallet') {
      filteredVaults = defaultVaultList.tokens.filter((vault) => {
        const userWalletBalance = BigNumber.from(
          isFetchedUserTokenBalances && !!userTokenBalances
            ? userTokenBalances[vault.chainId]?.[vault.extensions.underlyingAsset.address]
                ?.balance ?? 0
            : 0
        )
        return !userWalletBalance.isZero()
      })
    } else if (filterId === 'stablecoin') {
      filteredVaults = defaultVaultList.tokens.filter((vault) =>
        STABLECOIN_SYMBOLS.includes(vault.extensions.underlyingAsset.symbol)
      )
    } else if (stringNetworks.includes(filterId)) {
      filteredVaults = defaultVaultList.tokens.filter(
        (vault) => vault.chainId.toString() === filterId
      )
    }

    props.onFilter(filteredVaults)
  }, [filterId])

  return (
    <div className={classNames('w-full flex items-center gap-6', props.className)}>
      <span className='text-lg font-semibold'>Filter</span>
      <Selection
        items={filterItems}
        onSelect={setFilterId}
        className='flex-grow'
        buttonTheme='purple'
      />
      <span className='dark:text-pt-purple-100 cursor-pointer'>Manage Prize Asset List</span>
    </div>
  )
}
