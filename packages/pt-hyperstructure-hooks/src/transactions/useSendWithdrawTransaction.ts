import { BigNumber, providers, utils } from 'ethers'
import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi'
import { Vault } from 'pt-client-js'
import { erc4626 as erc4626Abi } from 'pt-utilities'

export const useSendWithdrawTransaction = (
  amount: BigNumber,
  vault: Vault,
  options?: { onSuccess?: () => void; onError?: () => void }
): {
  data: { hash: string; wait: providers.TransactionResponse['wait'] } | undefined
  isLoading: boolean
  isSuccess: boolean
  sendWithdrawTransaction: (() => void) | undefined
} => {
  const { address: userAddress } = useAccount()
  const { chain } = useNetwork()

  const enabled =
    !!vault && !!userAddress && utils.isAddress(userAddress) && chain?.id === vault.chainId

  const { config } = usePrepareContractWrite({
    chainId: vault.chainId,
    address: vault.address as `0x${string}`,
    abi: erc4626Abi,
    functionName: 'withdraw',
    args: [amount, userAddress, userAddress],
    onSuccess: () => options?.onSuccess(),
    onError: () => options?.onError(),
    enabled
  })

  const { data, isLoading, isSuccess, write: sendWithdrawTransaction } = useContractWrite(config)

  return { data, isLoading, isSuccess, sendWithdrawTransaction }
}
