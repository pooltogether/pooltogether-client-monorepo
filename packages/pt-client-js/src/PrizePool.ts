import { BigNumber, Contract, providers, Signer } from 'ethers'
import { TokenWithSupply } from 'pt-types'
import {
  erc20 as erc20Abi,
  getProviderFromSigner,
  getTokenInfo,
  erc20 as prizePoolAbi, // TODO: use actual prize pool ABI
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
   * Returns the prize pool's last awarded draw ID
   * @returns
   */
  async getLastDrawId(): Promise<number> {
    const source = 'Prize Pool [getLastDrawId]'
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)
    const lastDrawId: string = await this.prizePoolContract.getLastCompletedDrawId()
    return parseInt(lastDrawId)
  }

  // TODO
  // async getTotalContributedBetween(startDrawId: number, endDrawId: number): Promise<BigNumber> {}

  // TODO
  // async getContributedBetween(
  //   vaultAddress: string,
  //   startDrawId: number,
  //   endDrawId: number
  // ): Promise<BigNumber> {}

  // TODO
  // async getTierPrizeCount(tier: number): Promise<number> {}

  // TODO
  // function lastCompletedDrawStartedAt() external view returns (uint64) {
  //   if (lastCompletedDrawId != 0) {
  //       return lastCompletedDrawStartedAt_;
  //   } else {
  //       return 0;
  //   }
  // }

  // TODO
  // function nextDrawStartsAt() external view returns (uint64) {
  //   return _nextDrawStartsAt();
  // }

  // TODO
  // function isWinner(
  //   address _vault,
  //   address _user,
  //   uint8 _tier
  // ) external view returns (bool) {
  //   return _isWinner(_vault, _user, _tier);
  // }

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

  // TODO
  // function estimatedPrizeCount() external view returns (uint32) {
  //   return _estimatedPrizeCount(numberOfTiers);
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
