import { ReactNode, useState } from 'react'
import { VaultInfo } from 'pt-types'
import { Button } from 'pt-ui'
import { DepositModal } from './DepositModal'

interface DepositButtonProps {
  vaultInfo: VaultInfo
  children: ReactNode
}

export const DepositButton = (props: DepositButtonProps) => {
  const { vaultInfo, children } = props

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>{children}</Button>
      <DepositModal
        vaultInfo={vaultInfo}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
