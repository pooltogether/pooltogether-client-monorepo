import { ReactNode, useState } from 'react'
import { WithdrawModal } from 'pt-components'
import { VaultInfo } from 'pt-types'
import { Button } from 'pt-ui'

interface WithdrawButtonProps {
  vaultInfo: VaultInfo
  children: ReactNode
}

export const WithdrawButton = (props: WithdrawButtonProps) => {
  const { vaultInfo, children } = props

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} color='white' outline={true}>
        {children}
      </Button>
      <WithdrawModal
        vaultInfo={vaultInfo}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
