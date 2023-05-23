import { useAccount } from 'wagmi'
import { Vault } from 'pt-client-js'
import { TokenValueAndAmount } from 'pt-components'
import { useUserVaultTokenBalance } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'

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

  if (tokenBalance.amount > 0n) {
    return <TokenValueAndAmount token={tokenBalance} />
  }

  return <>-</>
}
