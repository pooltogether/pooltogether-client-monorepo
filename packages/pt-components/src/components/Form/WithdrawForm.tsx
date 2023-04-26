import { utils } from 'ethers'
import { atom, useSetAtom } from 'jotai'
import { useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useAccount } from 'wagmi'
import { Vault } from 'pt-client-js'
import {
  useTokenBalance,
  useUserVaultShareBalance,
  useVaultExchangeRate,
  useVaultSharePrice,
  useVaultTokenPrice
} from 'pt-hyperstructure-hooks'
import { getAssetsFromShares, getSharesFromAssets } from 'pt-utilities'
import { TxFormInfo } from './TxFormInfo'
import { isValidFormInput, TxFormInput, TxFormValues } from './TxFormInput'

export const withdrawFormShareAmountAtom = atom<string>('')
export const withdrawFormTokenAmountAtom = atom<string>('')

export interface WithdrawFormProps {
  vault: Vault
}

export const WithdrawForm = (props: WithdrawFormProps) => {
  const { vault } = props

  const { data: vaultExchangeRate } = useVaultExchangeRate(vault)

  const { address: userAddress } = useAccount()

  const { data: tokenWithAmount, isFetched: isFetchedTokenBalance } = useTokenBalance(
    vault.chainId,
    userAddress as `0x${string}`,
    vault.tokenData?.address as string
  )
  const tokenBalance = isFetchedTokenBalance && !!tokenWithAmount ? tokenWithAmount.amount : '0'

  const { data: vaultBalance, isFetched: isFetchedVaultBalance } = useUserVaultShareBalance(
    vault,
    userAddress as `0x${string}`
  )
  const shareBalance = isFetchedVaultBalance && !!vaultBalance ? vaultBalance.amount : '0'

  const { data: tokenWithPrice } = useVaultTokenPrice(vault)
  const { data: shareWithPrice } = useVaultSharePrice(vault)

  const formMethods = useForm<TxFormValues>({
    mode: 'onChange',
    defaultValues: { shareAmount: '', tokenAmount: '' }
  })

  const setFormShareAmount = useSetAtom(withdrawFormShareAmountAtom)
  const setFormTokenAmount = useSetAtom(withdrawFormTokenAmountAtom)

  const handleTokenAmountChange = (tokenAmount: string) => {
    if (
      !!vaultExchangeRate &&
      vault.decimals !== undefined &&
      isValidFormInput(tokenAmount, vault.decimals)
    ) {
      setFormTokenAmount(tokenAmount)

      const tokens = utils.parseUnits(tokenAmount, vault.decimals)
      const shares = getSharesFromAssets(tokens, vaultExchangeRate, vault.decimals)
      const formattedShares = utils.formatUnits(shares, vault.decimals)

      setFormShareAmount(formattedShares)

      formMethods.setValue(
        'shareAmount',
        formattedShares.endsWith('.0') ? formattedShares.slice(0, -2) : formattedShares,
        {
          shouldValidate: true
        }
      )
    }
  }

  const handleShareAmountChange = (shareAmount: string) => {
    if (
      !!vaultExchangeRate &&
      vault.decimals !== undefined &&
      isValidFormInput(shareAmount, vault.decimals)
    ) {
      setFormShareAmount(shareAmount)

      const shares = utils.parseUnits(shareAmount, vault.decimals)
      const tokens = getAssetsFromShares(shares, vaultExchangeRate, vault.decimals)
      const formattedTokens = utils.formatUnits(tokens, vault.decimals)

      setFormTokenAmount(formattedTokens)

      formMethods.setValue(
        'tokenAmount',
        formattedTokens.endsWith('.0') ? formattedTokens.slice(0, -2) : formattedTokens,
        {
          shouldValidate: true
        }
      )
    }
  }

  const shareInputData = useMemo(() => {
    if (vault.shareData) {
      return {
        ...vault.shareData,
        amount: shareBalance,
        price: shareWithPrice?.price ?? 0,
        logoURI: vault.logoURI
      }
    }
  }, [vault, shareBalance, shareWithPrice])

  const tokenInputData = useMemo(() => {
    if (vault.tokenData) {
      return {
        ...vault.tokenData,
        amount: tokenBalance,
        price: tokenWithPrice?.price ?? 0,
        logoURI: vault.tokenLogoURI
      }
    }
  }, [vault, tokenBalance, tokenWithPrice])

  return (
    <div className='flex flex-col'>
      {!!shareInputData && !!tokenInputData && vault.decimals !== undefined && (
        <>
          <FormProvider {...formMethods}>
            <TxFormInput
              token={shareInputData}
              formKey='shareAmount'
              validate={{
                isNotGreaterThanShareBalance: (v) =>
                  parseFloat(utils.formatUnits(shareBalance, vault.decimals)) >= parseFloat(v) ||
                  !isFetchedVaultBalance ||
                  !vaultBalance ||
                  `Not enough ${vault.shareData?.symbol} in wallet`
              }}
              onChange={handleShareAmountChange}
              showMaxButton={true}
              className='mb-0.5'
            />
            <TxFormInput
              token={tokenInputData}
              formKey='tokenAmount'
              onChange={handleTokenAmountChange}
              className='my-0.5 rounded-b-none'
            />
          </FormProvider>
          <TxFormInfo vault={vault} />
        </>
      )}
    </div>
  )
}
