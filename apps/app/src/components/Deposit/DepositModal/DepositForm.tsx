import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { BigNumber, utils } from 'ethers'
import { FieldErrorsImpl, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { useAccount, useProvider } from 'wagmi'
import { useTokenBalance, useUserVaultBalance, useVaultShareMultiplier } from 'pt-hooks'
import { VaultInfo, VaultInfoWithBalance } from 'pt-types'
import { divideBigNumbers, formatNumberForDisplay, getBlockExplorerUrl } from 'pt-utilities'
import { useAllCoingeckoTokenPrices } from '@hooks/useAllCoingeckoTokenPrices'
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

// TODO: form input is being unselected everytime a value is entered (most likely being re-rendered)
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

  // const { data: vaultInfoWithBalance, isFetched: isFetchedVaultBalance } = useUserVaultBalance(
  //   provider,
  //   userAddress,
  //   vaultInfo
  // )
  // TODO: remove the following once vaults are setup (and uncomment above)
  const isFetchedVaultBalance: boolean = true
  const vaultInfoWithBalance: VaultInfoWithBalance = { ...vaultInfo, balance: '0' }
  const shareBalance =
    isFetchedVaultBalance && vaultInfoWithBalance ? vaultInfoWithBalance.balance : '0'

  const { data: tokenPrices, isFetched: isFetchedTokenPrices } = useAllCoingeckoTokenPrices()
  const usdPrice =
    isFetchedTokenPrices && !!tokenPrices
      ? tokenPrices[vaultInfo.chainId][
          vaultInfo.extensions.underlyingAsset.address.toLowerCase()
        ]?.['usd'] ?? 0
      : 0

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
    <div className='flex flex-col'>
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
            parseFloat(utils.formatUnits(tokenBalance, vaultInfo.decimals)) >= parseFloat(v) ||
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
        showDownArrow={true}
        className='mb-0.5'
      />
      <DepositFormInput
        token={{
          ...vaultInfo,
          decimals: vaultInfo.decimals.toString(),
          balance: shareBalance,
          usdPrice: divideBigNumbers(BigNumber.from(Math.round(usdPrice * 1000)), vaultMultiplier)
            .div(1000)
            .toNumber()
        }}
        formKey='shareAmount'
        validate={basicValidation}
        register={register}
        watch={watch}
        setValue={setValue}
        errors={errors}
        onChange={calculateTokensForShares}
        className='my-0.5 rounded-b-none'
      />
      {/* TODO: add tooltip next to conversion rate */}
      <div className='flex items-center justify-between gap-4 dark:bg-pt-transparent px-4 py-2 rounded-b-lg'>
        <span className='dark:text-pt-purple-200'>
          1 {vaultInfo.extensions.underlyingAsset.symbol} ={' '}
          {formatNumberForDisplay(
            divideBigNumbers(BigNumber.from(1000), vaultMultiplier).toNumber() / 1000,
            {
              hideZeroes: true
            }
          )}{' '}
          {vaultInfo.symbol}
        </span>
        <a
          href={getBlockExplorerUrl(vaultInfo.chainId, vaultInfo.address, 'token')}
          target='_blank'
          rel='noreferrer'
          className='inline-flex items-center gap-1 text-xs dark:text-pt-teal'
        >
          <span>View Prize Asset</span>
          <ArrowTopRightOnSquareIcon className='h-4 w-4 dark:text-inherit' />
        </a>
      </div>
    </div>
  )
}
