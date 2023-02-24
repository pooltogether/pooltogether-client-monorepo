import { BigNumber, utils } from 'ethers'
import { ChangeEvent } from 'react'
import { FieldErrorsImpl, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { useAccount, useProvider } from 'wagmi'
import {
  useCoingeckoTokenPrices,
  useTokenBalance,
  useUserVaultBalance,
  useVaultShareMultiplier
} from 'pt-hooks'
import { VaultInfo } from 'pt-types'
import { divideBigNumbers, sToMs } from 'pt-utilities'
import { DepositFormInput } from './DepositFormInput'

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
  // const { data: vaultMultiplier } = useVaultShareMultiplier(provider, vaultInfo, sToMs(10))

  // TODO: remove this after vaults have proper addresses (and uncomment code above)
  const vaultMultiplier = BigNumber.from('2')

  const { address: userAddress } = useAccount()

  const { data: tokenWithBalance, isFetched: isFetchedTokenBalance } = useTokenBalance(
    provider,
    userAddress,
    vaultInfo.extensions.underlyingAsset.address,
    sToMs(30)
  )
  const tokenBalance = isFetchedTokenBalance && !!tokenWithBalance ? tokenWithBalance.balance : '0'

  const { data: vaultInfoWithBalance, isFetched: isFetchedVaultBalance } = useUserVaultBalance(
    provider,
    userAddress,
    vaultInfo,
    sToMs(30)
  )

  const { data: coingeckoPrices, isFetched: isFetchedCoingeckoPrices } = useCoingeckoTokenPrices(
    vaultInfo.chainId,
    [vaultInfo.extensions.underlyingAsset.address],
    ['usd']
  )
  const usdPrice =
    isFetchedCoingeckoPrices && !!coingeckoPrices
      ? coingeckoPrices[vaultInfo.extensions.underlyingAsset.address]?.['usd']
      : 0

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
            (isFetchedVaultBalance &&
              !!vaultInfoWithBalance &&
              parseFloat(utils.formatUnits(vaultInfoWithBalance.balance, vaultInfo.decimals)) >=
                parseFloat(v)) ||
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
        token={{ ...vaultInfoWithBalance, decimals: String(vaultInfo.decimals), usdPrice: 0 }}
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
