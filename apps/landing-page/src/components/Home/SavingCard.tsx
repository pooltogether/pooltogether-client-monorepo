import classNames from 'classnames'

const savingCardInfo = {
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
} satisfies { [id: string]: { src: `/${string}.svg`; title: string; description: string } }

interface SavingCardProps {
  type: keyof typeof savingCardInfo
  className?: string
}

export const SavingCard = (props: SavingCardProps) => {
  const { type, className } = props

  const card = savingCardInfo[type]

  return (
    <div className={classNames('flex flex-col gap-6', className)}>
      <div className='w-full bg-pt-bg-purple-darker rounded-2xl md:rounded-3xl'>
        <object type='image/svg+xml' data={card.src} className='w-full' />
      </div>
      <div className='flex flex-col gap-1 text-center md:gap-2'>
        <span className='font-averta font-bold text-2xl text-pt-purple-100 md:text-[2rem]'>
          {card.title}
        </span>
        <span className='text-base text-gray-100'>{card.description}</span>
      </div>
    </div>
  )
}
