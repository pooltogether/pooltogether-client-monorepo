import { utils } from 'ethers'
import { Vault } from 'pt-client-js'
import { useVaultExchangeRate } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { formatBigNumberForDisplay, getSharesFromAssets } from 'pt-utilities'

export interface TxFormInfoProps {
  vault: Vault
}

export const TxFormInfo = (props: TxFormInfoProps) => {
  const { vault } = props

  const { data: vaultExchangeRate } = useVaultExchangeRate(vault)

  return (
    <div className='flex items-center dark:bg-pt-transparent px-4 py-2 rounded-b-lg'>
      <span className='dark:text-pt-purple-200'>
        1 {vault.tokenData?.symbol ?? <Spinner />} ={' '}
        {!!vaultExchangeRate && vault.decimals !== undefined ? (
          formatBigNumberForDisplay(
            getSharesFromAssets(
              utils.parseUnits('1', vault.decimals),
              vaultExchangeRate,
              vault.decimals
            ),
            vault.decimals,
            { hideZeroes: true }
          )
        ) : (
          <Spinner />
        )}{' '}
        {vault.shareData?.symbol ?? <Spinner />}
      </span>
    </div>
  )
}
