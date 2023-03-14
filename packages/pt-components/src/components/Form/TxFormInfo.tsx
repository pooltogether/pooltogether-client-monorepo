import { BigNumber, utils } from 'ethers'
import { VaultInfo } from 'pt-types'
import { ExternalLink } from 'pt-ui'
import { formatBigNumberForDisplay, getBlockExplorerUrl, getSharesFromAssets } from 'pt-utilities'

export interface TxFormInfoProps {
  vaultInfo: VaultInfo
  vaultExchangeRate: BigNumber | undefined
  linkType: 'share' | 'token'
}

// TODO: add tooltip next to conversion rate
export const TxFormInfo = (props: TxFormInfoProps) => {
  const { vaultInfo, vaultExchangeRate, linkType } = props

  const tokenAddress =
    linkType === 'share' ? vaultInfo.address : vaultInfo.extensions.underlyingAsset.address
  const tokenDisplayName = linkType === 'share' ? 'Prize Asset' : 'Token'

  return (
    <div className='flex items-center justify-between gap-4 dark:bg-pt-transparent px-4 py-2 rounded-b-lg'>
      <span className='dark:text-pt-purple-200'>
        1 {vaultInfo.extensions.underlyingAsset.symbol} ={' '}
        {!!vaultExchangeRate
          ? formatBigNumberForDisplay(
              getSharesFromAssets(
                utils.parseUnits('1', vaultInfo.decimals),
                vaultExchangeRate,
                vaultInfo.decimals
              ),
              vaultInfo.decimals.toString(),
              {
                hideZeroes: true
              }
            )
          : '?'}{' '}
        {vaultInfo.symbol}
      </span>
      <ExternalLink
        href={getBlockExplorerUrl(vaultInfo.chainId, tokenAddress, 'token')}
        text={`View ${tokenDisplayName}`}
        className='text-pt-teal'
      />
    </div>
  )
}
