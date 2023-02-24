import { FieldErrorsImpl, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { VaultInfo } from 'pt-types'
import { DepositForm, DepositFormValues } from './DepositForm'

interface DepositModalBodyProps {
  vaultInfo: VaultInfo
  register: UseFormRegister<DepositFormValues>
  setValue: UseFormSetValue<DepositFormValues>
  errors: FieldErrorsImpl<DepositFormValues>
}

export const DepositModalBody = (props: DepositModalBodyProps) => {
  const { vaultInfo, register, setValue, errors } = props

  return (
    <DepositForm vaultInfo={vaultInfo} register={register} setValue={setValue} errors={errors} />
  )
}
