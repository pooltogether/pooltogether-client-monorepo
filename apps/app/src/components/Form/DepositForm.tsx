import { BigNumber, utils } from 'ethers'
import { FieldErrorsImpl, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { useAccount, useProvider } from 'wagmi'
import { useTokenBalance, useUserVaultBalance, useVaultExchangeRate } from 'pt-hyperstructure-hooks'
import { VaultInfo, VaultInfoWithBalance } from 'pt-types'
import { getAssetsFromShares, getSharesFromAssets, getTokenPriceFromObject } from 'pt-utilities'
import { useAllCoingeckoTokenPrices } from '@hooks/useAllCoingeckoTokenPrices'
import { useVault } from '@hooks/useVaults'
import { TxFormInfo } from './TxFormInfo'
import { isValidFormInput, TxFormInput, TxFormValues } from './TxFormInput'

interface DepositFormProps {
  vaultInfo: VaultInfo
  register: UseFormRegister<TxFormValues>
  watch: UseFormWatch<TxFormValues>
  setValue: UseFormSetValue<TxFormValues>
  errors: FieldErrorsImpl<TxFormValues>
}

// TODO: form input is being unselected everytime a value is entered (most likely being re-rendered)
export const DepositForm = (props: DepositFormProps) => {
  const { vaultInfo, register, watch, setValue, errors } = props

  const vault = useVault(vaultInfo)

  // const { data: vaultExchangeRate } = useVaultExchangeRate(vault)

  // TODO: remove this after vaults have proper addresses (and uncomment code above)
  const vaultExchangeRate = utils.parseUnits('2', vaultInfo.decimals)

  const { address: userAddress } = useAccount()

  const provider = useProvider({ chainId: vaultInfo.chainId })

  const { data: tokenWithBalance, isFetched: isFetchedTokenBalance } = useTokenBalance(
    provider,
    userAddress,
    vaultInfo.extensions.underlyingAsset.address
  )
  const tokenBalance = isFetchedTokenBalance && !!tokenWithBalance ? tokenWithBalance.balance : '0'

  // const { data: vaultInfoWithBalance, isFetched: isFetchedVaultBalance } = useUserVaultBalance(
  //   vault,
  //   userAddress
  // )
  // TODO: remove the following once vaults are setup (and uncomment above)
  const isFetchedVaultBalance: boolean = true
  const vaultInfoWithBalance: VaultInfoWithBalance = { ...vaultInfo, balance: '0' }
  const shareBalance =
    isFetchedVaultBalance && vaultInfoWithBalance ? vaultInfoWithBalance.balance : '0'

  const { data: tokenPrices } = useAllCoingeckoTokenPrices()
  const usdPrice = getTokenPriceFromObject(
    vaultInfo.chainId,
    vaultInfo.extensions.underlyingAsset.address,
    tokenPrices
  )
  const shareUsdPrice =
    getAssetsFromShares(
      BigNumber.from(Math.round(usdPrice * 1000)),
      vaultExchangeRate,
      vaultInfo.decimals
    ).toNumber() / 1000

  const calculateSharesForTokens = (formTokenAmount: string) => {
    if (isValidFormInput(formTokenAmount, vaultInfo.decimals)) {
      const tokens = utils.parseUnits(formTokenAmount, vaultInfo.decimals)
      const shares = getSharesFromAssets(tokens, vaultExchangeRate, vaultInfo.decimals)
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
      const tokens = getAssetsFromShares(shares, vaultExchangeRate, vaultInfo.decimals)
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

  return (
    <div className='flex flex-col'>
      <TxFormInput
        token={{
          ...vaultInfo.extensions.underlyingAsset,
          balance: tokenBalance,
          usdPrice,
          logoURI: vaultInfo.extensions.underlyingAsset.logoURI
        }}
        formKey='tokenAmount'
        validate={{
          isNotGreaterThanBalance: (v) =>
            parseFloat(utils.formatUnits(tokenBalance, vaultInfo.decimals)) >= parseFloat(v) ||
            !isFetchedTokenBalance ||
            !tokenWithBalance ||
            `Not enough ${vaultInfo.extensions.underlyingAsset.symbol} in wallet`
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
          ...vaultInfo,
          decimals: vaultInfo.decimals.toString(),
          balance: shareBalance,
          usdPrice: shareUsdPrice
        }}
        formKey='shareAmount'
        register={register}
        watch={watch}
        setValue={setValue}
        errors={errors}
        onChange={calculateTokensForShares}
        className='my-0.5 rounded-b-none'
      />
      <TxFormInfo vaultInfo={vaultInfo} vaultExchangeRate={vaultExchangeRate} linkType='share' />
    </div>
  )
}
