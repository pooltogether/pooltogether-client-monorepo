import { ContractCallContext, ContractCallResults, Multicall } from 'ethereum-multicall'
import { CallContext } from 'ethereum-multicall/dist/esm/models'
import { providers } from 'ethers'
import { TokenWithSupply } from 'pt-types'
import { erc20 as erc20Abi } from './abis/erc20'
import { getMulticallContractByChainId } from './networks'

/**
 * Returns basic ERC20 token info such as symbol, name, decimals and totalSupply
 * @param readProvider a read-capable provider to query through
 * @param tokenAddresses token addresses to query info for
 * @returns
 */
export const getTokenInfo = async (readProvider: providers.Provider, tokenAddresses: string[]) => {
  const chainId = (await readProvider.getNetwork())?.chainId
  const multicallContract = !!chainId ? getMulticallContractByChainId(chainId) : undefined
  const result: Record<string, TokenWithSupply> = {}
  if (!!multicallContract) {
    const queries: ContractCallContext[] = []
    const calls: CallContext[] = [
      { reference: 'symbol', methodName: 'symbol', methodParameters: [] },
      { reference: 'name', methodName: 'name', methodParameters: [] },
      { reference: 'decimals', methodName: 'decimals', methodParameters: [] },
      { reference: 'totalSupply', methodName: 'totalSupply', methodParameters: [] }
    ]
    tokenAddresses.forEach((address) => {
      queries.push({ reference: address, contractAddress: address, abi: erc20Abi, calls })
    })
    const multicall = new Multicall({
      ethersProvider: readProvider,
      tryAggregate: true,
      multicallCustomContractAddress: multicallContract
    })
    const response: ContractCallResults = await multicall.call(queries)
    tokenAddresses.forEach((address) => {
      const tokenResults = response.results[address].callsReturnContext
      const symbol: string = tokenResults.find((entry) => entry.reference === 'symbol')
        ?.returnValues[0]
      const name: string = tokenResults.find((entry) => entry.reference === 'name')?.returnValues[0]
      const decimals: string = tokenResults.find((entry) => entry.reference === 'decimals')
        ?.returnValues[0]
      const totalSupply: string = tokenResults.find((entry) => entry.reference === 'totalSupply')
        ?.returnValues[0]
      const tokenInfo: TokenWithSupply = {
        chainId,
        address,
        symbol,
        name,
        decimals,
        totalSupply
      }
      result[address] = tokenInfo
    })
  }
  return result
}
