import { BigNumber, providers } from 'ethers'
import { useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi'
import { Vault } from 'pt-client-js'
import { erc20 as erc20Abi } from 'pt-utilities'

export const useSendApproveTransaction = (
  amount: BigNumber,
  vault: Vault,
  options?: { onSuccess?: () => void; onError?: () => void }
): {
  data: { hash: string; wait: providers.TransactionResponse['wait'] } | undefined
  isLoading: boolean
  isSuccess: boolean
  sendApproveTransaction: (() => void) | undefined
} => {
  const { chain } = useNetwork()

  const enabled = !!vault && chain?.id === vault.chainId && !!vault.tokenContract.address

  const { config } = usePrepareContractWrite({
    chainId: vault.chainId,
    address: vault.tokenContract.address as `0x${string}`,
    abi: erc20Abi,
    functionName: 'approve',
    args: [vault.address, amount],
    onSuccess: () => options?.onSuccess(),
    onError: () => options?.onError(),
    enabled
  })

  const { data, isLoading, isSuccess, write: sendApproveTransaction } = useContractWrite(config)

  return { data, isLoading, isSuccess, sendApproveTransaction }
}
