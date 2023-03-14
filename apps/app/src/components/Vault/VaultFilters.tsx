import classNames from 'classnames'
import { BigNumber, utils } from 'ethers'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { NetworkIcon } from 'pt-components'
import {
  useProviders,
  useTokenBalancesAcrossChains,
  useVaultBalances,
  useVaults
} from 'pt-hyperstructure-hooks'
import { VaultInfo } from 'pt-types'
import { Selection, SelectionItem } from 'pt-ui'
import { getTokenPriceFromObject, getVaultId } from 'pt-utilities'
import defaultVaultList from '@constants/defaultVaultList'
import { STABLECOIN_SYMBOLS } from '@constants/filters'
import { useAllCoingeckoTokenPrices } from '@hooks/useAllCoingeckoTokenPrices'
import { useNetworks } from '@hooks/useNetworks'

interface VaultFiltersProps {
  onFilter: (filteredVaults: VaultInfo[]) => void
  className?: string
}

// TODO: get filters from url (example: ?network=10)
export const VaultFilters = (props: VaultFiltersProps) => {
  const { onFilter, className } = props

  const networks = useNetworks()
  const vaults = useVaults(defaultVaultList)

  const providers = useProviders()
  // const { data: vaultBalances, isFetched: isFetchedVaultBalances } = useVaultBalances(vaults)

  const { address: userAddress } = useAccount()
  const { data: userTokenBalances, isFetched: isFetchedUserTokenBalances } =
    useTokenBalancesAcrossChains(providers, userAddress, vaults.underlyingTokenAddresses)

  const { data: tokenPrices, isFetched: isFetchedTokenPrices } = useAllCoingeckoTokenPrices()

  const [filterId, setFilterId] = useState<string>('all')

  const filterItems: SelectionItem[] = [
    { id: 'all', content: 'Show All' },
    { id: 'popular', content: 'Popular', disabled: !isFetchedTokenPrices },
    { id: 'userWallet', content: 'In My Wallet', disabled: !isFetchedUserTokenBalances },
    { id: 'stablecoin', content: 'Stablecoins' },
    ...networks.map((network) => {
      return {
        id: network.toString(),
        content: <NetworkIcon chainId={network} className='h-5 w-5' />
      }
    })
  ]

  useEffect(() => {
    const stringNetworks = networks.map((network) => network.toString())
    let filteredVaults: VaultInfo[] = [...defaultVaultList.tokens]

    if (filterId === 'popular') {
      filteredVaults = defaultVaultList.tokens.filter((vault) => {
        const usdPrice = getTokenPriceFromObject(
          vault.chainId,
          vault.extensions.underlyingAsset.address,
          tokenPrices
        )
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

    onFilter(filteredVaults)
  }, [filterId])

  return (
    <Selection
      items={filterItems}
      onSelect={setFilterId}
      className={classNames('flex-grow', className)}
      buttonColor='purple'
    />
  )
}
