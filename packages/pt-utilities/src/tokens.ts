import { ContractCallContext, ContractCallResults, Multicall } from 'ethereum-multicall'
import { CallContext } from 'ethereum-multicall/dist/esm/models'
import { BigNumber, providers } from 'ethers'
import { TokenWithSupply } from 'pt-types'
import { erc20 as erc20Abi } from './abis/erc20'
import { getMulticallContractByChainId } from './networks'

/**
 * Returns basic ERC20 token info such as symbol, name, decimals and totalSupply
 * @param readProvider a read-capable provider to query through
 * @param tokenAddresses token addresses to query info for
 * @returns
 */
export const getTokenInfo = async (
  readProvider: providers.Provider,
  tokenAddresses: string[]
): Promise<Record<string, TokenWithSupply>> => {
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

/**
 * Returns a user's token allowance to a specific contract for the provided token addresses
 * @param readProvider a read-capable provider to query through
 * @param userAddress wallet address to check allowances for
 * @param spenderAddress the contract address that can potentially spend the allowed tokens
 * @param tokenAddresses token addresses to query allowances for
 * @returns
 */
export const getTokenAllowances = async (
  readProvider: providers.Provider,
  userAddress: string,
  spenderAddress: string,
  tokenAddresses: string[]
): Promise<Record<string, BigNumber>> => {
  const chainId = (await readProvider.getNetwork())?.chainId
  const multicallContract = !!chainId ? getMulticallContractByChainId(chainId) : undefined
  const result: Record<string, BigNumber> = {}
  if (!!multicallContract) {
    const queries: ContractCallContext[] = []
    const calls: CallContext[] = [
      {
        reference: 'allowance',
        methodName: 'allowance',
        methodParameters: [userAddress, spenderAddress]
      }
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
      const allowance =
        tokenResults[0].reference === 'allowance'
          ? BigNumber.from(tokenResults[0].returnValues[0])
          : undefined
      if (!!allowance) {
        result[address] = allowance
      }
    })
  }
  return result
}
