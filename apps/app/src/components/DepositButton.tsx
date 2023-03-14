import { ReactNode, useState } from 'react'
import { DepositModal } from 'pt-components'
import { useIsDepositModalOpen } from 'pt-generic-hooks'
import { VaultInfo } from 'pt-types'
import { Button } from 'pt-ui'

interface DepositButtonProps {
  vaultInfo: VaultInfo
  children: ReactNode
}

export const DepositButton = (props: DepositButtonProps) => {
  const { vaultInfo, children } = props

  const {} = useIsDepositModalOpen()

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
