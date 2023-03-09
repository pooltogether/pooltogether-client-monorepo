import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { BigNumber, utils } from 'ethers'
import { VaultInfo } from 'pt-types'
import { formatBigNumberForDisplay, getBlockExplorerUrl, getSharesFromAssets } from 'pt-utilities'

interface TxFormInfoProps {
  vaultInfo: VaultInfo
  vaultExchangeRate: BigNumber
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
      <a
        href={getBlockExplorerUrl(vaultInfo.chainId, tokenAddress, 'token')}
        target='_blank'
        rel='noreferrer'
        className='inline-flex items-center gap-1 text-xs dark:text-pt-teal'
      >
        <span>View {tokenDisplayName}</span>
        <ArrowTopRightOnSquareIcon className='h-4 w-4 dark:text-inherit' />
      </a>
    </div>
  )
}
