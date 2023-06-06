import { useIsTestnets } from '@pooltogether/generic-react-hooks'
import { NETWORK } from '@pooltogether/hyperstructure-client-js'
import { SUPPORTED_NETWORKS } from '@constants/config'

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
