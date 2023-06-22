import Image from 'next/image'
import { BuilderCard, builderCardInfo } from './Builders/BuilderCard'
import { EcosystemCard, ecosystemCardInfo } from './Ecosystem/EcosystemCard'

type FancyCardId = keyof typeof ecosystemCardInfo | keyof typeof builderCardInfo

interface FancyCardSectionProps {
  iconSrc: `${string}.svg`
  title: string
  cards: FancyCardId[]
}

// TODO: this isn't perfect. Looks off in large screens and doesn't have consistent height.
export const FancyCardSection = (props: FancyCardSectionProps) => {
  const { iconSrc, title, cards } = props

  return (
    <div className='flex flex-col gap-4 items-center'>
      <div className='flex gap-3 items-center text-pt-purple-50'>
        <Image
          src={iconSrc}
          width={32}
          height={32}
          alt={title}
          className='h-6 w-auto text-pt-purple-300 md:h-8'
        />
        <span className='text-sm md:text-xl'>{title}</span>
      </div>
      <div className='w-full flex flex-wrap gap-4 justify-center'>
        {cards.map((cardType) => {
          if (cardType in ecosystemCardInfo) {
            return (
              <EcosystemCard
                key={`${cardType}-card`}
                type={cardType as keyof typeof ecosystemCardInfo}
                className='w-[45%] min-w-[21rem] max-w-xl md:w-[30%] shrink'
              />
            )
          } else if (cardType in builderCardInfo) {
            return (
              <BuilderCard
                key={`${cardType}-card`}
                type={cardType as keyof typeof builderCardInfo}
                className='w-[45%] min-w-[21rem] max-w-xl md:w-[30%]'
              />
            )
          }
        })}
      </div>
    </div>
  )
}
