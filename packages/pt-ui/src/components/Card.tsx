import classNames from 'classnames'
import { Card as FlowbiteCard, CardProps as FlowbiteCardProps } from 'flowbite-react'

export interface CardProps extends FlowbiteCardProps {
  wrapperClassName?: string
}

export const Card = (props: CardProps) => {
  const { wrapperClassName, className, ...rest } = props

  return (
    // TODO: hover bg color not updating
    <FlowbiteCard
      theme={{
        root: {
          base: 'flex bg-pt-transparent rounded-lg shadow-md',
          children: classNames('flex h-full flex-col justify-center p-8', className),
          href: 'hover:bg-pt-purple-50/20'
        }
      }}
      className={classNames(wrapperClassName)}
      {...rest}
    />
  )
}
