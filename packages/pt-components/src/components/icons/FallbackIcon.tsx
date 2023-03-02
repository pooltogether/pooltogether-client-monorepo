import classNames from 'classnames'

export interface FallbackIconProps {
  symbol: string
  className?: string
}

export const FallbackIcon = (props: FallbackIconProps) => {
  const { symbol, className } = props

  return (
    <div
      className={classNames(
        'dark:text-pt-purple-800 rounded-full dark:bg-pt-purple-100 flex items-center justify-center text-xs h-6 w-6',
        className
      )}
    >
      {!!symbol ? symbol.slice(0, 2).toUpperCase() : '?'}
    </div>
  )
}
