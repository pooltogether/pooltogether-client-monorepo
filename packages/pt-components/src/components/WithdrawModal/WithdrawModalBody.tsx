import { FieldErrorsImpl, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { VaultInfo } from 'pt-types'
import { getNiceNetworkNameByChainId } from 'pt-utilities'
import { NetworkBadge } from '../Badges/NetworkBadge'
import { TxFormValues } from '../Form/TxFormInput'
import { WithdrawForm } from '../Form/WithdrawForm'

interface WithdrawModalBodyProps {
  vaultInfo: VaultInfo
  register: UseFormRegister<TxFormValues>
  watch: UseFormWatch<TxFormValues>
  setValue: UseFormSetValue<TxFormValues>
  errors: FieldErrorsImpl<TxFormValues>
}

export const WithdrawModalBody = (props: WithdrawModalBodyProps) => {
  const { vaultInfo, register, watch, setValue, errors } = props

  const networkName = getNiceNetworkNameByChainId(vaultInfo.chainId)

  return (
    <div className='flex flex-col gap-6'>
      <span className='w-full text-xl font-semibold text-center'>
        Withdraw from {vaultInfo.name} on {networkName}
      </span>
      <div className='flex flex-col items-center gap-1'>
        <span className='text-xs dark:text-pt-purple-100'>Prize Pool</span>
        <NetworkBadge chainId={vaultInfo.chainId} />
      </div>
      <WithdrawForm
        vaultInfo={vaultInfo}
        register={register}
        watch={watch}
        setValue={setValue}
        errors={errors}
      />
    </div>
  )
}
