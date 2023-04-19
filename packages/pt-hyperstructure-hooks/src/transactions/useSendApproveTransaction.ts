import { BigNumber, providers } from 'ethers'
import { useEffect } from 'react'
import { useContractWrite, useNetwork, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { Vault } from 'pt-client-js'
import { erc20 as erc20Abi } from 'pt-utilities'

export const useSendApproveTransaction = (
  amount: BigNumber,
  vault: Vault,
  options?: { onSend?: () => void; onSuccess?: () => void; onError?: () => void }
): {
  isWaiting: boolean
  isConfirming: boolean
  isSuccess: boolean
  isError: boolean
  txHash?: `0x${string}`
  txReceipt?: providers.TransactionReceipt
  sendApproveTransaction?: () => void
} => {
  const { chain } = useNetwork()

  const enabled = !!vault && chain?.id === vault.chainId && !!vault.tokenContract?.address

  const { config } = usePrepareContractWrite({
    chainId: vault?.chainId,
    address: vault?.tokenContract?.address as `0x${string}`,
    abi: erc20Abi,
    functionName: 'approve',
    args: [vault?.address, amount],
    enabled
  })

  const {
    data: txSendData,
    isLoading: isWaiting,
    isError: isSendingError,
    write
  } = useContractWrite(config)

  const sendApproveTransaction = !!write
    ? () => {
        write()
        options?.onSend?.()
      }
    : undefined

  const txHash = txSendData?.hash

  const {
    data: txReceipt,
    isLoading: isConfirming,
    isSuccess,
    isError: isConfirmingError
  } = useWaitForTransaction({ chainId: vault?.chainId, hash: txHash })

  const isError = isSendingError || isConfirmingError

  useEffect(() => {
    if (!!txReceipt && isSuccess) {
      options?.onSuccess?.()
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      options?.onError?.()
    }
  }, [isError])

  return { isWaiting, isConfirming, isSuccess, isError, txHash, txReceipt, sendApproveTransaction }
}
