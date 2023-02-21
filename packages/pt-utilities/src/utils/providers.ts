import { providers, Signer } from 'ethers'

/**
 * Returns a provider from a signer, if available
 * @param signerOrProvider a Signer or Provider object
 * @returns
 */
export const getProviderFromSigner = (
  signerOrProvider: Signer | providers.Provider
): providers.Provider | undefined => {
  if (providers.Provider.isProvider(signerOrProvider)) {
    return signerOrProvider
  } else if (Signer.isSigner(signerOrProvider)) {
    return signerOrProvider.provider
  }
}

/**
 * Returns the chain ID from a Signer or Provider
 * @param signerOrProvider a Signer or Provider object
 * @returns
 */
export const getChainIdFromSignerOrProvider = async (
  signerOrProvider: Signer | providers.Provider
): Promise<number> => {
  if (providers.Provider.isProvider(signerOrProvider)) {
    const chainId = (await signerOrProvider.getNetwork())?.chainId
    return chainId
  } else {
    const chainId = await signerOrProvider.getChainId()
    return chainId
  }
}
