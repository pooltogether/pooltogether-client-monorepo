import { BigNumber, providers, utils } from 'ethers'
import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi'
import { Vault } from 'pt-client-js'
import { erc4626 as erc4626Abi } from 'pt-utilities'

export const useSendWithdrawTransaction = (
  amount: BigNumber,
  vault: Vault
): {
  data: { hash: string; wait: providers.TransactionResponse['wait'] } | undefined
  sendWithdrawTransaction: (() => void) | undefined
} => {
  const { address: userAddress } = useAccount()
  const { chain } = useNetwork()

  const enabled =
    !!vault && !!userAddress && utils.isAddress(userAddress) && chain?.id === vault.chainId

  // TODO: overrides?
  // TODO: onSuccess
  // TODO: onError
  const { config } = usePrepareContractWrite({
    address: vault.address as `0x${string}`,
    abi: erc4626Abi,
    functionName: 'withdraw',
    args: [amount, userAddress, userAddress],
    chainId: vault.chainId,
    enabled
  })

  const { data, write: sendWithdrawTransaction } = useContractWrite(config)

  return { data, sendWithdrawTransaction }
}
