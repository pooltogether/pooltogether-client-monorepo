import classNames from 'classnames'

export interface FallbackTokenLogoProps {
  symbol: string
  className?: string
}

export const FallbackTokenLogo = (props: FallbackTokenLogoProps) => {
  return (
    <div
      className={classNames(
        'dark:text-pt-purple-800 rounded-full dark:bg-pt-purple-100 flex items-center justify-center text-xs h-6 w-6',
        props.className
      )}
    >
      {props.symbol.slice(0, 2).toUpperCase()}
    </div>
  )
}
