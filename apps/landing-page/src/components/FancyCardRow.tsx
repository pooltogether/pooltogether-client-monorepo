import { BuilderCard, builderCardInfo } from './Builders/BuilderCard'
import { EcosystemCard, ecosystemCardInfo } from './Ecosystem/EcosystemCard'

type FancyCardId = keyof typeof ecosystemCardInfo | keyof typeof builderCardInfo

interface FancyCardRowProps {
  iconSrc: `${string}.svg`
  title: string
  cards: FancyCardId[]
}

// TODO: this isn't perfect. Looks off in large screens and doesn't have consistent height.
export const FancyCardRow = (props: FancyCardRowProps) => {
  const { iconSrc, title, cards } = props

  return (
    <div className='flex flex-col gap-4 items-center'>
      <div className='flex gap-3 items-center text-pt-purple-50'>
        <img src={iconSrc} className='h-9 w-auto text-pt-purple-300' />
        <span className='text-clamp-xl'>{title}</span>
      </div>
      <div className='w-full flex flex-wrap gap-4 justify-center'>
        {cards.map((cardType) => {
          if (cardType in ecosystemCardInfo) {
            return (
              <EcosystemCard
                key={`${cardType}-card`}
                type={cardType as keyof typeof ecosystemCardInfo}
                className='w-[30%] max-w-xl'
              />
            )
          } else if (cardType in builderCardInfo) {
            return (
              <BuilderCard
                key={`${cardType}-card`}
                type={cardType as keyof typeof builderCardInfo}
                className='w-[30%] max-w-xl'
              />
            )
          }
        })}
      </div>
    </div>
  )
}
