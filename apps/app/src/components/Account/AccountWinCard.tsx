import { PrizePool } from 'pt-client-js'
import { NetworkIcon } from 'pt-components'
import { SubgraphPrizePoolAccount } from 'pt-types'
import { ExternalLink } from 'pt-ui'
import { getBlockExplorerName, getBlockExplorerUrl } from 'pt-utilities'
import { AccountWinAmount } from './AccountWinAmount'

interface AccountWinCardProps {
  win: SubgraphPrizePoolAccount['prizesReceived'][0] & { chainId: number }
  prizePool: PrizePool
}

export const AccountWinCard = (props: AccountWinCardProps) => {
  const { win, prizePool } = props

  return (
    <div className='flex items-center gap-3 bg-pt-transparent rounded-lg p-3'>
      <NetworkIcon chainId={win.chainId} className='h-6 w-6' />
      <span className='text-sm'>Draw #{win.draw.id}</span>
      {/* TODO: add txHash once subgraph has it */}
      <ExternalLink
        // href={getBlockExplorerUrl(win.chainId, win.txHash, 'tx')}
        href={getBlockExplorerUrl(win.chainId, '', 'tx')}
        text={`View on ${getBlockExplorerName(win.chainId)}`}
        size='xs'
        className='grow text-pt-purple-200'
      />
      <AccountWinAmount prizePool={prizePool} amount={BigInt(win.payout)} />
    </div>
  )
}