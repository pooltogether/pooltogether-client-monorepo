import { useSetAtom } from 'jotai'
import { ReactNode } from 'react'
import { useIsWithdrawModalOpen } from 'pt-generic-hooks'
import { VaultInfo } from 'pt-types'
import { Button } from 'pt-ui'
import { selectedVaultAtom } from '@atoms'

interface WithdrawButtonProps {
  vaultInfo: VaultInfo
  children: ReactNode
}

export const WithdrawButton = (props: WithdrawButtonProps) => {
  const { vaultInfo, children } = props

  const { setIsWithdrawModalOpen } = useIsWithdrawModalOpen()

  const setSelectedVault = useSetAtom(selectedVaultAtom)

  const handleClick = () => {
    setSelectedVault(vaultInfo)
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
