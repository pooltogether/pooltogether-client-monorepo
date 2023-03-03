import classNames from 'classnames'

export interface SpinnerProps {
  className?: string
}

export const Spinner = (props: SpinnerProps) => {
  const { className } = props

  return (
    <div
      className={classNames(
        'w-5 h-5 inline-block after:block after:w-full after:h-full after:rounded-full',
        'after:border-2 after:border-solid after:border-y-pt-purple-50 after:border-x-transparent',
        'after:animate-spin',
        className
      )}
    />
  )
}
