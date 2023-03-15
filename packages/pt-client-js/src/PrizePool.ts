import { BigNumber, Contract, providers, Signer } from 'ethers'
import { TokenWithSupply } from 'pt-types'
import {
  erc20 as erc20Abi,
  getProviderFromSigner,
  getTokenInfo,
  erc20 as prizePoolAbi, // TODO: use actual prize pool ABI
  validateAddress,
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

  /**
   * Creates an instance of a Prize Pool with a given signer or provider
   *
   * NOTE: If initialized without a Signer, write functions will not be available
   * @param chainId the prize pool's chain ID
   * @param address the prize pool's address
   * @param signerOrProvider a Signer or Provider for the network the prize pool is deployed on
   * @param prizeTokenAddress optional address of the prize token awarded
   * @param drawPeriodInSeconds optional draw period in seconds
   */
  constructor(
    public chainId: number,
    public address: string,
    public signerOrProvider: Signer | providers.Provider,
    prizeTokenAddress?: string,
    drawPeriodInSeconds?: number
  ) {
    this.prizePoolContract = new Contract(address, prizePoolAbi, signerOrProvider)
    this.id = `${address}-${chainId}`
    if (!!prizeTokenAddress) {
      this.prizeTokenContract = new Contract(prizeTokenAddress, erc20Abi, signerOrProvider)
    }
    if (!!drawPeriodInSeconds) {
      this.drawPeriodInSeconds = drawPeriodInSeconds
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
    if (provider === undefined) throw new Error(`${source} | Invalid Provider'`)
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
   * Returns the number of tiers in the prize pool
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
   * Returns the token amount contributed by any vaults for the given draw IDs
   * @param vaultAddresses vault addresses to get contributions from
   * @param startDrawId start draw ID (inclusive)
   * @param endDrawId end draw ID (inclusive)
   * @returns
   */
  async getVaultContributedAmounts(
    vaultAddresses: string[],
    startDrawId: number,
    endDrawId: number
  ): Promise<BigNumber> {
    // TODO: refactor this function to use a util with multicall to query multiple vaults
    const source = 'Prize Pool [getVaultContributedAmounts]'
    validateAddress(vaultAddresses[0], source)
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)
    const contributedAmount: string = await this.prizePoolContract.getContributedBetween(
      vaultAddresses[0],
      startDrawId,
      endDrawId
    )
    return BigNumber.from(contributedAmount)
  }

  /**
   * Returns the percentage of the total prize pool contributions for any vaults for the given draw IDs
   * @param vaultAddresses vault addresses to get contributions from
   * @param startDrawId start draw ID (inclusive)
   * @param endDrawId end draw ID (inclusive)
   * @returns
   */
  async getVaultContributedPercentages(
    vaultAddresses: string[],
    startDrawId: number,
    endDrawId: number
  ): Promise<number> {
    // TODO: refactor this function to use a util with multicall to query multiple vaults
    const source = 'Prize Pool [getVaultContributedPercentages]'
    validateAddress(vaultAddresses[0], source)
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)
    const contributedPercentage: string = await this.prizePoolContract.getVaultPortion(
      vaultAddresses[0],
      startDrawId,
      endDrawId
    )
    // TODO: properly format the percentage output (0 to 1 with decimals)
    return BigNumber.from(contributedPercentage).toNumber()
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
  async isWinner(
    vaultAddresses: string[],
    userAddress: string
  ): Promise<{ [vaultAddress: string]: number[] }> {
    // TODO: refactor this function to use a util with multicall to query multiple vaults and tiers
    const source = 'Prize Pool [isWinner]'
    validateAddress(vaultAddresses[0], source)
    validateAddress(userAddress, source)
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)
    // const numberOfTiers = await this.getNumberOfTiers()
    // const isWinner: boolean = await this.prizePoolContract.isWinner(vaultAddresses[0], userAddress, 0)
    return {}
  }

  // TODO
  // function calculatePrizeSize(uint8 _tier) external view returns (uint256) {
  //   return _calculatePrizeSize(_tier);
  // }

  // TODO
  // function getTierLiquidity(uint8 _tier) external view returns (uint256) {
  //   if (_tier > numberOfTiers) {
  //       return 0;
  //   } else if (_tier != numberOfTiers) {
  //       return _getLiquidity(_tier, tierShares);
  //   } else {
  //       return _getLiquidity(_tier, canaryShares);
  //   }
  // }

  // TODO
  // function getTotalShares() external view returns (uint256) {
  //   return _getTotalShares(numberOfTiers);
  // }

  /* ============================== Write Functions ============================== */

  // TODO
  // function claimPrize(
  //   address _winner,
  //   uint8 _tier,
  //   address _to,
  //   uint96 _fee,
  //   address _feeRecipient
  // ) external returns (uint256) {
  //   address _vault = msg.sender;
  //   uint256 prizeSize;
  //   if (_isWinner(_vault, _winner, _tier)) {
  //       // transfer prize to user
  //       prizeSize = _calculatePrizeSize(_tier);
  //   } else {
  //       revert("did not win");
  //   }
  //   ClaimRecord memory claimRecord = claimRecords[_winner];
  //   if (claimRecord.drawId != lastCompletedDrawId) {
  //       claimRecord = ClaimRecord({drawId: lastCompletedDrawId, claimedTiers: uint8(0)});
  //   } else if (BitLib.getBit(claimRecord.claimedTiers, _tier)) {
  //       return 0;
  //   }
  //   require(_fee <= prizeSize, "fee too large");
  //   _totalClaimedPrizes += prizeSize;
  //   uint256 payout = prizeSize - _fee;
  //   if (largestTierClaimed < _tier) {
  //       largestTierClaimed = _tier;
  //   }
  //   if (_tier == numberOfTiers) {
  //       canaryClaimCount++;
  //   } else {
  //       claimCount++;
  //   }
  //   claimRecords[_winner] = ClaimRecord({drawId: lastCompletedDrawId, claimedTiers: uint8(BitLib.flipBit(claimRecord.claimedTiers, _tier))});
  //   prizeToken.transfer(_to, payout);
  //   if (_fee > 0) {
  //       prizeToken.transfer(_feeRecipient, _fee);
  //   }
  //   emit ClaimedPrize(lastCompletedDrawId, _vault, _winner, _tier, uint152(payout), _to, _fee, _feeRecipient);
  //   return payout;
  // }

  // TODO
  // function completeAndStartNextDraw(uint256 winningRandomNumber_) external returns (uint32) {
  //   // check winning random number
  //   require(winningRandomNumber_ != 0, "num invalid");
  //   uint64 nextDrawStartsAt_ = _nextDrawStartsAt();
  //   require(block.timestamp >= _nextDrawEndsAt(), "not elapsed");

  //   uint8 numTiers = numberOfTiers;
  //   uint8 nextNumberOfTiers = numberOfTiers;
  //   uint256 reclaimedLiquidity;
  //   // console2.log("completeAndStartNextDraw largestTierClaimed", largestTierClaimed);
  //   // console2.log("completeAndStartNextDraw numTiers", numTiers);
  //   // if the draw was eligible
  //   if (lastCompletedDrawId != 0) {
  //       if (largestTierClaimed < numTiers) {
  //           nextNumberOfTiers = largestTierClaimed > MINIMUM_NUMBER_OF_TIERS ? largestTierClaimed+1 : MINIMUM_NUMBER_OF_TIERS;
  //           reclaimedLiquidity = _reclaimTierLiquidity(numTiers, nextNumberOfTiers);
  //       } else {
  //           // check canary tier and standard tiers
  //           if (canaryClaimCount >= _canaryClaimExpansionThreshold(claimExpansionThreshold, numTiers) &&
  //               claimCount >= _prizeClaimExpansionThreshold(claimExpansionThreshold, numTiers)) {
  //               // expand the number of tiers
  //               // first reset the next tier exchange rate to have accrued nothing (delta is zero)
  //               _tierExchangeRates[numTiers] = prizeTokenPerShare;
  //               // now increase the number of tiers to include te new tier
  //               nextNumberOfTiers = numTiers + 1;
  //           }
  //       }
  //   }
  //   // add back canary liquidity
  //   reclaimedLiquidity += _getLiquidity(numTiers, canaryShares);

  //   _winningRandomNumber = winningRandomNumber_;
  //   numberOfTiers = nextNumberOfTiers;
  //   lastCompletedDrawId += 1;
  //   claimCount = 0;
  //   canaryClaimCount = 0;
  //   largestTierClaimed = 0;
  //   // reset canary tier
  //   _tierExchangeRates[nextNumberOfTiers] = prizeTokenPerShare;
  //   lastCompletedDrawStartedAt_ = nextDrawStartsAt_;

  //   (UD60x18 deltaExchangeRate, uint256 remainder) = _computeDrawDeltaExchangeRate(nextNumberOfTiers);
  //   prizeTokenPerShare = prizeTokenPerShare.add(deltaExchangeRate);

  //   uint256 _additionalReserve = fromUD60x18(deltaExchangeRate.mul(toUD60x18(reserveShares)));
  //   // console2.log("completeAndStartNextDraw _additionalReserve", _additionalReserve);
  //   // console2.log("completeAndStartNextDraw reclaimedLiquidity", reclaimedLiquidity);
  //   // console2.log("completeAndStartNextDraw remainder", remainder);
  //   _reserve += _additionalReserve + reclaimedLiquidity + remainder;

  //   return lastCompletedDrawId;
  // }

  /* ============================== Other Functions ============================== */

  // TODO: hardcode this one? no async: 4 ** tier
  // async getTierPrizeCount(tier: number): Promise<number> {}

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
    return prizeTokenContract
  }
}
