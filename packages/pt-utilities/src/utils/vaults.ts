import { ContractCallContext, Multicall } from 'ethereum-multicall'
import { CallContext, ContractCallResults } from 'ethereum-multicall/dist/esm/models'
import { providers } from 'ethers'
import { VaultInfoWithBalance, VaultList } from 'pt-types'
import { erc4626 as erc4626Abi } from '../abis/erc4626'
import { getMulticallContractByChainId } from './networks'

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
 * Returns a user's balance in all vaults from a vault list
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
      const multicallContract = !!chainId ? getMulticallContractByChainId(chainId) : undefined
      if (!!multicallContract) {
        const queries: ContractCallContext[] = []
        const calls: CallContext[] = [
          { reference: 'balanceOf', methodName: 'balanceOf', methodParameters: [userAddress] }
        ]
        const vaults = vaultList.tokens.filter((vault) => vault.chainId === chainId)
        vaults.forEach((vault) => {
          queries.push({
            reference: vault.address,
            contractAddress: vault.address,
            abi: erc4626Abi,
            calls
          })
        })
        const multicall = new Multicall({
          ethersProvider: readProvider,
          tryAggregate: true,
          multicallCustomContractAddress: multicallContract
        })
        const response: ContractCallResults = await multicall.call(queries)
        vaults.forEach((vault) => {
          const vaultResults = response.results[vault.address].callsReturnContext
          const balance: string =
            vaultResults[0].reference === 'balanceOf' ? vaultResults[0].returnValues[0] : undefined
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
