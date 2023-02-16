import { Contract, providers, Signer } from 'ethers'

/**
 * This class provides read and write functions to interact with a prize pool
 */
export class PrizePool {
  // readonly prizePoolContract: Contract
  readonly id: string

  /**
   * Creates an instance of a PrizePool with a given signer or provider
   * @param chainId the prize pool's chain ID
   * @param address the prize pool's address
   * @param signerOrProvider a Signer or Provider for the network the prize pool is deployed on
   */
  constructor(
    public chainId: number,
    public address: string,
    public signerOrProvider: Signer | providers.Provider
  ) {
    // this.prizePoolContract = new Contract(this.address, prizePoolAbi, this.signerOrProvider)
    this.id = `${this.address}-${this.chainId}`
  }

  /* ============================== Read Functions ============================== */

  // TODO

  /* ============================== Write Functions ============================== */

  // TODO
}
