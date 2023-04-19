import { BigNumber } from 'ethers'
import { useAccount } from 'wagmi'
import { Vault } from 'pt-client-js'
import { useUserVaultTokenBalance } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { TokenValueAndAmount } from '@components/TokenValueAndAmount'

interface AccountVaultBalanceProps {
  vault: Vault
}

export const AccountVaultBalance = (props: AccountVaultBalanceProps) => {
  const { vault } = props

  const { address: userAddress } = useAccount()

  const { data: tokenBalance } = useUserVaultTokenBalance(vault, userAddress)

  if (!userAddress) {
    return <>-</>
  }

  if (!tokenBalance) {
    return <Spinner />
  }

  if (BigNumber.from(tokenBalance.amount).gt(0)) {
    return <TokenValueAndAmount token={tokenBalance} />
  }

  return <>-</>
}
