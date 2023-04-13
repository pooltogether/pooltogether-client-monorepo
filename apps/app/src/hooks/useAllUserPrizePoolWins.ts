import { PrizePool } from 'pt-client-js'
import { TokenWithAmount } from 'pt-types'

// TODO: send this to types package
export interface PrizePoolWin {
  prizePool: PrizePool
  winner: `0x${string}`
  drawId: number
  token: TokenWithAmount
  txHash: string
}

// TODO: send this to `pt-hyperstructure-hooks` package once done
/**
 * Returns a user's past wins on any given prize pools
 * @param prizePools instances of `PrizePool`
 * @param userAddress a user's address to check wins for
 * @returns
 */
export const useAllUserPrizePoolWins = (prizePools: PrizePool[], userAddress: string) => {
  // TODO: useQueries setup, with method from PrizePool class

  const mockData: PrizePoolWin[] = [
    {
      prizePool: prizePools[0],
      winner: userAddress as `0x${string}`,
      drawId: 42,
      token: {
        chainId: 5,
        address: '0xc26EF73D0cdF27D5F184DF3e05ac6e2f490ccEDf',
        symbol: 'POOL',
        name: 'PoolTogether',
        decimals: 18,
        amount: '42000000000000000000'
      },
      txHash: ''
    }
  ]

  // return { data: mockData, isFetched: true }
  return { data: [], isFetched: true }
}
