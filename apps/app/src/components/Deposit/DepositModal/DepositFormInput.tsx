import { BigNumber, utils } from 'ethers'
import { ChangeEvent } from 'react'
import { FieldErrorsImpl, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { TokenWithBalance, TokenWithLogo, TokenWithUsdPrice } from 'pt-types'
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
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  showMaxButton?: boolean
}

// TODO: "Max" button functionality
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

  const formAmount = Number(watch(formKey, '0'))
  const usdValue = formatCurrencyNumberForDisplay(!Number.isNaN(formAmount) ? formAmount : 0, 'USD')

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
  }

  return (
    <>
      <input
        id={formKey}
        {...register(formKey, { validate, onChange })}
        className='w-full dark:bg-pt-transparent'
        disabled={disabled}
      />
      <span>Value: {usdValue}</span>
      <span>
        {/* TODO: add fallback token logo component */}
        {!!token.logoURI ? <img src={token.logoURI} alt={`${token.symbol} Logo`} /> : <></>}
        {token.symbol}
      </span>
      <span>Balance: {formattedBalance}</span>
      {showMaxButton && <span onClick={setFormAmountToMax}>Max</span>}
      {!!error && <span>{error}</span>}
    </>
  )
}
