import { FieldErrorsImpl, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { NetworkBadge } from 'pt-components'
import { VaultInfo } from 'pt-types'
import { getNiceNetworkNameByChainId } from 'pt-utilities'
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

  const networkName = getNiceNetworkNameByChainId(vaultInfo.chainId)

  return (
    <div className='flex flex-col gap-6'>
      <span className='w-full text-xl font-semibold text-center'>
        Deposit to {vaultInfo.name} on {networkName}
      </span>
      <div className='flex flex-col items-center gap-1'>
        <span className='text-xs dark:text-pt-purple-100'>Prize Pool</span>
        <NetworkBadge chainId={vaultInfo.chainId} />
      </div>
      <DepositForm
        vaultInfo={vaultInfo}
        register={register}
        watch={watch}
        setValue={setValue}
        errors={errors}
      />
    </div>
  )
}
