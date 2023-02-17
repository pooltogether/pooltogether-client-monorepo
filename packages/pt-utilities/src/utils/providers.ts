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
