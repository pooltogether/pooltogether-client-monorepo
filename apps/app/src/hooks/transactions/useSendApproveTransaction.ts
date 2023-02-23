import { BigNumber, providers } from 'ethers'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { VaultInfo } from 'pt-types'
import { erc20 as erc20Abi } from 'pt-utilities'

export const useSendApproveTransaction = (
  amount: BigNumber,
  vaultInfo: VaultInfo
): {
  data: { hash: string; wait: providers.TransactionResponse['wait'] } | undefined
  sendApproveTransaction: (() => void) | undefined
} => {
  // TODO: overrides?
  // TODO: onSuccess
  // TODO: onError
  const { config } = usePrepareContractWrite({
    address: vaultInfo.extensions.underlyingAsset.address,
    abi: erc20Abi,
    functionName: 'approve',
    args: [vaultInfo.address, amount],
    chainId: vaultInfo.chainId
  })

  const { data, write: sendApproveTransaction } = useContractWrite(config)

  return { data, sendApproveTransaction }
}
