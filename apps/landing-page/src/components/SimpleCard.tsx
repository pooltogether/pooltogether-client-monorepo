import classNames from 'classnames'
import Image from 'next/image'

export interface SimpleCardProps {
  href?: string
  onClick?: () => void
  iconSrc: `${string}.svg`
  title: string
  description: string
  className?: string
}

export const SimpleCard = (props: SimpleCardProps) => {
  const { href, onClick, className, ...rest } = props

  const baseClassName =
    'flex flex-col gap-3 p-8 bg-pt-bg-purple-darker text-pt-purple-100 rounded-2xl hover:shadow-lg md:gap-6 md:p-12'
  const outlineClassName =
    'outline outline-2 -outline-offset-2 outline-transparent hover:outline-pt-purple-100/20'

  if (!!href) {
    return (
      <a
        href={href}
        target='_blank'
        className={classNames(baseClassName, outlineClassName, className)}
      >
        <SimpleCardContent {...rest} />
      </a>
    )
  }

  return (
    <div
      onClick={onClick}
      className={classNames(baseClassName, outlineClassName, 'cursor-pointer', className)}
    >
      <SimpleCardContent {...rest} />
    </div>
  )
}

interface SimpleCardContentProps {
  iconSrc: `${string}.svg`
  title: string
  description: string
}

const SimpleCardContent = (props: SimpleCardContentProps) => {
  const { iconSrc, title, description } = props

  return (
    <>
      <div className='flex gap-2 items-center md:gap-3'>
        <Image
          src={iconSrc}
          width={32}
          height={32}
          alt={title}
          className='w-6 h-auto text-pt-teal-dark md:w-9'
        />
        <span className='text-xl'>{title}</span>
      </div>
      <span className='text-sm md:text-base'>{description}</span>
    </>
  )
}
