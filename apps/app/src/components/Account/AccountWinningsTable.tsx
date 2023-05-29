import { useRouter } from 'next/router'
import { PrizePool } from 'pt-client-js'
import { NetworkBadge } from 'pt-components'
import { SubgraphPrizePoolAccount } from 'pt-types'
import { Table, TableProps } from 'pt-ui'
import { AccountWinAmount } from './AccountWinAmount'
import { AccountWinButtons } from './AccountWinButtons'

interface AccountWinningsTableProps extends Omit<TableProps, 'data' | 'keyPrefix'> {
  wins: (SubgraphPrizePoolAccount['prizesReceived'][0] & { chainId: number })[]
  prizePools: PrizePool[]
}

export const AccountWinningsTable = (props: AccountWinningsTableProps) => {
  const { wins, prizePools, ...rest } = props

  const router = useRouter()

  const tableData: TableProps['data'] = {
    headers: {
      draw: { content: 'Draw' },
      prizePool: { content: 'Prize Pool', position: 'center' },
      winnings: { content: 'Winnings', position: 'center' },
      info: { content: 'More Info', position: 'center' }
    },
    // TODO: sort wins by timestamp
    rows: wins
      .map((win) => {
        const prizePool = prizePools.find((prizePool) => prizePool.chainId === win.chainId)

        if (!!prizePool) {
          const cells: TableProps['data']['rows'][0]['cells'] = {
            draw: { content: `Draw #${win.draw.id}` },
            prizePool: {
              content: (
                <NetworkBadge
                  chainId={win.chainId}
                  appendText='Prize Pool'
                  onClick={() => router.push(`/prizes?network=${win.chainId}`)}
                />
              ),
              position: 'center'
            },
            winnings: {
              content: (
                <AccountWinAmount
                  prizePool={prizePools.find((prizePool) => prizePool.chainId === win.chainId)}
                  amount={BigInt(win.payout)}
                />
              ),
              position: 'center'
            },
            info: { content: <AccountWinButtons win={win} />, position: 'center' }
          }
          return { id: win.id, cells }
        }
      })
      .filter((row) => !!row)
  }

  return <Table data={tableData} keyPrefix='accountWinningsTable' {...rest} />
}
