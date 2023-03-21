import classNames from 'classnames'
import { VaultInfo } from 'pt-types'
import { TokenIcon } from '../Icons/TokenIcon'

export interface VaultBadgeProps {
  vaultInfo: VaultInfo
  className?: string
  iconClassName?: string
  nameClassName?: string
  symbolClassName?: string
}

export const VaultBadge = (props: VaultBadgeProps) => {
  const { vaultInfo, className, iconClassName, nameClassName, symbolClassName } = props

  return (
    <div className={classNames('flex gap-2', className)}>
      <TokenIcon
        token={{
          chainId: vaultInfo.chainId,
          address: vaultInfo.address,
          name: vaultInfo.name,
          logoURI: vaultInfo.logoURI ?? vaultInfo.extensions?.underlyingAsset?.logoURI
        }}
        className={classNames('my-auto', iconClassName)}
      />
      <div className='flex flex-col text-left'>
        <span className={classNames(nameClassName)}>{vaultInfo.name}</span>
        <span className={classNames('text-sm text-pt-purple-100', symbolClassName)}>
          {vaultInfo.symbol}
        </span>
      </div>
    </div>
  )
}
