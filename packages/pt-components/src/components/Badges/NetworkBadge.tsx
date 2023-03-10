import classNames from 'classnames'
import { getNiceNetworkNameByChainId } from 'pt-utilities'
import { NetworkIcon } from '../Icons/NetworkIcon'

export interface NetworkBadgeProps {
  chainId: number
  appendText?: string
  className?: string
  iconClassName?: string
  textClassName?: string
}

export const NetworkBadge = (props: NetworkBadgeProps) => {
  const { chainId, appendText, className, iconClassName, textClassName } = props

  const networkName = getNiceNetworkNameByChainId(chainId)

  return (
    <span
      className={classNames(
        'inline-flex items-center justify-center gap-2 text-sm bg-pt-transparent px-3 py-1 rounded-lg',
        className
      )}
    >
      <NetworkIcon chainId={chainId} className={classNames('h-4 w-4', iconClassName)} />
      <span className={classNames(textClassName)}>
        {networkName}
        {!!appendText ? ` ${appendText}` : ''}
      </span>
    </span>
  )
}
