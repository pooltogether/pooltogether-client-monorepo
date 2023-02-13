/**
 * Chain IDs
 */
export const NETWORK = Object.freeze({
  'mainnet': 1,
  'goerli': 5,
  'bsc': 56,
  'bsc-testnet': 97,
  'xdai': 100,
  'polygon': 137,
  'mumbai': 80001,
  'optimism': 10,
  'optimism-goerli': 420,
  'avalanche': 43114,
  'fuji': 43113,
  'celo': 42220,
  'celo-testnet': 44787,
  'arbitrum': 42161,
  'arbitrum-goerli': 421613
})

/**
 * Multicall contract addresses
 */
export const MULTICALL = Object.freeze({
  1: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
  56: '0xc50f4c1e81c873b2204d7eff7069ffec6fbe136d',
  137: '0x275617327c958bd06b5d6b871e7f491d76113dd8',
  10: '0xeaa6877139d436dc6d1f75f3af15b74662617b2c',
  43114: '0xed386fe855c1eff2f843b910923dd8846e45c5a4',
  42161: '0x842ec2c7d803033edf55e478f461fc547bc54eb2'
})

/**
 * Returns the chain ID that maps to a provided network name
 * @param networkName name that maps to a chain ID
 * @returns
 */
export const getChainIdByName = (networkName: string): number | undefined => {
  // @ts-ignore
  return NETWORK[networkName]
}

/**
 * Returns the network name that maps to a provided chain ID
 * @param chainId chain ID that maps to a network name
 * @returns
 */
export const getNetworkNameByChainId = (chainId: number): string | undefined => {
  const networkKeys = Object.keys(NETWORK) as (keyof typeof NETWORK)[]
  const networkName = networkKeys.find((key) => NETWORK[key] === chainId)

  return networkName
}

/**
 * Returns a formatted network name to display in the UI based on the chain ID provided
 * @param chainId
 * @returns
 */
export const getNiceNetworkNameByChainId = (chainId: number): string => {
  switch (Number(chainId)) {
    case NETWORK.mainnet: {
      return 'Ethereum'
    }
    case NETWORK.bsc: {
      return 'Binance Smart Chain'
    }
    case NETWORK.xdai: {
      return 'xDai'
    }
    default: {
      const niceName = getNetworkNameByChainId(chainId)
      return niceName ? niceName.charAt(0).toUpperCase() + niceName.slice(1) : '--'
    }
  }
}

export const getMulticallContractByChainId = (chainId: number): string | undefined => {
  // @ts-ignore
  return MULTICALL[chainId]
}
