import { BigNumber, utils } from 'ethers'
import { useAtomValue } from 'jotai'
import { FieldErrorsImpl, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { useAccount, useProvider } from 'wagmi'
import { useTokenBalance, useUserVaultBalance, useVaultShareMultiplier } from 'pt-hooks'
import { VaultInfo } from 'pt-types'
import { divideBigNumbers } from 'pt-utilities'
import { tokenPricesAtom } from '../../../atoms'
import { DepositFormInput, isValidFormInput } from './DepositFormInput'

export interface DepositFormValues {
  tokenAmount: string
  shareAmount: string
}

interface DepositFormProps {
  vaultInfo: VaultInfo
  register: UseFormRegister<DepositFormValues>
  watch: UseFormWatch<DepositFormValues>
  setValue: UseFormSetValue<DepositFormValues>
  errors: FieldErrorsImpl<DepositFormValues>
}

export const DepositForm = (props: DepositFormProps) => {
  const { vaultInfo, register, watch, setValue, errors } = props

  const provider = useProvider({ chainId: vaultInfo.chainId })
  // const { data: vaultMultiplier } = useVaultShareMultiplier(provider, vaultInfo)

  // TODO: remove this after vaults have proper addresses (and uncomment code above)
  const vaultMultiplier = BigNumber.from('2')

  const { address: userAddress } = useAccount()

  const { data: tokenWithBalance, isFetched: isFetchedTokenBalance } = useTokenBalance(
    provider,
    userAddress,
    vaultInfo.extensions.underlyingAsset.address
  )
  const tokenBalance = isFetchedTokenBalance && !!tokenWithBalance ? tokenWithBalance.balance : '0'

  const { data: vaultInfoWithBalance, isFetched: isFetchedVaultBalance } = useUserVaultBalance(
    provider,
    userAddress,
    vaultInfo
  )
  const shareBalance =
    isFetchedVaultBalance && vaultInfoWithBalance ? vaultInfoWithBalance.balance : '0'

  const tokenPrices =
    useAtomValue(tokenPricesAtom)[vaultInfo.chainId]?.[
      vaultInfo.extensions.underlyingAsset.address.toLowerCase()
    ]
  const usdPrice = tokenPrices?.['usd'] ?? 0

  const calculateSharesForTokens = (formTokenAmount: string) => {
    if (isValidFormInput(formTokenAmount, vaultInfo.decimals)) {
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

  const calculateTokensForShares = (formShareAmount: string) => {
    if (isValidFormInput(formShareAmount, vaultInfo.decimals)) {
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
    isValidNumber: (v) => !Number.isNaN(Number(v)) || 'Enter a valid number',
    isGreaterThanOrEqualToZero: (v) => parseFloat(v) >= 0 || 'Enter a positive number',
    isNotTooPrecise: (v) =>
      v.split('.').length < 2 || v.split('.')[1].length <= vaultInfo.decimals || 'Too many decimals'
  }

  return (
    <>
      <DepositFormInput
        token={{
          ...vaultInfo.extensions.underlyingAsset,
          balance: tokenBalance,
          usdPrice,
          logoURI: vaultInfo.extensions.underlyingAsset.logoURI
        }}
        formKey='tokenAmount'
        validate={{
          ...basicValidation,
          isNotGreaterThanBalance: (v) =>
            parseFloat(utils.formatUnits(shareBalance, vaultInfo.decimals)) >= parseFloat(v) ||
            !isFetchedVaultBalance ||
            !vaultInfoWithBalance ||
            `Not enough ${vaultInfo.extensions.underlyingAsset.symbol} in wallet`
        }}
        register={register}
        watch={watch}
        setValue={setValue}
        errors={errors}
        onChange={calculateSharesForTokens}
        showMaxButton={true}
      />
      <DepositFormInput
        token={{
          ...vaultInfo,
          decimals: vaultInfo.decimals.toString(),
          balance: shareBalance,
          usdPrice: 0 // TODO: calculate share price (token price divided by multiplier)
        }}
        formKey='shareAmount'
        validate={basicValidation}
        register={register}
        watch={watch}
        setValue={setValue}
        errors={errors}
        onChange={calculateTokensForShares}
      />
    </>
  )
}
