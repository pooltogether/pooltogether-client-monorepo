import { BigNumber, utils } from 'ethers'
import { FieldErrorsImpl, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { TokenWithBalance, TokenWithLogo, TokenWithUsdPrice } from 'pt-types'
import { FallbackTokenLogo } from 'pt-ui'
import { formatBigNumberForDisplay, formatCurrencyNumberForDisplay } from 'pt-utilities'
import { DepositFormValues } from './DepositForm'

interface DepositFormInputProps {
  token: TokenWithBalance & TokenWithUsdPrice & Partial<TokenWithLogo>
  formKey: keyof DepositFormValues
  validate?: { [rule: string]: (v: any) => true | string }
  disabled?: boolean
  register: UseFormRegister<DepositFormValues>
  watch: UseFormWatch<DepositFormValues>
  setValue: UseFormSetValue<DepositFormValues>
  errors: FieldErrorsImpl<DepositFormValues>
  onChange?: (v: string) => void
  showMaxButton?: boolean
}

export const DepositFormInput = (props: DepositFormInputProps) => {
  const {
    token,
    formKey,
    validate,
    disabled,
    errors,
    register,
    watch,
    setValue,
    onChange,
    showMaxButton
  } = props

  const formAmount = watch(formKey, '0')
  const usdValue = formatCurrencyNumberForDisplay(
    isValidFormInput(formAmount, parseInt(token.decimals)) && !!token.usdPrice
      ? Number(formAmount) * token.usdPrice
      : 0,
    'USD'
  )

  const formattedBalance = formatBigNumberForDisplay(BigNumber.from(token.balance), token.decimals)

  const error =
    !!errors[formKey]?.message && typeof errors[formKey].message === 'string'
      ? errors[formKey].message
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
    onChange(formattedAmount)
  }

  return (
    <>
      <input
        id={formKey}
        {...register(formKey, { validate, onChange: (e) => onChange(e.target.value as string) })}
        className='w-full dark:bg-pt-transparent'
        disabled={disabled}
      />
      <span>Value: {usdValue}</span>
      <span>
        {!!token.logoURI ? (
          <img src={token.logoURI} alt={`${token.symbol} Logo`} />
        ) : (
          <FallbackTokenLogo symbol={token.symbol} />
        )}
        {token.symbol}
      </span>
      <span>Balance: {formattedBalance}</span>
      {showMaxButton && <span onClick={setFormAmountToMax}>Max</span>}
      {!!error && <span>{error}</span>}
    </>
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
