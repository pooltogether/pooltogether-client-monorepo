import { FieldErrorsImpl, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { VaultInfo } from 'pt-types'
import { DepositForm, DepositFormValues } from './DepositForm'

interface DepositModalBodyProps {
  vaultInfo: VaultInfo
  register: UseFormRegister<DepositFormValues>
  watch: UseFormWatch<DepositFormValues>
  setValue: UseFormSetValue<DepositFormValues>
  errors: FieldErrorsImpl<DepositFormValues>
}

export const DepositModalBody = (props: DepositModalBodyProps) => {
  const { vaultInfo, register, watch, setValue, errors } = props

  return (
    <DepositForm
      vaultInfo={vaultInfo}
      register={register}
      watch={watch}
      setValue={setValue}
      errors={errors}
    />
  )
}
