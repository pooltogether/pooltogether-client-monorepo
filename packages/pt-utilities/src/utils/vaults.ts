import { ContractCallContext } from 'ethereum-multicall'
import { BigNumber, providers, utils } from 'ethers'
import { VaultInfoWithBalance, VaultList } from 'pt-types'
import { erc4626 as erc4626Abi } from '../abis/erc4626'
import { getComplexMulticallResults, getMulticallResults } from './multicall'

/**
 * Returns vaults from a vault list that match with a given chain ID
 * @param chainId the chain to filter vaults from
 * @param vaultList a list of vaults
 * @returns
 */
export const getVaultsByChainId = (chainId: number, vaultList: VaultList) => {
  return vaultList.tokens.filter((vault) => vault.chainId === chainId)
}

/**
 * Returns a user's share balance in all vaults from a vault list
 * @param readProviders read-capable providers from any chains that should be queried
 * @param userAddress a user's address to check balances for
 * @param vaultList a vault list to check balances in
 * @returns
 */
export const getAllUserVaultBalances = async (
  readProviders: providers.Provider[],
  userAddress: string,
  vaultList: VaultList
): Promise<{ [vaultId: string]: VaultInfoWithBalance }> => {
  const userVaultBalances: {
    [vaultId: string]: VaultInfoWithBalance
  } = {}

  let promises = readProviders.map((readProvider) =>
    (async () => {
      const chainId = (await readProvider.getNetwork())?.chainId
      const vaults = !!chainId ? vaultList.tokens.filter((vault) => vault.chainId === chainId) : []

      if (vaults.length > 0) {
        const vaultAddresses = vaults.map((vault) => vault.address)
        const multicallResults = await getMulticallResults(
          readProvider,
          vaultAddresses,
          erc4626Abi,
          [{ reference: 'balanceOf', methodName: 'balanceOf', methodParameters: [userAddress] }]
        )

        vaults.forEach((vault) => {
          const balance: string | undefined = multicallResults[vault.address]['balanceOf']?.[0]
          if (!!balance) {
            const vaultId = `${vault.address}-${vault.chainId}`
            userVaultBalances[vaultId] = { ...vault, balance }
          }
        })
      }
    })()
  )
  await Promise.all(promises)

  return userVaultBalances
}

export const getAllVaultShareMultipliers = async (
  readProviders: providers.Provider[],
  vaultList: VaultList
) => {
  const vaultShareMultipliers: {
    [vaultId: string]: BigNumber
  } = {}

  let promises = readProviders.map((readProvider) =>
    (async () => {
      const chainId = (await readProvider.getNetwork())?.chainId
      const vaults = !!chainId ? vaultList.tokens.filter((vault) => vault.chainId === chainId) : []

      if (vaults.length > 0) {
        const queries: ContractCallContext[] = vaults.map((vault) => {
          const oneShare = utils.parseUnits('1', vault.decimals)
          const calls: ContractCallContext['calls'] = [
            {
              reference: 'convertToAssets',
              methodName: 'convertToAssets',
              methodParameters: [oneShare]
            }
          ]
          return {
            reference: vault.address,
            contractAddress: vault.address,
            abi: erc4626Abi,
            calls
          }
        })
        const multicallResults = await getComplexMulticallResults(readProvider, queries)

        vaults.forEach((vault) => {
          const multiplier: string | undefined =
            multicallResults[vault.address]['convertToAssets']?.[0]
          if (!!multiplier) {
            const vaultId = `${vault.address}-${vault.chainId}`
            vaultShareMultipliers[vaultId] = BigNumber.from(multiplier)
          }
        })
      }
    })()
  )
  await Promise.all(promises)

  return vaultShareMultipliers
}
