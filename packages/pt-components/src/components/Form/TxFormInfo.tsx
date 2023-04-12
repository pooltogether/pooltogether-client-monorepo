import { utils } from 'ethers'
import { Vault } from 'pt-client-js'
import { useVaultExchangeRate } from 'pt-hyperstructure-hooks'
import { ExternalLink, Spinner } from 'pt-ui'
import { formatBigNumberForDisplay, getBlockExplorerUrl, getSharesFromAssets } from 'pt-utilities'

export interface TxFormInfoProps {
  vault: Vault
  linkType: 'share' | 'token'
}

// TODO: add tooltip next to conversion rate
export const TxFormInfo = (props: TxFormInfoProps) => {
  const { vault, linkType } = props

  const { data: vaultExchangeRate } = useVaultExchangeRate(vault)

  const tokenAddress = linkType === 'share' ? vault.address : vault.tokenData?.address
  const tokenDisplayName = linkType === 'share' ? 'Prize Asset' : 'Token'

  return (
    <div className='flex items-center justify-between gap-4 dark:bg-pt-transparent px-4 py-2 rounded-b-lg'>
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
      {!!tokenAddress ? (
        <ExternalLink
          href={getBlockExplorerUrl(vault.chainId, tokenAddress, 'token')}
          text={`View ${tokenDisplayName}`}
          size='sm'
          className='text-pt-teal'
        />
      ) : (
        <Spinner />
      )}
    </div>
  )
}
