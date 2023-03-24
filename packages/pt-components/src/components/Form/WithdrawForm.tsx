import { BigNumber, utils } from 'ethers'
import { FieldErrorsImpl, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { useAccount, useProvider } from 'wagmi'
import { Vault } from 'pt-client-js'
import { useCoingeckoTokenPrices } from 'pt-generic-hooks'
import {
  useSingleVaultShareData,
  useSingleVaultTokenData,
  useTokenBalance,
  useUserVaultBalance,
  useVaultExchangeRate
} from 'pt-hyperstructure-hooks'
import { getAssetsFromShares, getSharesFromAssets, getTokenPriceFromObject } from 'pt-utilities'
import { TxFormInfo } from './TxFormInfo'
import { isValidFormInput, TxFormInput, TxFormValues } from './TxFormInput'

export interface WithdrawFormProps {
  vault: Vault
  register: UseFormRegister<TxFormValues>
  watch: UseFormWatch<TxFormValues>
  setValue: UseFormSetValue<TxFormValues>
  errors: FieldErrorsImpl<TxFormValues>
}

// TODO: form input is being unselected everytime a value is entered (most likely being re-rendered)
export const WithdrawForm = (props: WithdrawFormProps) => {
  const { vault, register, watch, setValue, errors } = props

  const { data: vaultShareData } = useSingleVaultShareData(vault)
  const { data: vaultTokenData } = useSingleVaultTokenData(vault)

  const { data: vaultExchangeRate } = useVaultExchangeRate(vault)

  const { address: userAddress } = useAccount()

  const provider = useProvider({ chainId: vault.chainId })

  const { data: tokenWithBalance, isFetched: isFetchedTokenBalance } = useTokenBalance(
    provider,
    userAddress as `0x${string}`,
    vaultTokenData?.address as string
  )
  const tokenBalance = isFetchedTokenBalance && !!tokenWithBalance ? tokenWithBalance.balance : '0'

  const { data: vaultBalance, isFetched: isFetchedVaultBalance } = useUserVaultBalance(
    vault,
    userAddress as `0x${string}`
  )
  const shareBalance = isFetchedVaultBalance && !!vaultBalance ? vaultBalance.balance : '0'

  const decimals = vaultShareData?.decimals ?? vaultTokenData?.decimals

  const { data: tokenPrices } = useCoingeckoTokenPrices(vault.chainId, [
    vaultTokenData?.address as string
  ])
  const usdPrice = !!vaultTokenData
    ? getTokenPriceFromObject(vault.chainId, vaultTokenData.address, {
        [vault.chainId]: tokenPrices ?? {}
      })
    : 0
  const shareUsdPrice =
    !!vaultExchangeRate && decimals !== undefined
      ? getAssetsFromShares(
          BigNumber.from(Math.round(usdPrice * 1000)),
          vaultExchangeRate,
          decimals
        ).toNumber() / 1000
      : 0

  const calculateSharesForTokens = (formTokenAmount: string) => {
    if (
      !!vaultExchangeRate &&
      decimals !== undefined &&
      isValidFormInput(formTokenAmount, decimals)
    ) {
      const tokens = utils.parseUnits(formTokenAmount, decimals)
      const shares = getSharesFromAssets(tokens, vaultExchangeRate, decimals)
      const formattedShares = utils.formatUnits(shares, decimals)
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
      decimals !== undefined &&
      isValidFormInput(formShareAmount, decimals)
    ) {
      const shares = utils.parseUnits(formShareAmount, decimals)
      const tokens = getAssetsFromShares(shares, vaultExchangeRate, decimals)
      const formattedTokens = utils.formatUnits(tokens, decimals)
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
      {!!vaultTokenData && !!vaultShareData && (
        <>
          <TxFormInput
            token={{
              ...vaultShareData,
              balance: shareBalance,
              usdPrice: shareUsdPrice,
              logoURI: vault.logoURI
            }}
            formKey='shareAmount'
            validate={{
              isNotGreaterThanShareBalance: (v) =>
                parseFloat(utils.formatUnits(shareBalance, decimals)) >= parseFloat(v) ||
                !isFetchedVaultBalance ||
                !vaultBalance ||
                `Not enough ${vaultShareData.symbol} in wallet`
            }}
            register={register}
            watch={watch}
            setValue={setValue}
            errors={errors}
            onChange={calculateTokensForShares}
            showMaxButton={true}
            showDownArrow={true}
            className='mb-0.5'
          />
          <TxFormInput
            token={{
              ...vaultTokenData,
              balance: tokenBalance,
              usdPrice
            }}
            formKey='tokenAmount'
            register={register}
            watch={watch}
            setValue={setValue}
            errors={errors}
            onChange={calculateSharesForTokens}
            className='my-0.5 rounded-b-none'
          />
          <TxFormInfo vault={vault} linkType='token' />
        </>
      )}
    </div>
  )
}
