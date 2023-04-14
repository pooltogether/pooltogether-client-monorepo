import { PrizePool } from 'pt-client-js'
import { TokenWithAmount } from 'pt-types'

// TODO: send this to types package
export interface PrizePoolDraw {
  id: number
  prizes: { winner: `0x${string}`; token: TokenWithAmount }[]
}

// TODO: send this to `pt-hyperstructure-hooks` package once done
/**
 * Returns a prize pool's draw history
 * @param prizePool instance of `PrizePool`
 * @returns
 */
export const usePrizePoolDraws = (prizePool: PrizePool) => {
  // TODO: useQuery setup

  const mockData: PrizePoolDraw[] = Array.from(Array(21).keys())
    .slice(1)
    .reverse()
    .map((drawId) => {
      return {
        id: drawId,
        prizePool,
        prizes: [
          {
            winner: '0x123',
            token: {
              chainId: 5,
              address: '0xc26EF73D0cdF27D5F184DF3e05ac6e2f490ccEDf',
              symbol: 'POOL',
              name: 'PoolTogether',
              decimals: 18,
              amount: '42000000000000000000'
            }
          },
          {
            winner: '0x456',
            token: {
              chainId: 5,
              address: '0xc26EF73D0cdF27D5F184DF3e05ac6e2f490ccEDf',
              symbol: 'POOL',
              name: 'PoolTogether',
              decimals: 18,
              amount: '42000000000000000000'
            }
          },
          {
            winner: '0x789',
            token: {
              chainId: 5,
              address: '0xc26EF73D0cdF27D5F184DF3e05ac6e2f490ccEDf',
              symbol: 'POOL',
              name: 'PoolTogether',
              decimals: 18,
              amount: '42000000000000000000'
            }
          }
        ]
      }
    })

  // return { data: mockData, isFetched: true }
  return { data: [], isFetched: true }
}
