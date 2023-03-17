import { ArrowDownIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { BigNumber, utils } from 'ethers'
import { FieldErrorsImpl, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { TokenWithBalance, TokenWithLogo, TokenWithUsdPrice } from 'pt-types'
import { formatBigNumberForDisplay } from 'pt-utilities'
import { CurrencyValue } from '../Currency/CurrencyValue'
import { TokenIcon } from '../Icons/TokenIcon'

export interface TxFormValues {
  tokenAmount: string
  shareAmount: string
}

export interface TxFormInputProps {
  token: TokenWithBalance & TokenWithUsdPrice & Partial<TokenWithLogo>
  formKey: keyof TxFormValues
  validate?: { [rule: string]: (v: any) => true | string }
  disabled?: boolean
  register: UseFormRegister<TxFormValues>
  watch: UseFormWatch<TxFormValues>
  setValue: UseFormSetValue<TxFormValues>
  errors: FieldErrorsImpl<TxFormValues>
  onChange?: (v: string) => void
  showMaxButton?: boolean
  showDownArrow?: boolean
  className?: string
}

export const TxFormInput = (props: TxFormInputProps) => {
  const {
    token,
    formKey,
    validate,
    disabled,
    register,
    watch,
    setValue,
    errors,
    onChange,
    showMaxButton,
    showDownArrow,
    className
  } = props

  const formAmount = watch(formKey, '0')
  const usdValue =
    isValidFormInput(formAmount, parseInt(token.decimals)) && !!token.usdPrice
      ? Number(formAmount) * token.usdPrice
      : 0

  const formattedBalance = formatBigNumberForDisplay(BigNumber.from(token.balance), token.decimals)

  const error =
    !!errors[formKey]?.message && typeof errors[formKey]?.message === 'string'
      ? errors[formKey]?.message
      : null

  const setFormAmountToMax = () => {
    const formattedAmount = utils.formatUnits(token.balance, token.decimals)
    setValue(
      formKey,
      formattedAmount.endsWith('.0') ? formattedAmount.slice(0, -2) : formattedAmount,
      {
        shouldValidate: true
      }
    )
    if (!!onChange) {
      onChange(formattedAmount)
    }
  }

  const basicValidation: { [rule: string]: (v: any) => true | string } = {
    isValidNumber: (v) => !Number.isNaN(Number(v)) || 'Enter a valid number',
    isGreaterThanOrEqualToZero: (v) => parseFloat(v) >= 0 || 'Enter a positive number',
    isNotTooPrecise: (v) =>
      v.split('.').length < 2 ||
      v.split('.')[1].length <= parseInt(token.decimals) ||
      'Too many decimals'
  }

  return (
    <div className={classNames('relative bg-pt-transparent p-4 rounded-lg', className)}>
      <div className='flex justify-between gap-6'>
        <input
          id={formKey}
          {...register(formKey, {
            validate: { ...basicValidation, ...validate },
            onChange: (e) => onChange?.(e.target.value as string)
          })}
          className='min-w-0 flex-grow text-2xl font-semibold bg-transparent text-pt-purple-50 focus:outline-none'
          disabled={disabled}
        />
        <div className='flex shrink-0 items-center gap-1'>
          <TokenIcon token={token} />
          <span className='text-2xl font-semibold'>{token.symbol}</span>
        </div>
      </div>
      <div className='flex justify-between gap-6 text-pt-purple-100'>
        <CurrencyValue baseValue={usdValue} />
        <div className='flex gap-1'>
          <span>Balance: {formattedBalance}</span>
          {showMaxButton && (
            <span
              onClick={setFormAmountToMax}
              className='text-pt-purple-200 cursor-pointer select-none'
            >
              Max
            </span>
          )}
        </div>
      </div>
      {/* TODO: style error message or outline */}
      {!!error && <span>{error}</span>}
      {showDownArrow && (
        <div className='absolute -bottom-4 left-0 right-0 mx-auto flex items-center justify-center h-8 w-8 bg-pt-bg-purple-light border-2 border-pt-purple-50 rounded-lg z-10'>
          <ArrowDownIcon className='h-5 w-5 text-pt-purple-100' />
        </div>
      )}
    </div>
  )
}

/**
 * Checks if a form value is valid
 * @param formValue the form value to check
 * @param decimals the decimals the input should be constrained to
 * @returns
 */
export const isValidFormInput = (formValue: string, decimals: number): boolean => {
  if (
    !!formValue &&
    !Number.isNaN(Number(formValue)) &&
    parseFloat(formValue) >= 0 &&
    (formValue.split('.').length < 2 || formValue.split('.')[1].length <= decimals)
  ) {
    return true
  } else {
    return false
  }
}
