import { BigNumber, utils } from 'ethers'
import { atom, useSetAtom } from 'jotai'
import { FormProvider, useForm } from 'react-hook-form'
import { useAccount, useProvider } from 'wagmi'
import { Vault } from 'pt-client-js'
import { useCoingeckoTokenPrices } from 'pt-generic-hooks'
import { useTokenBalance, useUserVaultBalance, useVaultExchangeRate } from 'pt-hyperstructure-hooks'
import { getAssetsFromShares, getSharesFromAssets, getTokenPriceFromObject } from 'pt-utilities'
import { TxFormInfo } from './TxFormInfo'
import { isValidFormInput, TxFormInput, TxFormValues } from './TxFormInput'

export const withdrawFormShareAmountAtom = atom<string>('')

export interface WithdrawFormProps {
  vault: Vault
}

export const WithdrawForm = (props: WithdrawFormProps) => {
  const { vault } = props

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

  const formMethods = useForm<TxFormValues>({
    mode: 'onChange',
    defaultValues: { shareAmount: '', tokenAmount: '' },
    shouldUnregister: true
  })

  const setFormShareAmount = useSetAtom(withdrawFormShareAmountAtom)

  const calculateSharesForTokens = (tokenAmount: string) => {
    if (
      !!vaultExchangeRate &&
      vault.decimals !== undefined &&
      isValidFormInput(tokenAmount, vault.decimals)
    ) {
      const tokens = utils.parseUnits(tokenAmount, vault.decimals)
      const shares = getSharesFromAssets(tokens, vaultExchangeRate, vault.decimals)
      const formattedShares = utils.formatUnits(shares, vault.decimals)
      formMethods.setValue(
        'shareAmount',
        formattedShares.endsWith('.0') ? formattedShares.slice(0, -2) : formattedShares,
        {
          shouldValidate: true
        }
      )
    }
  }

  const calculateTokensForShares = (shareAmount: string) => {
    if (
      !!vaultExchangeRate &&
      vault.decimals !== undefined &&
      isValidFormInput(shareAmount, vault.decimals)
    ) {
      const shares = utils.parseUnits(shareAmount, vault.decimals)
      const tokens = getAssetsFromShares(shares, vaultExchangeRate, vault.decimals)
      const formattedTokens = utils.formatUnits(tokens, vault.decimals)
      formMethods.setValue(
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
          <FormProvider {...formMethods}>
            <TxFormInput
              token={{
                ...vault.shareData,
                balance: shareBalance,
                usdPrice: shareUsdPrice,
                logoURI: vault.logoURI
              }}
              formKey='shareAmount'
              validate={{
                isNotGreaterThanShareBalance: (v) =>
                  parseFloat(utils.formatUnits(shareBalance, vault.decimals)) >= parseFloat(v) ||
                  !isFetchedVaultBalance ||
                  !vaultBalance ||
                  `Not enough ${vault.shareData?.symbol} in wallet`
              }}
              onChange={(shareAmount: string) => {
                setFormShareAmount(shareAmount)
                calculateTokensForShares(shareAmount)
              }}
              showMaxButton={true}
              showDownArrow={true}
              className='mb-0.5'
            />
            <TxFormInput
              token={{
                ...vault.tokenData,
                balance: tokenBalance,
                usdPrice,
                logoURI: vault.tokenLogoURI
              }}
              formKey='tokenAmount'
              onChange={calculateSharesForTokens}
              className='my-0.5 rounded-b-none'
            />
          </FormProvider>
          <TxFormInfo vault={vault} linkType='token' />
        </>
      )}
    </div>
  )
}
