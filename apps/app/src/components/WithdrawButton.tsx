import { useSetAtom } from 'jotai'
import { ReactNode } from 'react'
import { Vault } from 'pt-client-js'
import { useIsWithdrawModalOpen } from 'pt-generic-hooks'
import { Button } from 'pt-ui'
import { selectedVaultIdAtom } from '@atoms'

interface WithdrawButtonProps {
  vault: Vault
  children: ReactNode
}

export const WithdrawButton = (props: WithdrawButtonProps) => {
  const { vault, children } = props

  const { setIsWithdrawModalOpen } = useIsWithdrawModalOpen()

  const setSelectedVaultId = useSetAtom(selectedVaultIdAtom)

  const handleClick = () => {
    setSelectedVaultId(vault.id)
    setIsWithdrawModalOpen(true)
  }

  return (
    <>
      <Button onClick={handleClick} color='white' outline={true}>
        {children}
      </Button>
    </>
  )
}
