import classNames from 'classnames'
import { VaultInfo } from 'pt-types'

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
      <img
        src={vaultInfo.logoURI}
        alt={`${vaultInfo.name} Logo`}
        className={classNames('h-6 w-6 my-auto', iconClassName)}
      />
      <div className='flex flex-col text-left'>
        <span className={classNames(nameClassName)}>{vaultInfo.name}</span>
        <span className={classNames('text-sm dark:text-gray-400', symbolClassName)}>
          {vaultInfo.symbol}
        </span>
      </div>
    </div>
  )
}
