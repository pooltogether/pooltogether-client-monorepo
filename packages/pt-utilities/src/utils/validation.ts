import { providers, Signer, utils } from 'ethers'

/**
 * Throws an error if the address is invalid
 * @param address the address to validate
 * @param source where this function is being called from (ex. "Vault [getTokenData]")
 */
export const validateAddress = (address: string, source?: string) => {
  if (!utils.isAddress(address)) {
    throw new Error(`${!!source ? `${source} | ` : ''}Invalid address: '${address}'`)
  }
}

/**
 * Throws an error if the Signer or Provider is invalid or for the wrong network
 * @param chainId the chain ID expected
 * @param signerOrProvider the Signer or Provider to validate
 * @param source where this function is being called from (ex. "Vault [getTokenData]")
 */
export const validateSignerOrProviderNetwork = async (
  chainId: number,
  signerOrProvider: Signer | providers.Provider,
  source?: string
) => {
  let signerOrProviderChainId: number = -1
  if (providers.Provider.isProvider(signerOrProvider)) {
    signerOrProviderChainId = (await signerOrProvider.getNetwork())?.chainId
  } else if (Signer.isSigner(signerOrProvider)) {
    signerOrProviderChainId = await signerOrProvider.getChainId()
  }

  if (signerOrProviderChainId === -1) {
    throw new Error(`${!!source ? `${source} | ` : ''}Invalid Signer or Provider`)
  } else if (signerOrProviderChainId !== chainId) {
    throw new Error(
      `${
        !!source ? `${source} | ` : ''
      }Signer or Provider is on network ${signerOrProviderChainId}. Expected network ${chainId}`
    )
  }
}
