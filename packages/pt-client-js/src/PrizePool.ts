import { BigNumber, Contract, Overrides, providers, Signer } from 'ethers'
import { PrizeInfo, TokenWithSupply } from 'pt-types'
import {
  checkPrizePoolWins,
  erc20 as erc20Abi,
  getPrizePoolAllPrizeInfo,
  getPrizePoolContributionAmounts,
  getPrizePoolContributionPercentages,
  getPrizePoolId,
  getProviderFromSigner,
  getTokenInfo,
  prizePool as prizePoolAbi,
  validateAddress,
  validateSignerNetwork,
  validateSignerOrProviderNetwork
} from 'pt-utilities'

/**
 * This class provides read and write functions to interact with a prize pool
 */
export class PrizePool {
  readonly prizePoolContract: Contract
  readonly id: string
  prizeTokenContract: Contract | undefined
  drawPeriodInSeconds: number | undefined
  tierShares: BigNumber | undefined

  /**
   * Creates an instance of a Prize Pool with a given signer or provider
   *
   * NOTE: If initialized without a Signer, write functions will not be available
   * @param chainId the prize pool's chain ID
   * @param address the prize pool's address
   * @param signerOrProvider a Signer or Provider for the network the prize pool is deployed on
   * @param options optional parameters
   */
  constructor(
    public chainId: number,
    public address: string,
    public signerOrProvider: Signer | providers.Provider,
    options?: { prizeTokenAddress?: string; drawPeriodInSeconds?: number; tierShares?: BigNumber }
  ) {
    this.prizePoolContract = new Contract(address, prizePoolAbi, signerOrProvider)
    this.id = getPrizePoolId(chainId, address)

    if (!!options?.prizeTokenAddress) {
      this.prizeTokenContract = new Contract(options.prizeTokenAddress, erc20Abi, signerOrProvider)
    }

    if (!!options?.drawPeriodInSeconds) {
      this.drawPeriodInSeconds = options.drawPeriodInSeconds
    }

    if (!!options?.tierShares) {
      this.tierShares = options.tierShares
    }
  }

  /* ============================== Read Functions ============================== */

  /**
   * Returns basic data about the token awarded by the prize pool
   * @returns
   */
  async getPrizeTokenData(): Promise<TokenWithSupply> {
    const source = 'Prize Pool [getPrizeTokenData]'
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)

    const prizeTokenContract = await this.getPrizeTokenContract()

    const provider = getProviderFromSigner(this.signerOrProvider)
    if (provider === undefined) throw new Error(`${source} | Invalid Provider`)

    const prizeTokenInfo = await getTokenInfo(provider, [prizeTokenContract.address])

