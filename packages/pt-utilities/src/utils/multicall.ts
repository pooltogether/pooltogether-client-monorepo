import { ContractCallContext, Multicall } from 'ethereum-multicall'
import { ContractCallResults } from 'ethereum-multicall/dist/esm/models'
import { createWalletClient, custom, isAddress, PublicClient } from 'viem'

// TODO: use viem built-in multicall
// TODO: add batching in case of too many calls
/**
 * Returns the results of a multicall where each call is made to every contract address provided
 * @param publicClient a public Viem client to query through
 * @param contractAddresses contract addresses to make calls to
 * @param abi the ABI of the contracts provided
 * @param calls the calls to make to each contract
 * @returns
 */
export const getMulticallResults = async (
  publicClient: PublicClient,
  contractAddresses: string[],
  abi: ContractCallContext['abi'],
  calls: ContractCallContext['calls']
): Promise<{
  [contractAddress: string]: {
    [reference: string]: any[]
  }
}> => {
  const validAddresses = contractAddresses.every((address) => isAddress(address))
  if (contractAddresses.length === 0 || !validAddresses || calls.length === 0) {
    throw new Error('Multicall Error: Invalid parameters')
  }

  const chainId = await publicClient.getChainId()
  if (!chainId) {
    throw new Error('Multicall Error: Could not get chain ID from client')
  }

  const queries: ContractCallContext[] = []
  contractAddresses.forEach((contractAddress) => {
    queries.push({ reference: contractAddress, contractAddress, abi, calls })
  })

  // TODO: this is a hacky workaround - `ethereum-multicall` doesn't seem to support viem clients yet
  const multicall = new Multicall({
    web3Instance: createWalletClient({
      chain: publicClient.chain,
      transport: custom(publicClient)
    }),
    tryAggregate: true
  })
  const response: ContractCallResults = await multicall.call(queries)

  const formattedResults: { [contractAddress: string]: { [reference: string]: any[] } } = {}
  contractAddresses.forEach((contractAddress) => {
    formattedResults[contractAddress] = {}
    response.results[contractAddress]?.callsReturnContext.forEach((result) => {
      formattedResults[contractAddress][result.reference] = result.returnValues
    })
  })

  return formattedResults
}

/**
 * Returns the results of a complex multicall where contract queries are provided instead of calls
 * @param publicClient a public Viem client to query through
 * @param queries the contract queries to make
 * @returns
 */
export const getComplexMulticallResults = async (
  publicClient: PublicClient,
  queries: ContractCallContext[]
): Promise<{
  [contractAddress: string]: {
    [reference: string]: any[]
  }
}> => {
  const validAddresses = queries.every((query) => isAddress(query.contractAddress))
  if (queries.length === 0 || !validAddresses) {
    throw new Error('Multicall Error: Invalid parameters')
  }

  const chainId = await publicClient.getChainId()
  if (!chainId) {
    throw new Error('Multicall Error: Could not get chain ID from client')
  }

  // TODO: this is a hacky workaround - `ethereum-multicall` doesn't seem to support viem clients yet
  const multicall = new Multicall({
    web3Instance: createWalletClient({
      chain: publicClient.chain,
      transport: custom(publicClient)
    }),
    tryAggregate: true
  })
  const response: ContractCallResults = await multicall.call(queries)

  const formattedResults: { [contractAddress: string]: { [reference: string]: any[] } } = {}
  queries.forEach((query) => {
    if (formattedResults[query.contractAddress] === undefined) {
      formattedResults[query.contractAddress] = {}
    }
    response.results[query.reference]?.callsReturnContext.forEach((result) => {
      formattedResults[query.contractAddress][result.reference] = result.returnValues
    })
  })

  return formattedResults
}
