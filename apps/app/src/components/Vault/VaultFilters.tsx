import classNames from 'classnames'
import { BigNumber } from 'ethers'
import { atom, useAtom, useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useAccount } from 'wagmi'
import { Vault } from 'pt-client-js'
import { NetworkIcon } from 'pt-components'
import { MODAL_KEYS, useIsModalOpen } from 'pt-generic-hooks'
import { useSelectedVaults, useTokenBalancesAcrossChains } from 'pt-hyperstructure-hooks'
import { Selection, SelectionItem } from 'pt-ui'
import { NETWORK, STABLECOIN_ADDRESSES } from 'pt-utilities'
import { useNetworks } from '@hooks/useNetworks'

export const filterIdAtom = atom<string>('all')

export const filteredVaultsAtom = atom<{ [chainId: number]: Vault[] }>({})

interface VaultFiltersProps {
  className?: string
}

export const VaultFilters = (props: VaultFiltersProps) => {
  const { className } = props

  const router = useRouter()

  const networks = useNetworks()

  const { vaults } = useSelectedVaults()
  const vaultsArray = useMemo(() => Object.values(vaults.vaults), [vaults])

  const { address: userAddress } = useAccount()

  const { data: userTokenBalances, isFetched: isFetchedUserTokenBalances } =
    useTokenBalancesAcrossChains(networks, userAddress, vaults.underlyingTokenAddresses?.byChain)

  const [filterId, setFilterId] = useAtom(filterIdAtom)

  const setFilteredVaults = useSetAtom(filteredVaultsAtom)

  const { setIsModalOpen: setIsSettingsModalOpen } = useIsModalOpen(MODAL_KEYS.settings)

  // Getting filter ID from URL query:
  useEffect(() => {
    const rawUrlNetwork = router.query['network']
    const chainId =
      !!rawUrlNetwork && typeof rawUrlNetwork === 'string' ? parseInt(rawUrlNetwork) : undefined
    !!chainId && chainId in NETWORK && setFilterId(chainId.toString())
  }, [])

  const filterOnClick = (
    id: string,
    vaults: Vault[],
    filter: (vaults: Vault[]) => Vault[] | undefined
  ) => {
    setFilterId(id)
    const filteredVaultsArray = filter(vaults.filter((vault) => !!vault.tokenContract))
    const filteredVaultsByChain = formatVaultsByChain(networks, filteredVaultsArray)
    setFilteredVaults(filteredVaultsByChain)
  }

  const filterItems: SelectionItem[] = useMemo(
    () => [
      {
        id: 'all',
        content: 'Show All',
        onClick: () => filterOnClick('all', vaultsArray, (vaults) => vaults)
      },
      {
        id: 'userWallet',
        content: 'In My Wallet',
        disabled: !isFetchedUserTokenBalances,
        onClick: () =>
          filterOnClick('userWallet', vaultsArray, (vaults) =>
            vaults.filter((vault) => {
              const userWalletBalance = BigNumber.from(
                userTokenBalances?.[vault.chainId]?.[vault.tokenContract.address]?.amount ?? 0
              )
              return !userWalletBalance.isZero()
            })
          )
      },
      {
        id: 'stablecoin',
        content: 'Stablecoins',
        onClick: () =>
          filterOnClick('stablecoin', vaultsArray, (vaults) =>
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
            filterOnClick(network.toString(), vaultsArray, (vaults) =>
              vaults.filter((vault) => vault.chainId === network)
            )
        }
      })
    ],
    [networks, isFetchedUserTokenBalances, vaultsArray]
  )

  useEffect(() => {
    const filterItem = filterItems.find((item) => item.id === filterId)
    !!filterItem && filterItem.onClick()
  }, [filterItems, filterId, vaultsArray])

  if (router.isReady) {
    return (
      <div
        className={classNames(
          'w-full flex justify-between items-center dark:bg-pt-bg-purple-dark px-6 py-5 rounded-lg',
          className
        )}
      >
        <div className='flex items-center gap-8'>
          <span className='text-lg'>Filter</span>
          <Selection items={filterItems} activeItem={filterId} buttonColor='purple' />
        </div>
        <span
          onClick={() => setIsSettingsModalOpen(true)}
          className='text-lg text-pt-purple-100 cursor-pointer'
        >
          Manage Vault Lists
        </span>
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
