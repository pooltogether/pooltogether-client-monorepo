import { NETWORK } from './networks'

/**
 * POOL token addresses
 */
export const POOL_TOKEN_ADDRESSES: { [chainId: number]: string } = Object.freeze({
  [NETWORK.mainnet]: '0x0cEC1A9154Ff802e7934Fc916Ed7Ca50bDE6844e',
  [NETWORK.polygon]: '0x25788a1a171ec66Da6502f9975a15B609fF54CF6',
  [NETWORK.optimism]: '0x395ae52bb17aef68c2888d941736a71dc6d4e125'
})

/**
 * Shortens a hash into something a little more user friendly
 * @param hash hash string to shorten
 * @param options formatting options
 * @returns shortened, user-friendly string
 */
export const shorten = (hash: string, options?: { short?: boolean }) => {
  let result

  if (!hash) {
    return null
  }

  const expression = /^(\w{6})\w*(\w{4})$/
  result = expression.exec(hash)
  if (!result) {
    return null
  }

  return options?.short ? `${result[1]}...` : `${result[1]}...${result[2]}`
}
