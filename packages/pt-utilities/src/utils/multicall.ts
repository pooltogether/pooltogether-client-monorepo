import { ContractCallContext, Multicall } from 'ethereum-multicall'
import { CallContext, ContractCallResults } from 'ethereum-multicall/dist/esm/models'
import { providers, utils } from 'ethers'
import { MULTICALL, MULTICALL_NETWORK } from '../constants'

/**
 * Returns a chain's multicall contract address if available
 * @param chainId chain ID to get contract address for
 * @returns
 */
export const getMulticallContractAddressByChainId = (chainId: number): string | undefined => {
  if (chainId in MULTICALL) {
    return MULTICALL[chainId as MULTICALL_NETWORK]
  } else {
    return undefined
  }
}

// TODO: add batching in case of too many calls
/**
 * Returns the results of a multicall where each call is made to every contract address provided
 * @param readProvider a read-capable provider to query through
 * @param contractAddresses contract addresses to make calls to
 * @param abi the ABI of the contracts provided
 * @param calls the calls to make to each contract
 * @returns
 */
export const getMulticallResults = async (
  readProvider: providers.Provider,
  contractAddresses: string[],
  abi: ContractCallContext['abi'],
  calls: CallContext[]
): Promise<{
  [contractAddress: string]: {
    [reference: string]: any[]
  }
}> => {
  const chainId = (await readProvider.getNetwork())?.chainId
  if (!!chainId) {
    throw new Error('Multicall Error: Could not get chainId from provider')
  }

  const multicallContractAddress = getMulticallContractAddressByChainId(chainId)
  if (multicallContractAddress === undefined) {
    throw new Error(`Multicall Error: Not setup for network ${chainId}`)
  }

  const validAddresses = contractAddresses.every((address) => utils.isAddress(address))
  if (contractAddresses.length === 0 || !validAddresses || calls.length === 0) {
    throw new Error('Multicall Error: Invalid parameters')
  }

  const queries: ContractCallContext[] = []
  contractAddresses.forEach((contractAddress) => {
    queries.push({ reference: contractAddress, contractAddress, abi, calls })
  })

  const multicall = new Multicall({
    ethersProvider: readProvider,
    tryAggregate: true,
    multicallCustomContractAddress: multicallContractAddress
  })
  const response: ContractCallResults = await multicall.call(queries)

  const formattedResults: { [contractAddress: string]: { [reference: string]: any[] } } = {}
  contractAddresses.forEach((contractAddress) => {
    formattedResults[contractAddress] = {}
    response.results[contractAddress].callsReturnContext.forEach((result) => {
      formattedResults[contractAddress][result.reference] = result.returnValues
    })
  })

  return formattedResults
}
