import { useMemo } from 'react'
import { Vaults } from 'pt-client-js'
import { VaultInfo } from 'pt-types'
import { getVaultId } from 'pt-utilities'
import { useProvidersByChain } from '../blockchain/useProviders'
import { useVaultShareData } from '../vaults/useVaultShareData'
import { useVaultTokenData } from '../vaults/useVaultTokenData'
import { useSelectedVaultLists } from './useSelectedVaultLists'

/**
 * Returns an instance of a `Vaults` class with only selected vault lists' vaults
 *
 * NOTE: Also queries share and token data for each vault
 * @returns
 */
export const useSelectedVaults = (): { vaults: Vaults; isFetched: boolean } => {
  const providers = useProvidersByChain()

  const { selectedVaultLists } = useSelectedVaultLists()

  const vaults = useMemo(() => {
    const selectedVaultInfo: VaultInfo[] = []
    const selectedVaultIds = new Set<string>()

    selectedVaultLists.forEach((vaultList) => {
      vaultList.tokens.forEach((vaultInfo) => {
        const vaultId = getVaultId(vaultInfo)
        if (!selectedVaultIds.has(vaultId)) {
          selectedVaultIds.add(vaultId)
          selectedVaultInfo.push(vaultInfo)
        }
      })
    })

    return new Vaults(selectedVaultInfo, providers)
  }, [selectedVaultLists])

  const { isFetched: isFetchedShareData } = useVaultShareData(vaults)
  const { isFetched: isFetchedTokenData } = useVaultTokenData(vaults)

  const isFetched = isFetchedShareData && isFetchedTokenData

  return { vaults, isFetched }
}
