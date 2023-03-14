import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { VaultInfo } from 'pt-types'
import { Modal } from 'pt-ui'
import { TxFormValues } from '../Form/TxFormInput'
import { WithdrawModalBody } from './WithdrawModalBody'
import { WithdrawModalFooter } from './WithdrawModalFooter'

export interface WithdrawModalProps {
  vaultInfo: VaultInfo
  isOpen: boolean
  onClose?: () => void
  openConnectModal?: () => void
  openChainModal?: () => void
  addRecentTransaction?: (tx: { hash: string; description: string; confirmations?: number }) => void
}

export const WithdrawModal = (props: WithdrawModalProps) => {
  const { vaultInfo, isOpen, onClose, openConnectModal, openChainModal, addRecentTransaction } =
    props

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
    defaultValues: { shareAmount: '0', tokenAmount: '0' },
    shouldUnregister: true
  })

  if (isBrowser) {
    return (
      <Modal
        show={isOpen}
        dismissible={true}
        position='center'
        bgColor='light'
        bodyContent={
          <WithdrawModalBody
            vaultInfo={vaultInfo}
            register={register}
            watch={watch}
            setValue={setValue}
            errors={formErrors}
          />
        }
        footerContent={
          <WithdrawModalFooter
            vaultInfo={vaultInfo}
            watch={watch}
            isValidFormInputs={isValidFormInputs}
            openConnectModal={openConnectModal}
            openChainModal={openChainModal}
            addRecentTransaction={addRecentTransaction}
          />
        }
        onClose={onClose}
      />
    )
  }
}
