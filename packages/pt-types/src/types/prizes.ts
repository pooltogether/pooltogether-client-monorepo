import { BigNumber } from 'ethers'

export interface PrizeInfo {
  amount: BigNumber
  dailyFrequency: number
}

export interface SubgraphPrizePoolDraw {
  id: string
  prizeClaims: {
    id: string
    winner: { id: string }
    tier: number
    payout: string
    fee: string
    feeRecipient: { id: string }
    timestamp: string
  }[]
}
