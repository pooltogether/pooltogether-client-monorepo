import { Button, ExternalLink } from 'pt-ui'
import { getBlockExplorerUrl } from 'pt-utilities'
import { PrizePoolWin } from '@hooks/useAllUserPrizePoolWins'

interface AccountWinButtonsProps {
  win: PrizePoolWin
}

export const AccountWinButtons = (props: AccountWinButtonsProps) => {
  const { win } = props

  return (
    <div className='flex justify-end gap-2'>
      {/* TODO: this doesn't work (the outsides of the button are unclickable) */}
      <Button color='transparent'>
        <ExternalLink
          href={getBlockExplorerUrl(win.prizePool.chainId, win.txHash, 'tx')}
          text='View TX'
          size='sm'
          className='text-pt-purple-100'
        />
      </Button>
    </div>
  )
}
