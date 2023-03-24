import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Vault } from 'pt-client-js'
import { useIsWithdrawModalOpen } from 'pt-generic-hooks'
import { Modal } from 'pt-ui'
import { TxFormValues } from '../Form/TxFormInput'
import { WithdrawModalBody } from './WithdrawModalBody'
import { WithdrawModalFooter } from './WithdrawModalFooter'

export interface WithdrawModalProps {
  vault: Vault
  bgColor?: 'light' | 'dark'
  openConnectModal?: () => void
  openChainModal?: () => void
  addRecentTransaction?: (tx: { hash: string; description: string; confirmations?: number }) => void
}

export const WithdrawModal = (props: WithdrawModalProps) => {
  const { vault, bgColor, openConnectModal, openChainModal, addRecentTransaction } = props

  const { isWithdrawModalOpen, setIsWithdrawModalOpen } = useIsWithdrawModalOpen()

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

  if (isBrowser && !!vault) {
    return (
      <Modal
        show={isWithdrawModalOpen}
        dismissible={true}
        position='center'
        bgColor={bgColor}
        bodyContent={
          <WithdrawModalBody
            vault={vault}
            register={register}
            watch={watch}
            setValue={setValue}
            errors={formErrors}
          />
        }
        footerContent={
          <WithdrawModalFooter
            vault={vault}
            watch={watch}
            isValidFormInputs={isValidFormInputs}
            openConnectModal={openConnectModal}
            openChainModal={openChainModal}
            addRecentTransaction={addRecentTransaction}
          />
        }
        onClose={() => setIsWithdrawModalOpen(false)}
      />
    )
  }
}
