import classNames from 'classnames'
import { BigNumber, utils } from 'ethers'
import { ChangeEvent } from 'react'
import { FieldErrorsImpl, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { useAccount, useProvider } from 'wagmi'
import { useUserVaultBalance, useVaultShareMultiplier } from 'pt-hooks'
import { VaultInfo } from 'pt-types'
import { divideBigNumbers } from 'pt-utilities'

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

export const DepositForm = (props: DepositFormProps) => {
  const { vaultInfo, register, setValue, errors } = props

  const provider = useProvider({ chainId: vaultInfo.chainId })
  // const { data: vaultMultiplier } = useVaultShareMultiplier(provider, vaultInfo, 10_000)

  // TODO: remove this after vaults have proper addresses (and uncomment code above)
  const vaultMultiplier = BigNumber.from('2')

  const { address: userAddress } = useAccount()
  const { data: vaultInfoWithBalance, isFetched: isFetchedUserBalance } = useUserVaultBalance(
    provider,
    userAddress,
    vaultInfo
  )

  const calculateSharesForTokens = (e: ChangeEvent<HTMLInputElement>) => {
    const formTokenAmount = e.target.value
    if (!!formTokenAmount) {
      const tokens = utils.parseUnits(formTokenAmount, vaultInfo.decimals)
      const shares = divideBigNumbers(tokens, vaultMultiplier)
      const formattedShares = utils.formatUnits(shares, vaultInfo.decimals)
      setValue(
        'shareAmount',
        formattedShares.endsWith('.0') ? formattedShares.slice(0, -2) : formattedShares,
        {
          shouldValidate: true
        }
      )
    }
  }

  const calculateTokensForShares = (e: ChangeEvent<HTMLInputElement>) => {
    const formShareAmount = e.target.value
    if (!!formShareAmount) {
      const shares = utils.parseUnits(formShareAmount, vaultInfo.decimals)
      const tokens = shares.mul(vaultMultiplier)
      const formattedTokens = utils.formatUnits(tokens, vaultInfo.decimals)
      setValue(
        'tokenAmount',
        formattedTokens.endsWith('.0') ? formattedTokens.slice(0, -2) : formattedTokens,
        {
          shouldValidate: true
        }
      )
    }
  }

  const basicValidation: { [rule: string]: (v: any) => true | string } = {
    isValidNumber: (v) => !Number.isNaN(Number(v)) || 'Invalid number',
    isGreaterThanOrEqualToZero: (v) => parseFloat(v) >= 0 || 'Negative numbers not allowed',
    isNotTooPrecise: (v) =>
      v.split('.').length < 2 || v.split('.')[1].length < vaultInfo.decimals || 'Too many decimals'
  }

  return (
    <>
      <DepositFormInput
        formKey='tokenAmount'
        validate={{
          ...basicValidation,
          isNotGreaterThanBalance: (v) =>
            (isFetchedUserBalance &&
              !!vaultInfoWithBalance &&
              parseFloat(utils.formatUnits(vaultInfoWithBalance.balance, vaultInfo.decimals)) >=
                parseFloat(v)) ||
            !isFetchedUserBalance ||
            !vaultInfoWithBalance ||
            `Not enough ${vaultInfo.extensions.underlyingAsset.symbol} in wallet`
        }}
        register={register}
        errors={errors}
        onChange={calculateSharesForTokens}
      />
      <DepositFormInput
        formKey='shareAmount'
        validate={basicValidation}
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
