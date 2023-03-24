import classNames from 'classnames'
import { BigNumber, utils } from 'ethers'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useAccount } from 'wagmi'
import { NetworkIcon } from 'pt-components'
import {
  useProviders,
  useSelectedVaults,
  useTokenBalancesAcrossChains,
  useVaultBalances,
  useVaultTokenAddresses
} from 'pt-hyperstructure-hooks'
import { Selection, SelectionItem } from 'pt-ui'
import { getTokenPriceFromObject, NETWORK, STABLECOIN_ADDRESSES } from 'pt-utilities'
import { useAllTokenPrices } from '@hooks/useAllTokenPrices'
import { useNetworks } from '@hooks/useNetworks'

interface VaultFiltersProps {
  onFilter: (filteredVaultIds: string[]) => void
  className?: string
}

export const VaultFilters = (props: VaultFiltersProps) => {
  const { onFilter, className } = props

  const router = useRouter()

  const networks = useNetworks()
  const vaults = useSelectedVaults()

  const providers = useProviders()

  const { address: userAddress } = useAccount()

  const { data: vaultBalances, isFetched: isFetchedVaultBalances } = useVaultBalances(vaults)

  const { data: vaultTokenAddresses } = useVaultTokenAddresses(vaults)

  const { data: userTokenBalances, isFetched: isFetchedUserTokenBalances } =
    useTokenBalancesAcrossChains(providers, userAddress, vaults.underlyingTokenAddresses)

  const { data: tokenPrices, isFetched: isFetchedTokenPrices } = useAllTokenPrices()

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

  // Getting default filter from URL query:
  const defaultFilter = useMemo(() => {
    const rawUrlNetwork = router.query['network']
    const urlNetwork =
      !!rawUrlNetwork && typeof rawUrlNetwork === 'string' ? parseInt(rawUrlNetwork) : undefined

    if (!!urlNetwork && urlNetwork in NETWORK) {
      const filter = urlNetwork.toString()
      setFilterId(filter)
      return filter
    }
  }, [router])

  useEffect(() => {
    let filteredVaultIds: string[] = Object.keys(vaults.vaults)

    const stringNetworks = networks.map((network) => network.toString())
    const vaultIds = Object.keys(vaults.vaults)

    if (filterId === 'popular' && !!vaultTokenAddresses) {
      filteredVaultIds = vaultIds.filter((vaultId) => {
        const vault = vaults.vaults[vaultId]
        const usdPrice = getTokenPriceFromObject(
          vault.chainId,
          vaultTokenAddresses.byVault[vault.id],
          tokenPrices
        )
        const tokenAmount =
          isFetchedVaultBalances && !!vaultBalances && vaultBalances[vault.id]
            ? vaultBalances[vault.id]
            : BigNumber.from(0)
        const formattedTokenAmount = Number(utils.formatUnits(tokenAmount, vault.decimals))
        const totalUsdBalance = formattedTokenAmount * usdPrice
        return totalUsdBalance > 100 // TODO: update this value to a reasonable number or set it dynamically
      })
    } else if (filterId === 'userWallet' && !!vaultTokenAddresses) {
      filteredVaultIds = vaultIds.filter((vaultId) => {
        const vault = vaults.vaults[vaultId]
        const userWalletBalance = BigNumber.from(
          isFetchedUserTokenBalances && !!userTokenBalances
            ? userTokenBalances[vault.chainId]?.[vaultTokenAddresses.byVault[vault.id]]?.balance ??
                0
            : 0
        )
        return !userWalletBalance.isZero()
      })
    } else if (filterId === 'stablecoin' && !!vaultTokenAddresses) {
      filteredVaultIds = vaultIds.filter((vaultId) => {
        const vault = vaults.vaults[vaultId]
        return STABLECOIN_ADDRESSES[vault.chainId].includes(
          vaultTokenAddresses.byVault[vault.id].toLowerCase()
        )
      })
    } else if (stringNetworks.includes(filterId)) {
      filteredVaultIds = vaultIds.filter((vaultId) => {
        const vault = vaults.vaults[vaultId]
        return vault.chainId.toString() === filterId
      })
    }

    onFilter(filteredVaultIds)
  }, [filterId, userAddress, networks, vaultTokenAddresses])

  if (router.isReady) {
    return (
      <Selection
        items={filterItems}
        defaultSelected={defaultFilter}
        onSelect={setFilterId}
        className={classNames(className)}
        buttonColor='purple'
      />
    )
  }
}
