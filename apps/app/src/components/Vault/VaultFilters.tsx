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
  useVaultBalances
} from 'pt-hyperstructure-hooks'
import { VaultInfo } from 'pt-types'
import { Selection, SelectionItem } from 'pt-ui'
import { getTokenPriceFromObject, getVaultId, NETWORK } from 'pt-utilities'
import { STABLECOIN_SYMBOLS } from '@constants/filters'
import { useAllCoingeckoTokenPrices } from '@hooks/useAllCoingeckoTokenPrices'
import { useNetworks } from '@hooks/useNetworks'

interface VaultFiltersProps {
  onFilter: (filteredVaults: VaultInfo[]) => void
  className?: string
}

export const VaultFilters = (props: VaultFiltersProps) => {
  const { onFilter, className } = props

  const router = useRouter()

  const networks = useNetworks()
  const vaults = useSelectedVaults()

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
    const stringNetworks = networks.map((network) => network.toString())
    let filteredVaults: VaultInfo[] = vaults.allVaultInfo

    if (filterId === 'popular') {
      filteredVaults = vaults.allVaultInfo.filter((vault) => {
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
      filteredVaults = vaults.allVaultInfo.filter((vault) => {
        const userWalletBalance = BigNumber.from(
          isFetchedUserTokenBalances && !!userTokenBalances
            ? userTokenBalances[vault.chainId]?.[vault.extensions.underlyingAsset.address]
                ?.balance ?? 0
            : 0
        )
        return !userWalletBalance.isZero()
      })
    } else if (filterId === 'stablecoin') {
      filteredVaults = vaults.allVaultInfo.filter((vault) =>
        STABLECOIN_SYMBOLS.includes(vault.extensions.underlyingAsset.symbol)
      )
    } else if (stringNetworks.includes(filterId)) {
      filteredVaults = vaults.allVaultInfo.filter((vault) => vault.chainId.toString() === filterId)
    }

    onFilter(filteredVaults)
  }, [filterId, userAddress, networks])

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
