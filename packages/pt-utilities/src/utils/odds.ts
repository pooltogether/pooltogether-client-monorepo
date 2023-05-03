import { BigNumber } from 'ethers'
import { divideBigNumbers } from './math'

// TODO: this assumes every prize has the same odds of being won - a better algorithm may be more precise
/**
 * Calculates the odds of a user winning any prize on any one draw for a specific vault
 * @param userShares the amount of shares the user has deposited in the vault
 * @param totalShares the total amount of shares deposited in the vault
 * @param vaultPercentageContribution the percentage of the prize pool contributed by the vault
 * @param numPrizes the number of prizes expected from a draw
 * @returns
 */
export const calculateOdds = (
  userShares: string,
  totalShares: string,
  vaultPercentageContribution: number,
  numPrizes: number
): { percent: number; oneInX: number } => {
  if (
    !userShares ||
    userShares === '0' ||
    !totalShares ||
    totalShares === '0' ||
    !vaultPercentageContribution ||
    !numPrizes
  ) {
    return { percent: 0, oneInX: 0 }
  }

  const userPercentage = divideBigNumbers(BigNumber.from(userShares), BigNumber.from(totalShares))
  const oneWinOdds = userPercentage * vaultPercentageContribution
  const noWinOdds = (1 - oneWinOdds) ** numPrizes

  const anyWinOdds = 1 - noWinOdds

  return { percent: anyWinOdds, oneInX: 1 / anyWinOdds }
}
