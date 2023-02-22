import { VaultInfo } from 'pt-types'
import { Button } from 'pt-ui'
import { useState } from 'react'
import { DepositModal } from './DepositModal'

interface DepositButtonProps {
  vaultInfo: VaultInfo
}

export const DepositButton = (props: DepositButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Deposit</Button>
      <DepositModal
        vaultInfo={props.vaultInfo}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