    return prizeTokenInfo[prizeTokenContract.address]
  }

  /**
   * Returns the duration of a draw in seconds
   * @returns
   */
  async getDrawPeriodInSeconds(): Promise<number> {
    if (this.drawPeriodInSeconds !== undefined) return this.drawPeriodInSeconds

    const source = 'Prize Pool [getDrawPeriodInSeconds]'
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)

    const drawPeriodInSeconds = parseInt(await this.prizePoolContract.drawPeriodSeconds())
    this.drawPeriodInSeconds = drawPeriodInSeconds

    return drawPeriodInSeconds
  }

  /**
   * Returns the number of shares allocated to each prize tier
   * @returns
   */
  async getTierShares(): Promise<BigNumber> {
    if (this.tierShares !== undefined) return this.tierShares

    const source = 'Prize Pool [getTierShares]'
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)

    const tierShares = BigNumber.from(await this.prizePoolContract.tierShares())
    this.tierShares = tierShares

    return tierShares
  }

  /**
   * Returns the number of prize tiers in the prize pool
   *
   * NOTE: Includes the canary tier
   * @returns
   */
  async getNumberOfTiers(): Promise<number> {
    const source = 'Prize Pool [getNumberOfTiers]'
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)

    const numberOfTiers = parseInt(await this.prizePoolContract.numberOfTiers())

    return numberOfTiers
  }

  /**
   * Returns the prize pool's last awarded draw ID
   * @returns
   */
  async getLastDrawId(): Promise<number> {
    const source = 'Prize Pool [getLastDrawId]'
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)

    const lastDrawId = parseInt(await this.prizePoolContract.getLastCompletedDrawId())

    return lastDrawId
  }

  /**
   * Returns the total token amount contributed by all vaults for the given draw IDs
   * @param startDrawId start draw ID (inclusive)
   * @param endDrawId end draw ID (inclusive)
   * @returns
   */
  async getTotalContributedAmount(startDrawId: number, endDrawId: number): Promise<BigNumber> {
    const source = 'Prize Pool [getTotalContributedAmount]'
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)

    const totalContributedAmount: string = await this.prizePoolContract.getTotalContributedBetween(
      startDrawId,
      endDrawId
    )

    return BigNumber.from(totalContributedAmount)
  }

  /**
   * Returns the token amounts contributed by any vaults for the given draw IDs
   * @param vaultAddresses vault addresses to get contributions from
   * @param startDrawId start draw ID (inclusive)
   * @param endDrawId end draw ID (inclusive)
   * @returns
   */
  async getVaultContributedAmounts(
    vaultAddresses: string[],
    startDrawId: number,
    endDrawId: number
  ): Promise<{ [vaultId: string]: BigNumber }> {
    const source = 'Prize Pool [getVaultContributedAmounts]'
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)

    const provider = getProviderFromSigner(this.signerOrProvider)
    if (provider === undefined) throw new Error(`${source} | Invalid Provider`)

    const contributedAmounts = await getPrizePoolContributionAmounts(
      provider,
      this.address,
      vaultAddresses,
      startDrawId,
      endDrawId
    )

    return contributedAmounts
  }

  /**
   * Returns the percentage of the total prize pool contributions for any vaults for the given draw IDs
   *
   * NOTE: Percentage value from 0 to 1 (eg: 0.25 representing 25%)
   * @param vaultAddresses vault addresses to get contributions from
   * @param startDrawId start draw ID (inclusive)
   * @param endDrawId end draw ID (inclusive)
   * @returns
   */
  async getVaultContributedPercentages(
    vaultAddresses: string[],
    startDrawId: number,
    endDrawId: number
  ): Promise<{ [vaultId: string]: number }> {
    const source = 'Prize Pool [getVaultContributedPercentages]'
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)

    const provider = getProviderFromSigner(this.signerOrProvider)
    if (provider === undefined) throw new Error(`${source} | Invalid Provider`)

    const contributedPercentages = await getPrizePoolContributionPercentages(
      provider,
      this.address,
      vaultAddresses,
      startDrawId,
      endDrawId
    )

    return contributedPercentages
  }

  /**
   * Returns the start timestamp of the last completed draw (in seconds)
   * @returns
   */
  async getLastDrawStartTimestamp(): Promise<number> {
    const source = 'Prize Pool [getLastDrawStartTimestamp]'
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)

    const startTimestamp = parseInt(await this.prizePoolContract.lastCompletedDrawStartedAt())

    return startTimestamp
  }

  /**
   * Returns the start timestamp of the next draw (in seconds)
   * @returns
   */
  async getNextDrawStartTimestamp(): Promise<number> {
    const source = 'Prize Pool [getNextDrawStartTimestamp]'
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)

    const startTimestamp = parseInt(await this.prizePoolContract.nextDrawStartsAt())

    return startTimestamp
  }

  /**
   * Checks if a user has won a specific prize tier while deposited in a given vault
   * @param vaultAddress vault address to check
   * @param userAddress user address to check prizes for
   * @param tier prize tier to check
   * @returns
   */
  async isTierWinner(vaultAddress: string, userAddress: string, tier: number): Promise<boolean> {
    const source = 'Prize Pool [isTierWinner]'
    validateAddress(vaultAddress, source)
    validateAddress(userAddress, source)
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)

    const isWinner: boolean = await this.prizePoolContract.isWinner(vaultAddress, userAddress, tier)

    return isWinner
  }

  /**
   * Checks if a user has won any prizes on the given vaults
   * @param vaultAddresses vault addresses to check
   * @param userAddress user address to check prizes for
   * @returns
   */
  async checkWins(
    vaultAddresses: string[],
    userAddress: string
  ): Promise<{ [vaultId: string]: number[] }> {
    const source = 'Prize Pool [isWinner]'
    validateAddress(userAddress, source)
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)

    const provider = getProviderFromSigner(this.signerOrProvider)
    if (provider === undefined) throw new Error(`${source} | Invalid Provider`)

    const numberOfTiers = await this.getNumberOfTiers()
    const tiers = Array.from(Array(numberOfTiers).keys())

    const wins = await checkPrizePoolWins(
      provider,
      this.address,
      vaultAddresses,
      userAddress,
      tiers
    )

    return wins
  }

  /**
   * Returns the current prize size of a given tier
   * @param tier prize tier
   * @returns
   */
  async getCurrentPrizeSize(tier: number): Promise<BigNumber> {
    const source = 'Prize Pool [getCurrentPrizeSize]'
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)

    const currentPrizeSize: string = await this.prizePoolContract.calculatePrizeSize(tier)

    return BigNumber.from(currentPrizeSize)
  }

  /**
   * Returns the token liquidity of a given tier
   * @param tier prize tier
   * @returns
   */
  async getTierLiquidity(tier: number): Promise<BigNumber> {
    const source = 'Prize Pool [getTierLiquidity]'
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)

    const tierLiquidity: string = await this.prizePoolContract.getTierLiquidity(tier)

    return BigNumber.from(tierLiquidity)
  }

  /**
   * Returns the estimated time to award a given tier (in seconds)
   * @param tier prize tier
   * @returns
   */
  async getEstimatedTierAwardTime(tier: number): Promise<number> {
    const source = 'Prize Pool [getEstimatedTierAwardTime]'
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)

    const estimatedDraws = parseInt(
      await this.prizePoolContract.getTierAccrualDurationInDraws(tier)
    )

    const drawPeriod = await this.getDrawPeriodInSeconds()

    return estimatedDraws * drawPeriod
  }

  /**
   * Returns the estimated number of prizes awarded based on number of tiers active
   * @returns
   */
  async getEstimatedPrizeCount(): Promise<number> {
    const source = 'Prize Pool [getEstimatedPrizeCount]'
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)

    const estimatedPrizeCount = parseInt(await this.prizePoolContract['estimatedPrizeCount()']())

    return estimatedPrizeCount
  }

  /**
   * Returns estimated prize amounts and frequency for all prize tiers
   * @returns
   */
  async getAllPrizeInfo(): Promise<PrizeInfo[]> {
    const source = 'Prize Pool [getAllPrizeInfo]'
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)

    const provider = getProviderFromSigner(this.signerOrProvider)
    if (provider === undefined) throw new Error(`${source} | Invalid Provider`)

    const numberOfTiers = await this.getNumberOfTiers()
    const tiers = Array.from(Array(numberOfTiers).keys())

    const allPrizeInfo = await getPrizePoolAllPrizeInfo(provider, this.address, tiers)

    return allPrizeInfo
  }

  /**
   * Returns given vaults' prize power (percentage of latest contributions)
   * @param vaultAddresses vault addresses to get prize power from
   * @returns
   */
  async getVaultPrizePowers(vaultAddresses: string[]): Promise<{ [vaultId: string]: number }> {
    const lastDrawId = await this.getLastDrawId()

    const prizePowers = await this.getVaultContributedPercentages(
      vaultAddresses,
      lastDrawId,
      lastDrawId + 1
    )

    return prizePowers
  }

  /* ============================== Write Functions ============================== */

  /**
   * Submits a transaction to claim a prize from the prize pool
   * @param userAddress the address that won the prize
   * @param tier the prize tier to claim
   * @param options optional receiver, fees and overrides for this transaction
   * @returns
   */
  async claimPrize(
    userAddress: string,
    tier: number,
    options?: {
      receiver?: string
      fee?: { amount: BigNumber; receiver: string }
      overrides?: Overrides
    }
  ): Promise<providers.TransactionResponse> {
    const source = 'Prize Pool [claimPrize]'

    if ((this.signerOrProvider as Signer)._isSigner) {
      const signer = this.signerOrProvider as Signer
      validateAddress(userAddress, source)
      !!options?.receiver && validateAddress(options.receiver, source)
      !!options?.fee && validateAddress(options.fee.receiver, source)
      await validateSignerNetwork(this.chainId, signer, source)

      if (!!options?.overrides) {
        return this.prizePoolContract.claimPrize(
          userAddress,
          tier,
          options.receiver ?? userAddress,
          options.fee?.amount ?? 0,
          options.fee?.receiver ?? userAddress,
          options.overrides
        )
      } else {
        return this.prizePoolContract.claimPrize(
          userAddress,
          tier,
          options?.receiver ?? userAddress,
          options?.fee?.amount ?? 0,
          options?.fee?.receiver ?? userAddress
        )
      }
    } else {
      throw new Error(`${source} | Invalid Signer`)
    }
  }

  /**
   * Submits a transaction to complete the current draw and start the next draw
   * @param winningRandomNumber randomly generated winning number
   * @param overrides optional overrides for this transaction
   * @returns
   */
  async completeAndStartNextDraw(
    winningRandomNumber: BigNumber,
    overrides?: Overrides
  ): Promise<providers.TransactionResponse> {
    const source = 'Prize Pool [completeAndStartNextDraw]'

    if ((this.signerOrProvider as Signer)._isSigner) {
      const signer = this.signerOrProvider as Signer
      await validateSignerNetwork(this.chainId, signer, source)

      if (!!overrides) {
        return this.prizePoolContract.completeAndStartNextDraw(winningRandomNumber, overrides)
      } else {
        return this.prizePoolContract.completeAndStartNextDraw(winningRandomNumber)
      }
    } else {
      throw new Error(`${source} | Invalid Signer`)
    }
  }

  /* ============================== Other Functions ============================== */

  /**
   * Returns the number of prizes in a given prize tier
   * @param tier prize tier
   * @returns
   */
  getTierPrizeCount(tier: number): number {
    return 4 ** tier
  }

  /* =========================== Contract Initializers =========================== */

  /**
   * Initializes a contract for the token awarded by the prize pool
   * @returns
   */
  async getPrizeTokenContract(): Promise<Contract> {
    if (this.prizeTokenContract !== undefined) return this.prizeTokenContract

    const source = 'Prize Pool [getPrizeTokenContract]'
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)

    const prizeTokenAddress: string = await this.prizePoolContract.prizeToken()

    const prizeTokenContract = new Contract(prizeTokenAddress, erc20Abi, this.signerOrProvider)
    this.prizeTokenContract = prizeTokenContract

    return this.prizeTokenContract
  }
}
