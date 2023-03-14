import { useSetAtom } from 'jotai'
import { ReactNode } from 'react'
import { useIsDepositModalOpen } from 'pt-generic-hooks'
import { VaultInfo } from 'pt-types'
import { Button } from 'pt-ui'
import { selectedVaultAtom } from '@atoms'

interface DepositButtonProps {
  vaultInfo: VaultInfo
  children: ReactNode
}

export const DepositButton = (props: DepositButtonProps) => {
  const { vaultInfo, children } = props

  const { setIsDepositModalOpen } = useIsDepositModalOpen()

  const setSelectedVault = useSetAtom(selectedVaultAtom)

  const handleClick = () => {
    setSelectedVault(vaultInfo)
    setIsDepositModalOpen(true)
  }

  return (
    <>
      <Button onClick={handleClick}>{children}</Button>
    </>
  )
}
