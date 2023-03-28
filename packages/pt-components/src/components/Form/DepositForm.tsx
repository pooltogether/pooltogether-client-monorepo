import { BigNumber, utils } from 'ethers'
import { FieldErrorsImpl, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { useAccount, useProvider } from 'wagmi'
import { Vault } from 'pt-client-js'
import { useCoingeckoTokenPrices } from 'pt-generic-hooks'
import { useTokenBalance, useUserVaultBalance, useVaultExchangeRate } from 'pt-hyperstructure-hooks'
import { getAssetsFromShares, getSharesFromAssets, getTokenPriceFromObject } from 'pt-utilities'
import { TxFormInfo } from './TxFormInfo'
import { isValidFormInput, TxFormInput, TxFormValues } from './TxFormInput'

export interface DepositFormProps {
  vault: Vault
  register: UseFormRegister<TxFormValues>
  watch: UseFormWatch<TxFormValues>
  setValue: UseFormSetValue<TxFormValues>
  errors: FieldErrorsImpl<TxFormValues>
}

// TODO: form input is being unselected everytime a value is entered (most likely being re-rendered)
export const DepositForm = (props: DepositFormProps) => {
  const { vault, register, watch, setValue, errors } = props

  const { data: vaultExchangeRate } = useVaultExchangeRate(vault)

  const { address: userAddress } = useAccount()

  const provider = useProvider({ chainId: vault.chainId })

  const { data: tokenWithBalance, isFetched: isFetchedTokenBalance } = useTokenBalance(
    provider,
    userAddress as `0x${string}`,
    vault.tokenData?.address as string
  )
  const tokenBalance = isFetchedTokenBalance && !!tokenWithBalance ? tokenWithBalance.balance : '0'

  const { data: vaultBalance, isFetched: isFetchedVaultBalance } = useUserVaultBalance(
    vault,
    userAddress as `0x${string}`
  )
  const shareBalance = isFetchedVaultBalance && !!vaultBalance ? vaultBalance.balance : '0'

  const { data: tokenPrices } = useCoingeckoTokenPrices(vault.chainId, [
    vault.tokenData?.address as string
  ])
  const usdPrice = !!vault.tokenData
    ? getTokenPriceFromObject(vault.chainId, vault.tokenData.address, {
        [vault.chainId]: tokenPrices ?? {}
      })
    : 0
  const shareUsdPrice =
    !!vaultExchangeRate && vault.decimals !== undefined
      ? getAssetsFromShares(
          BigNumber.from(Math.round(usdPrice * 1000)),
          vaultExchangeRate,
          vault.decimals
        ).toNumber() / 1000
      : 0

  const calculateSharesForTokens = (formTokenAmount: string) => {
    if (
      !!vaultExchangeRate &&
      vault.decimals !== undefined &&
      isValidFormInput(formTokenAmount, vault.decimals)
    ) {
      const tokens = utils.parseUnits(formTokenAmount, vault.decimals)
      const shares = getSharesFromAssets(tokens, vaultExchangeRate, vault.decimals)
      const formattedShares = utils.formatUnits(shares, vault.decimals)
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
    if (
      !!vaultExchangeRate &&
      vault.decimals !== undefined &&
      isValidFormInput(formShareAmount, vault.decimals)
    ) {
      const shares = utils.parseUnits(formShareAmount, vault.decimals)
      const tokens = getAssetsFromShares(shares, vaultExchangeRate, vault.decimals)
      const formattedTokens = utils.formatUnits(tokens, vault.decimals)
      setValue(
        'tokenAmount',
        formattedTokens.endsWith('.0') ? formattedTokens.slice(0, -2) : formattedTokens,
        {
          shouldValidate: true
        }
      )
    }
  }

  return (
    <div className='flex flex-col'>
      {!!vault.tokenData && !!vault.shareData && vault.decimals !== undefined && (
        <>
          <TxFormInput
            token={{
              ...vault.tokenData,
              balance: tokenBalance,
              usdPrice,
              logoURI: vault.tokenLogoURI
            }}
            formKey='tokenAmount'
            validate={{
              isNotGreaterThanBalance: (v) =>
                parseFloat(utils.formatUnits(tokenBalance, vault.decimals)) >= parseFloat(v) ||
                !isFetchedTokenBalance ||
                !tokenWithBalance ||
                `Not enough ${vault.tokenData?.symbol} in wallet`
            }}
            register={register}
            watch={watch}
            setValue={setValue}
            errors={errors}
            onChange={calculateSharesForTokens}
            showMaxButton={true}
            showDownArrow={true}
            className='mb-0.5'
          />
          <TxFormInput
            token={{
              ...vault.shareData,
              balance: shareBalance,
              usdPrice: shareUsdPrice,
              logoURI: vault.logoURI
            }}
            formKey='shareAmount'
            register={register}
            watch={watch}
            setValue={setValue}
            errors={errors}
            onChange={calculateTokensForShares}
            className='my-0.5 rounded-b-none'
          />
          <TxFormInfo vault={vault} linkType='share' />
        </>
      )}
    </div>
  )
}
