import { ReactNode } from 'react'
import { Vault } from 'pt-client-js'
import { useIsWithdrawModalOpen } from 'pt-generic-hooks'
import { useSelectedVault } from 'pt-hyperstructure-hooks'
import { Button } from 'pt-ui'

interface WithdrawButtonProps {
  vault: Vault
  children?: ReactNode
}

export const WithdrawButton = (props: WithdrawButtonProps) => {
  const { vault, children } = props

  const { setIsWithdrawModalOpen } = useIsWithdrawModalOpen()

  const { setSelectedVaultById } = useSelectedVault()

  const handleClick = () => {
    setSelectedVaultById(vault.id)
    setIsWithdrawModalOpen(true)
  }

  return (
    <Button onClick={handleClick} color='white' outline={true}>
      {children ?? 'Withdraw'}
    </Button>
  )
}
