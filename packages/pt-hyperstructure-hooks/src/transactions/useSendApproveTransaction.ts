import { BigNumber, providers } from 'ethers'
import { useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi'
import { Vault } from 'pt-client-js'
import { erc20 as erc20Abi } from 'pt-utilities'

export const useSendApproveTransaction = (
  amount: BigNumber,
  vault: Vault
): {
  data: { hash: string; wait: providers.TransactionResponse['wait'] } | undefined
  sendApproveTransaction: (() => void) | undefined
} => {
  const { chain } = useNetwork()

  const enabled = !!vault && chain?.id === vault.chainId && !!vault.tokenContract.address

  // TODO: overrides?
  // TODO: onSuccess
  // TODO: onError
  const { config } = usePrepareContractWrite({
    address: vault.tokenContract.address as `0x${string}`,
    abi: erc20Abi,
    functionName: 'approve',
    args: [vault.address, amount],
    chainId: vault.chainId,
    enabled
  })

  const { data, write: sendApproveTransaction } = useContractWrite(config)

  return { data, sendApproveTransaction }
}
