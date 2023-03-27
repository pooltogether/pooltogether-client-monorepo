import classNames from 'classnames'
import { Vault } from 'pt-client-js'
import { TokenIcon } from '../Icons/TokenIcon'

export interface VaultBadgeProps {
  vault: Vault
  className?: string
  iconClassName?: string
  nameClassName?: string
  symbolClassName?: string
}

export const VaultBadge = (props: VaultBadgeProps) => {
  const { vault, className, iconClassName, nameClassName, symbolClassName } = props

  return (
    <div className={classNames('flex gap-2', className)}>
      <TokenIcon
        token={{
          chainId: vault.chainId,
          address: vault.address,
          name: vault.name,
          logoURI: vault.logoURI
        }}
        className={classNames('my-auto', iconClassName)}
      />
      <div className='flex flex-col text-left'>
        <span className={classNames(nameClassName)}>{vault.name}</span>
        <span className={classNames('text-sm text-pt-purple-100', symbolClassName)}>
          {vault.shareData?.symbol}
        </span>
      </div>
    </div>
  )
}
