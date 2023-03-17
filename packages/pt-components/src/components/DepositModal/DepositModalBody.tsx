import { FieldErrorsImpl, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { VaultInfo } from 'pt-types'
import { getNiceNetworkNameByChainId } from 'pt-utilities'
import { NetworkBadge } from '../Badges/NetworkBadge'
import { DepositForm } from '../Form/DepositForm'
import { TxFormValues } from '../Form/TxFormInput'

interface DepositModalBodyProps {
  vaultInfo: VaultInfo
  register: UseFormRegister<TxFormValues>
  watch: UseFormWatch<TxFormValues>
  setValue: UseFormSetValue<TxFormValues>
  errors: FieldErrorsImpl<TxFormValues>
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
        <NetworkBadge chainId={vaultInfo.chainId} appendText='Prize Pool' hideIcon={true} />
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
