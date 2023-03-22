import { useIsTestnets } from 'pt-generic-hooks'
import { NETWORK } from 'pt-utilities'
import { SUPPORTED_NETWORKS } from '@constants'

/**
 * Returns currently selected SUPPORTED_NETWORKS
 * @returns
 */
export const useNetworks = (): NETWORK[] => {
  const { isTestnets } = useIsTestnets()

  if (isTestnets) {
    return SUPPORTED_NETWORKS.testnets
  }

  return SUPPORTED_NETWORKS.mainnets
}
