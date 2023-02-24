import classNames from 'classnames'
import { BigNumber, utils } from 'ethers'
import { ChangeEvent } from 'react'
import { FieldErrorsImpl, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { useAllVaultShareMultipliers } from 'pt-hooks'
import { VaultInfo } from 'pt-types'
import { divideBigNumbers } from 'pt-utilities'
import defaultVaultList from '@data/defaultVaultList'
import { useProviders } from '@hooks/useProviders'

export interface DepositFormValues {
  tokenAmount: string
  shareAmount: string
}

interface DepositFormProps {
  vaultInfo: VaultInfo
  register: UseFormRegister<DepositFormValues>
  setValue: UseFormSetValue<DepositFormValues>
  errors: FieldErrorsImpl<DepositFormValues>
}

// TODO: form validation
// TODO: get rid of annoying `.0` from ethers formatting
export const DepositForm = (props: DepositFormProps) => {
  const { vaultInfo, register, setValue, errors } = props

  // const providers = useProviders()
  // const { data: vaultMultipliers } = useAllVaultShareMultipliers(providers, defaultVaultList)

  // const vaultId = `${vaultInfo.address}-${vaultInfo.chainId}`
  // const vaultMultiplier = vaultMultipliers[vaultId]

  // TODO: remove this after vaults have proper addresses (and uncomment code above)
  const vaultMultiplier = BigNumber.from('2')

  const calculateSharesForTokens = (e: ChangeEvent<HTMLInputElement>) => {
    const formTokenAmount = e.target.value
    if (!!formTokenAmount) {
      const tokens = utils.parseUnits(formTokenAmount, vaultInfo.decimals)
      const shares = divideBigNumbers(tokens, vaultMultiplier)
      setValue('shareAmount', utils.formatUnits(shares, vaultInfo.decimals), {
        shouldValidate: true
      })
    }
  }

  const calculateTokensForShares = (e: ChangeEvent<HTMLInputElement>) => {
    const formShareAmount = e.target.value
    if (!!formShareAmount) {
      const shares = utils.parseUnits(formShareAmount, vaultInfo.decimals)
      const tokens = shares.mul(vaultMultiplier)
      setValue('tokenAmount', utils.formatUnits(tokens, vaultInfo.decimals), {
        shouldValidate: true
      })
    }
  }

  return (
    <>
      <DepositFormInput
        formKey='tokenAmount'
        register={register}
        errors={errors}
        onChange={calculateSharesForTokens}
      />
      <DepositFormInput
        formKey='shareAmount'
        register={register}
        errors={errors}
        onChange={calculateTokensForShares}
      />
    </>
  )
}

interface DepositFormInputProps {
  formKey: keyof DepositFormValues
  validate?: { [rule: string]: (v: any) => true | string }
  disabled?: boolean
  register: UseFormRegister<DepositFormValues>
  errors: FieldErrorsImpl<DepositFormValues>
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const DepositFormInput = (props: DepositFormInputProps) => {
  const { formKey, validate, disabled, errors, register, onChange } = props

  const error =
    !!errors[formKey]?.message && typeof errors[formKey].message === 'string'
      ? errors[formKey].message
      : null

  return (
    <>
      <input
        id={formKey}
        {...register(formKey, { validate, onChange })}
        className={classNames('w-full dark:bg-pt-transparent')}
        disabled={disabled}
      />
      {!!error && <span>{error}</span>}
    </>
  )
}
