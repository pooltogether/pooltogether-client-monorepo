import classNames from 'classnames'
import { getNiceNetworkNameByChainId } from 'pt-utilities'
import { NetworkIcon } from '../Icons/NetworkIcon'

export interface NetworkBadgeProps {
  chainId: number
  appendText?: string
  hideIcon?: boolean
  hideBg?: boolean
  className?: string
  iconClassName?: string
  textClassName?: string
  onClick?: () => void
}

export const NetworkBadge = (props: NetworkBadgeProps) => {
  const {
    chainId,
    appendText,
    hideIcon,
    hideBg,
    className,
    iconClassName,
    textClassName,
    onClick
  } = props

  const networkName = getNiceNetworkNameByChainId(chainId)

  return (
    <span
      className={classNames(
        'inline-flex items-center gap-1 px-3 py-2 text-sm rounded-lg',
        {
          'bg-pt-transparent border border-pt-transparent hover:bg-pt-purple-50/20': !hideBg,
          'cursor-pointer': !!onClick
        },
        className
      )}
      onClick={onClick}
    >
      {!hideIcon && (
        <NetworkIcon chainId={chainId} className={classNames('h-4 w-4', iconClassName)} />
      )}
      <span className={classNames(textClassName)}>
        {networkName}
        {!!appendText ? ` ${appendText}` : ''}
      </span>
    </span>
  )
}
