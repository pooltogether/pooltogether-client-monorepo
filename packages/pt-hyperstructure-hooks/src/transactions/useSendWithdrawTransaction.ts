import { BigNumber, providers, utils } from 'ethers'
import { useEffect } from 'react'
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi'
import { Vault } from 'pt-client-js'
import { erc4626 as erc4626Abi } from 'pt-utilities'

export const useSendWithdrawTransaction = (
  amount: BigNumber,
  vault: Vault,
  options?: { onSuccess?: () => void; onError?: () => void }
): {
  isLoading: boolean
  isSuccess: boolean
  txHash?: `0x${string}`
  txReceipt?: providers.TransactionReceipt
  sendWithdrawTransaction?: () => void
} => {
  const { address: userAddress } = useAccount()
  const { chain } = useNetwork()

  const enabled =
    !!vault && !!userAddress && utils.isAddress(userAddress) && chain?.id === vault.chainId

  const { config } = usePrepareContractWrite({
    chainId: vault?.chainId,
    address: vault?.address as `0x${string}`,
    abi: erc4626Abi,
    functionName: 'withdraw',
    args: [amount, userAddress, userAddress],
    enabled
  })

  const { data: txSendData, write: sendWithdrawTransaction } = useContractWrite(config)

  const txHash = txSendData?.hash

  const {
    data: txReceipt,
    isLoading,
    isSuccess,
    isError
  } = useWaitForTransaction({ chainId: vault?.chainId, hash: txHash })

  useEffect(() => {
    if (!!txReceipt) {
      isSuccess && options?.onSuccess()
      isError && options?.onError()
    }
  }, [txReceipt])

  return { isLoading, isSuccess, txHash, txReceipt, sendWithdrawTransaction }
}
