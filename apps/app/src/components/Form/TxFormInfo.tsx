import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { BigNumber } from 'ethers'
import { VaultInfo } from 'pt-types'
import { divideBigNumbers, formatNumberForDisplay, getBlockExplorerUrl } from 'pt-utilities'

interface TxFormInfoProps {
  vaultInfo: VaultInfo
  vaultMultiplier: BigNumber
  linkType: 'share' | 'token'
}

// TODO: add tooltip next to conversion rate
export const TxFormInfo = (props: TxFormInfoProps) => {
  const { vaultInfo, vaultMultiplier, linkType } = props

  const tokenAddress =
    linkType === 'share' ? vaultInfo.address : vaultInfo.extensions.underlyingAsset.address
  const tokenDisplayName = linkType === 'share' ? 'Prize Asset' : 'Token'

  return (
    <div className='flex items-center justify-between gap-4 dark:bg-pt-transparent px-4 py-2 rounded-b-lg'>
      <span className='dark:text-pt-purple-200'>
        1 {vaultInfo.extensions.underlyingAsset.symbol} ={' '}
        {!!vaultMultiplier
          ? formatNumberForDisplay(
              divideBigNumbers(BigNumber.from(1000), vaultMultiplier).toNumber() / 1000,
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
