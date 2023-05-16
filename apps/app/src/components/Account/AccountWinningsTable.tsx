import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import { NetworkBadge, TokenValueAndAmount } from 'pt-components'
import { usePrizePools } from 'pt-hyperstructure-hooks'
import { Table, TableProps } from 'pt-ui'
import { useAllUserPrizePoolWins } from '@hooks/useAllUserPrizePoolWins'
import { formatPrizePools } from '../../utils'
import { AccountWinButtons } from './AccountWinButtons'

interface AccountWinningsTableProps extends Omit<TableProps, 'data' | 'keyPrefix'> {}

export const AccountWinningsTable = (props: AccountWinningsTableProps) => {
  const { ...rest } = props

  const router = useRouter()

  const { address: userAddress } = useAccount()

  const formattedPrizePoolInfo = formatPrizePools()
  const prizePools = usePrizePools(formattedPrizePoolInfo)
  const prizePoolsArray = Object.values(prizePools)

  const { data: wins, isFetched: isFetchedWins } = useAllUserPrizePoolWins(
    prizePoolsArray,
    userAddress
  )

  const tableData: TableProps['data'] = {
    headers: {
      draw: { content: 'Draw' },
      prizePool: { content: 'Prize Pool', position: 'center' },
      winnings: { content: 'Winnings', position: 'center' },
      info: { content: 'More Info', position: 'center' }
    },
    rows:
      isFetchedWins && !!wins
        ? wins
            .map((win) => {
              const cells: TableProps['data']['rows'][0]['cells'] = {
                draw: { content: `Draw #${win.drawId}` },
                prizePool: {
                  content: (
                    <NetworkBadge
                      chainId={win.prizePool.chainId}
                      appendText='Prize Pool'
                      onClick={() => router.push(`/prizes?network=${win.prizePool.chainId}`)}
                    />
                  ),
                  position: 'center'
                },
                winnings: {
                  content: <TokenValueAndAmount token={win.token} />,
                  position: 'center'
                },
                info: { content: <AccountWinButtons win={win} />, position: 'center' }
              }
              return { cells }
            })
            .filter((row) => !!row)
        : []
  }

  return <Table data={tableData} keyPrefix='accountWinningsTable' {...rest} />
}
