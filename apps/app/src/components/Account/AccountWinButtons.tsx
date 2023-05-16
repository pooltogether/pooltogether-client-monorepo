import { SubgraphPrizePoolAccount } from 'pt-types'
import { Button, ExternalLink } from 'pt-ui'
import { getBlockExplorerName, getBlockExplorerUrl } from 'pt-utilities'

interface AccountWinButtonsProps {
  win: SubgraphPrizePoolAccount['prizesReceived'][0] & { chainId: number }
}

export const AccountWinButtons = (props: AccountWinButtonsProps) => {
  const { win } = props

  return (
    <div className='flex justify-end gap-2'>
      {/* TODO: current subgraph doesn't have tx hashes, cannot implement this button yet */}
      {/* TODO: this doesn't work (the outsides of the button are unclickable) */}
      {/* <Button color='transparent'>
        <ExternalLink
          href={getBlockExplorerUrl(win.chainId, win.txHash, 'tx')}
          text={`View on ${getBlockExplorerName(win.chainId)}`}
          size='sm'
          className='text-pt-purple-100'
        />
      </Button> */}
    </div>
  )
}
