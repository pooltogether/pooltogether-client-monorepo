import { BigNumber, providers, utils } from 'ethers'
import { useEffect } from 'react'
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useProvider,
  useWaitForTransaction
} from 'wagmi'
import { Vault } from 'pt-client-js'
import { erc4626 as erc4626Abi } from 'pt-utilities'
import { useTokenAllowance } from '../blockchain/useTokenAllowances'

export const useSendDepositTransaction = (
  amount: BigNumber,
  vault: Vault,
  options?: { onSuccess?: () => void; onError?: () => void }
): {
  isWaiting: boolean
  isConfirming: boolean
  isSuccess: boolean
  txHash?: `0x${string}`
  txReceipt?: providers.TransactionReceipt
  sendDepositTransaction?: () => void
} => {
  const { address: userAddress } = useAccount()
  const { chain } = useNetwork()

  const provider = useProvider({ chainId: vault?.chainId })

  const { data: allowance, isFetched: isFetchedAllowance } = useTokenAllowance(
    provider,
    userAddress,
    vault?.address,
    vault?.tokenData?.address
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
    write: sendDepositTransaction
  } = useContractWrite(config)

  const txHash = txSendData?.hash

  const {
    data: txReceipt,
    isLoading: isConfirming,
    isSuccess,
    isError
  } = useWaitForTransaction({ chainId: vault?.chainId, hash: txHash })

  useEffect(() => {
    if (!!txReceipt) {
      isSuccess && options?.onSuccess()
      isError && options?.onError()
    }
  }, [txReceipt])

  return { isWaiting, isConfirming, isSuccess, txHash, txReceipt, sendDepositTransaction }
}
