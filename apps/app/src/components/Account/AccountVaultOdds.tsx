import { useAccount } from 'wagmi'
import { Vault } from 'pt-client-js'
import { useUserVaultTokenBalance } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'

interface AccountVaultOddsProps {
  vault: Vault
}

export const AccountVaultOdds = (props: AccountVaultOddsProps) => {
  const { vault } = props

  const { address: userAddress } = useAccount()

  // const { data: tokenBalance } = useUserVaultTokenBalance(vault, userAddress)

  const odds = 'X' // TODO: calculate odds of winning a prize on this vault per draw? or per X time

  if (!userAddress) {
    return <>-</>
  }

  if (!odds) {
    return <Spinner />
  }

  return <>1 in {odds}</>
}
