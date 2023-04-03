import { ReactNode } from 'react'
import { Vault } from 'pt-client-js'
import { useIsDepositModalOpen } from 'pt-generic-hooks'
import { useSelectedVault } from 'pt-hyperstructure-hooks'
import { Button } from 'pt-ui'

interface DepositButtonProps {
  vault: Vault
  children: ReactNode
}

export const DepositButton = (props: DepositButtonProps) => {
  const { vault, children } = props

  const { setIsDepositModalOpen } = useIsDepositModalOpen()

  const { setSelectedVaultId } = useSelectedVault()

  const handleClick = () => {
    setSelectedVaultId(vault.id)
    setIsDepositModalOpen(true)
  }

  return (
    <>
      <Button onClick={handleClick}>{children}</Button>
    </>
  )
}
