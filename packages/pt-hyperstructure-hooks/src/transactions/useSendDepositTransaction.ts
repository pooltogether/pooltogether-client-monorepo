import { BigNumber, providers, utils } from 'ethers'
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useProvider
} from 'wagmi'
import { Vault } from 'pt-client-js'
import { erc4626 as erc4626Abi } from 'pt-utilities'
import { useTokenAllowance } from '../blockchain/useTokenAllowances'

export const useSendDepositTransaction = (
  amount: BigNumber,
  vault: Vault,
  options?: { onSuccess?: () => void; onError?: () => void }
): {
  data: { hash: string; wait: providers.TransactionResponse['wait'] } | undefined
  isLoading: boolean
  isSuccess: boolean
  sendDepositTransaction: (() => void) | undefined
} => {
  const { address: userAddress } = useAccount()
  const { chain } = useNetwork()

  const provider = useProvider({ chainId: vault.chainId })

  const { data: allowance, isFetched: isFetchedAllowance } = useTokenAllowance(
    provider,
    userAddress,
    vault.address,
    vault.tokenData?.address
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
    chainId: vault.chainId,
    address: vault.address as `0x${string}`,
    abi: erc4626Abi,
    functionName: 'deposit',
    args: [amount, userAddress],
    onSuccess: () => options?.onSuccess(),
    onError: () => options?.onError(),
    enabled
  })

  const { data, isLoading, isSuccess, write: sendDepositTransaction } = useContractWrite(config)

  return { data, isLoading, isSuccess, sendDepositTransaction }
}
