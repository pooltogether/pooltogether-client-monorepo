import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { VaultInfo } from 'pt-types'
import { Modal } from 'pt-ui'
import { DepositModalBody } from './Body'
import { DepositFormValues } from './DepositForm'
import { DepositModalFooter } from './Footer'
import { DepositModalHeader } from './Header'

interface DepositModalProps {
  vaultInfo: VaultInfo
  isOpen: boolean
  onClose?: () => void
}

export const DepositModal = (props: DepositModalProps) => {
  const { vaultInfo, isOpen, onClose } = props

  // NOTE: This is necessary due to hydration errors otherwise.
  const [isBrowser, setIsBrowser] = useState(false)
  useEffect(() => setIsBrowser(true), [])

  const defaultFormValues: DepositFormValues = { tokenAmount: '0', shareAmount: '0' }
  const {
    register,
    watch,
    setValue,
    formState: { errors: formErrors, isValid: isValidFormInputs }
  } = useForm<DepositFormValues>({
    mode: 'onChange',
    defaultValues: defaultFormValues,
    shouldUnregister: true
  })

  if (isBrowser) {
    return (
      <Modal
        show={isOpen}
        dismissible={true}
        headerContent={<DepositModalHeader vaultInfo={vaultInfo} />}
        bodyContent={
          <DepositModalBody
            vaultInfo={vaultInfo}
            register={register}
            setValue={setValue}
            errors={formErrors}
          />
        }
        footerContent={
          <DepositModalFooter
            vaultInfo={vaultInfo}
            watch={watch}
            isValidFormInputs={isValidFormInputs}
          />
        }
        onClose={onClose}
      />
    )
  }
}
