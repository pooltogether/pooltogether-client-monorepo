import { BigNumber, providers } from 'ethers'
import { useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi'
import { Vault } from 'pt-client-js'
import { erc20 as erc20Abi } from 'pt-utilities'
import { useVaultTokenAddress } from '../vaults/useVaultTokenAddresses'

export const useSendApproveTransaction = (
  amount: BigNumber,
  vault: Vault
): {
  data: { hash: string; wait: providers.TransactionResponse['wait'] } | undefined
  sendApproveTransaction: (() => void) | undefined
} => {
  const { chain } = useNetwork()

  const { data: tokenAddress, isFetched: isFetchedTokenAddress } = useVaultTokenAddress(vault)

  const enabled = !!vault && chain?.id === vault.chainId && isFetchedTokenAddress && !!tokenAddress

  // TODO: overrides?
  // TODO: onSuccess
  // TODO: onError
  const { config } = usePrepareContractWrite({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'approve',
    args: [vault.address, amount],
    chainId: vault.chainId,
    enabled
  })

  const { data, write: sendApproveTransaction } = useContractWrite(config)

  return { data, sendApproveTransaction }
}
