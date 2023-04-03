import classNames from 'classnames'
import { BigNumber, utils } from 'ethers'
import { useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useAccount } from 'wagmi'
import { Vault } from 'pt-client-js'
import { NetworkIcon } from 'pt-components'
import {
  useProviders,
  useSelectedVaults,
  useTokenBalancesAcrossChains,
  useVaultBalances
} from 'pt-hyperstructure-hooks'
import { Selection, SelectionItem } from 'pt-ui'
import { getTokenPriceFromObject, NETWORK, STABLECOIN_ADDRESSES } from 'pt-utilities'
import { filteredVaultsAtom } from '@atoms'
import { useAllTokenPrices } from '@hooks/useAllTokenPrices'
import { useNetworks } from '@hooks/useNetworks'

interface VaultFiltersProps {
  className?: string
}

export const VaultFilters = (props: VaultFiltersProps) => {
  const { className } = props

  const router = useRouter()

  const networks = useNetworks()
  const { vaults, isFetched: isFetchedVaultData } = useSelectedVaults()

  const providers = useProviders()

  const { address: userAddress } = useAccount()

  const { data: vaultBalances, isFetched: isFetchedVaultBalances } = useVaultBalances(vaults)

  const { data: userTokenBalances, isFetched: isFetchedUserTokenBalances } =
    useTokenBalancesAcrossChains(providers, userAddress, vaults.underlyingTokenAddresses?.byChain)

  const { data: tokenPrices, isFetched: isFetchedTokenPrices } = useAllTokenPrices()

  const setFilteredVaults = useSetAtom(filteredVaultsAtom)

  const [filterId, setFilterId] = useState<string>('all')

  // Getting filter ID from URL query:
  useEffect(() => {
    const rawUrlNetwork = router.query['network']
    const chainId =
      !!rawUrlNetwork && typeof rawUrlNetwork === 'string' ? parseInt(rawUrlNetwork) : undefined
    !!chainId && chainId in NETWORK && setFilterId(chainId.toString())
  }, [])

  const filterOnClick = (id: string, filter: (vaults: Vault[]) => Vault[] | undefined) => {
    setFilterId(id)
    const filteredVaultsArray = isFetchedVaultData
      ? filter(Object.values(vaults.vaults)).filter(
          (vault) => !!vault.shareData && !!vault.tokenData && vault.decimals !== undefined
        )
      : Object.values(vaults.vaults)
    const filteredVaultsByChain = formatVaultsByChain(networks, filteredVaultsArray)
    setFilteredVaults(filteredVaultsByChain)
  }

  const filterItems: SelectionItem[] = useMemo(
    () => [
      {
        id: 'all',
        content: 'Show All',
        onClick: () => filterOnClick('all', (vaults) => vaults)
      },
      {
        id: 'popular',
        content: 'Popular',
        disabled: !isFetchedTokenPrices || !isFetchedVaultBalances,
        onClick: () =>
          filterOnClick('popular', (vaults) =>
            vaults.filter((vault) => {
              const usdPrice = getTokenPriceFromObject(
                vault.chainId,
                vault.tokenContract.address,
                tokenPrices
              )
              const tokenAmount = vaultBalances?.[vault.id] ?? BigNumber.from(0)
              const formattedTokenAmount = Number(utils.formatUnits(tokenAmount, vault.decimals))
              const totalUsdBalance = formattedTokenAmount * usdPrice
              return totalUsdBalance > 100 // TODO: update this value to a reasonable number or set it dynamically
            })
          )
      },
      {
        id: 'userWallet',
        content: 'In My Wallet',
        disabled: !isFetchedUserTokenBalances,
        onClick: () =>
          filterOnClick('userWallet', (vaults) =>
            vaults.filter((vault) => {
              const userWalletBalance = BigNumber.from(
                userTokenBalances?.[vault.chainId]?.[vault.tokenContract.address]?.balance ?? 0
              )
              return !userWalletBalance.isZero()
            })
          )
      },
      {
        id: 'stablecoin',
        content: 'Stablecoins',
        onClick: () =>
          filterOnClick('stablecoin', (vaults) =>
            vaults.filter((vault) =>
              STABLECOIN_ADDRESSES[vault.chainId].includes(
                vault.tokenContract.address.toLowerCase()
              )
            )
          )
      },
      ...networks.map((network) => {
        return {
          id: network.toString(),
          content: <NetworkIcon chainId={network} className='h-5 w-5' />,
          onClick: () =>
            filterOnClick(network.toString(), (vaults) =>
              vaults.filter((vault) => vault.chainId === network)
            )
        }
      })
    ],
    [networks, isFetchedTokenPrices, isFetchedVaultBalances, isFetchedUserTokenBalances]
  )

  useEffect(() => {
    const filterItem = filterItems.find((item) => item.id === filterId)
    !!filterItem && filterItem.onClick()
  }, [filterItems])

  if (router.isReady) {
    return (
      <div
        className={classNames(
          'w-full flex items-center gap-8 dark:bg-pt-bg-purple-dark px-6 py-5 rounded-lg',
          className
        )}
      >
        <span className='text-lg font-semibold'>Filter</span>
        <Selection items={filterItems} activeItem={filterId} buttonColor='purple' />
      </div>
    )
  }
}

const formatVaultsByChain = (
  networks: NETWORK[],
  vaultsArray: Vault[]
): { [chainId: number]: Vault[] } => {
  const vaultsByChain: { [chainId: number]: Vault[] } = {}

  networks.forEach((network) => {
    vaultsByChain[network] = []
  })

  vaultsArray.forEach((vault) => {
    vaultsByChain[vault.chainId].push(vault)
  })

  return vaultsByChain
}
