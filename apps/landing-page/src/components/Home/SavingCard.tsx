import classNames from 'classnames'

type SavingCardType = 'deposit' | 'winPrizes' | 'noLoss'

const savingCardInfo: Record<
  SavingCardType,
  { src: `/${string}.svg`; title: string; description: string }
> = {
  deposit: {
    src: '/graphics/DepositGraphic.svg',
    title: 'Deposit',
    description: 'Deposit for a chance to win'
  },
  winPrizes: {
    src: '/graphics/WinPrizesGraphic.svg',
    title: 'Win Prizes',
    description: 'Yield from deposits fund prizes'
  },
  noLoss: {
    src: '/graphics/NoLossGraphic.svg',
    title: 'No Loss',
    description: 'No fees, withdraw any time'
  }
}

interface SavingCardProps {
  type: SavingCardType
  className?: string
}

export const SavingCard = (props: SavingCardProps) => {
  const { type, className } = props

  const card = savingCardInfo[type]

  return (
    <div className={classNames('flex flex-col gap-6', className)}>
      <div className='w-full bg-pt-bg-purple-darker rounded-3xl'>
        <object type='image/svg+xml' data={card.src} className='w-full' />
      </div>
      <div className='flex flex-col gap-2 text-center'>
        <span className='font-averta font-bold text-clamp-3xl text-pt-purple-100'>
          {card.title}
        </span>
        <span className='text-clamp-base text-gray-100'>{card.description}</span>
      </div>
    </div>
  )
}
