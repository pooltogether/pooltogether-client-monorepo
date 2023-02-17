import { BigNumber, providers, utils } from 'ethers'
import { Vault } from 'pt-client-js'
import { VaultInfo } from 'pt-types'
import { erc4626 as erc4626Abi } from 'pt-utilities'
import { useAccount, useContractWrite, usePrepareContractWrite, useSigner } from 'wagmi'

// TODO: validation to make sure userAddress and signer.getAddress() are the same
export const useSendWithdrawTransaction = (
  amount: BigNumber,
  vaultInfo: VaultInfo
): {
  data: { hash: string; wait: providers.TransactionResponse['wait'] } | undefined
  sendWithdrawTransaction: (() => void) | undefined
} => {
  const { address: userAddress } = useAccount()
  const { data: signer, isFetched, isError } = useSigner({ chainId: vaultInfo.chainId })

  const vault = !!signer ? new Vault(vaultInfo.chainId, vaultInfo.address, signer) : undefined

  const enabled =
    !!signer && isFetched && !isError && !!vault && !!userAddress && utils.isAddress(userAddress)

  // TODO: overrides?
  // TODO: onSuccess
  // TODO: onError
  const { config } = usePrepareContractWrite({
    address: vault?.address,
    abi: erc4626Abi,
    functionName: 'withdraw',
    args: [amount, userAddress, userAddress],
    chainId: vault?.chainId,
    enabled
  })

  const { data, write: sendWithdrawTransaction } = useContractWrite(config)

  return { data, sendWithdrawTransaction }
}