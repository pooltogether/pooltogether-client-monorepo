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
import { useTokenAllowance } from '..'

/**
 * Prepares and submits a `deposit` transaction to a vault
 * @param amount the amount to deposit
 * @param vault the vault to deposit into
 * @param options optional callbacks
 * @returns
 */
export const useSendDepositTransaction = (
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
  sendDepositTransaction?: () => void
} => {
  const { address: userAddress } = useAccount()
  const { chain } = useNetwork()

  const { data: allowance, isFetched: isFetchedAllowance } = useTokenAllowance(
    vault?.chainId,
    userAddress as `0x${string}`,
    vault?.address,
    vault?.tokenData?.address as string
  )

  const enabled =
    !!vault &&
    !!vault.tokenData &&
    !!userAddress &&
    utils.isAddress(userAddress) &&
    chain?.id === vault.chainId &&
    isFetchedAllowance &&
    !!allowance &&
    allowance.gte(amount)

  const { config } = usePrepareContractWrite({
    chainId: vault?.chainId,
    address: vault?.address as `0x${string}`,
    abi: erc4626Abi,
    functionName: 'deposit',
    args: [amount, userAddress],
    enabled
  })

  const {
    data: txSendData,
    isLoading: isWaiting,
    isError: isSendingError,
    write
  } = useContractWrite(config)

  const sendDepositTransaction = !!write
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

  return { isWaiting, isConfirming, isSuccess, isError, txHash, txReceipt, sendDepositTransaction }
}
