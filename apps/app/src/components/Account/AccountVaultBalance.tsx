import { BigNumber } from 'ethers'
import { useAccount } from 'wagmi'
import { Vault } from 'pt-client-js'
import { useUserVaultBalance, useVaultExchangeRate } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { getAssetsFromShares } from 'pt-utilities'
import { TokenValueAndAmount } from '@components/TokenValueAndAmount'

interface AccountVaultBalanceProps {
  vault: Vault
}

export const AccountVaultBalance = (props: AccountVaultBalanceProps) => {
  const { vault } = props

  const { address: userAddress } = useAccount()

  const { data: vaultBalance } = useUserVaultBalance(vault, userAddress)

  const { data: vaultExchangeRate } = useVaultExchangeRate(vault)

  if (!userAddress) {
    return <>-</>
  }

  // TODO: remove some flickering when first loading data here
  if (!vault.tokenData || !vaultBalance || !vaultExchangeRate) {
    return <Spinner />
  }

  const shareBalance = BigNumber.from(vaultBalance.amount)
  const amount = getAssetsFromShares(shareBalance, vaultExchangeRate, vault.decimals).toString()

  if (shareBalance.gt(0)) {
    return <TokenValueAndAmount token={{ ...vault.tokenData, amount }} />
  }

  return <>-</>
}
