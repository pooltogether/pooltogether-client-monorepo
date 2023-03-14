import { BigNumber, providers, utils } from 'ethers'
import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi'
import { VaultInfo } from 'pt-types'
import { erc4626 as erc4626Abi } from 'pt-utilities'

export const useSendDepositTransaction = (
  amount: BigNumber,
  vaultInfo: VaultInfo
): {
  data: { hash: string; wait: providers.TransactionResponse['wait'] } | undefined
  sendDepositTransaction: (() => void) | undefined
} => {
  const { address: userAddress } = useAccount()
  const { chain } = useNetwork()

  const enabled = !!userAddress && utils.isAddress(userAddress) && chain?.id === vaultInfo.chainId

  // TODO: overrides?
  // TODO: onSuccess
  // TODO: onError
  const { config } = usePrepareContractWrite({
    address: vaultInfo.address,
    abi: erc4626Abi,
    functionName: 'deposit',
    args: [amount, userAddress],
    chainId: vaultInfo.chainId,
    enabled
  })

  const { data, write: sendDepositTransaction } = useContractWrite(config)

  return { data, sendDepositTransaction }
}
