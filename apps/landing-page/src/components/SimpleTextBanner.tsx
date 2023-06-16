import classNames from 'classnames'
import { ReactNode } from 'react'

interface SimpleTextBannerProps {
  title: ReactNode
  description?: ReactNode
  className?: string
  titleClassName?: string
  descriptionClassName?: string
}

export const SimpleTextBanner = (props: SimpleTextBannerProps) => {
  const { title, description, className, titleClassName, descriptionClassName } = props

  return (
    <div
      className={classNames(
        'flex flex-col items-center text-center px-4 text-pt-purple-50 md:px-0',
        className
      )}
    >
      <span
        className={classNames(
          'mb-1 font-averta font-bold text-clamp-3xl leading-normal md:text-clamp-4xl',
          titleClassName
        )}
      >
        <>{title}</>
      </span>
      <span className={classNames('text-clamp-base', descriptionClassName)}>
        <>{description}</>
      </span>
    </div>
  )
}
