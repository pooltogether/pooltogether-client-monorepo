import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useIsDepositModalOpen } from 'pt-generic-hooks'
import { VaultInfo } from 'pt-types'
import { Modal } from 'pt-ui'
import { TxFormValues } from '../Form/TxFormInput'
import { DepositModalBody } from './DepositModalBody'
import { DepositModalFooter } from './DepositModalFooter'

export interface DepositModalProps {
  vaultInfo: VaultInfo
  bgColor?: 'light' | 'dark'
  openConnectModal?: () => void
  openChainModal?: () => void
  addRecentTransaction?: (tx: { hash: string; description: string; confirmations?: number }) => void
}

export const DepositModal = (props: DepositModalProps) => {
  const { vaultInfo, bgColor, openConnectModal, openChainModal, addRecentTransaction } = props

  const { isDepositModalOpen, setIsDepositModalOpen } = useIsDepositModalOpen()

  // NOTE: This is necessary due to hydration errors otherwise.
  const [isBrowser, setIsBrowser] = useState(false)
  useEffect(() => setIsBrowser(true), [])

  const {
    register,
    watch,
    setValue,
    formState: { errors: formErrors, isValid: isValidFormInputs }
  } = useForm<TxFormValues>({
    mode: 'onChange',
    defaultValues: { tokenAmount: '0', shareAmount: '0' },
    shouldUnregister: true
  })

  if (isBrowser) {
    return (
      <Modal
        show={isDepositModalOpen}
        dismissible={true}
        position='center'
        bgColor={bgColor}
        bodyContent={
          <DepositModalBody
            vaultInfo={vaultInfo}
            register={register}
            watch={watch}
            setValue={setValue}
            errors={formErrors}
          />
        }
        footerContent={
          <DepositModalFooter
            vaultInfo={vaultInfo}
            watch={watch}
            isValidFormInputs={isValidFormInputs}
            openConnectModal={openConnectModal}
            openChainModal={openChainModal}
            addRecentTransaction={addRecentTransaction}
          />
        }
        onClose={() => setIsDepositModalOpen(false)}
      />
    )
  }
}
