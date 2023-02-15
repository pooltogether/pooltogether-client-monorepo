import { Contract, providers, Signer } from 'ethers'
import { Result } from 'ethers/lib/utils'
import { erc20 as erc20Abi, erc4626 as erc4626Abi } from 'pt-utilities'

/**
 * Vault
 * This class provides read-only functions to fetch on-chain data from a vault.
 */
export class Vault {
  readonly vaultContract: Contract
  readonly id: string
  tokenContract: Contract | undefined

  /**
   * Creates an instance of a Vault with a given signer or provider to query on-chain data with.
   * @param chainId the vault's chain ID
   * @param address the vault's address
   * @param signerOrProvider a Signer or Provider for the network the vault is deployed on
   */
  constructor(
    public chainId: number,
    public address: string,
    public signerOrProvider: Signer | providers.Provider
  ) {
    this.vaultContract = new Contract(this.address, erc4626Abi, this.signerOrProvider)
    this.id = `${this.address}-${this.chainId}`
    this.tokenContract = undefined
  }

  /////////////////////////////////// Read Functions ///////////////////////////////////

  // TODO

  //////////////////////////////// Contract Initializers ////////////////////////////////

  /**
   * Initializes a contract for the vault's underlying asset.
   * @returns
   */
  async getTokenContract(): Promise<Contract> {
    if (this.tokenContract !== undefined) return this.tokenContract
    const tokenAddress: string = ((await this.vaultContract.functions.asset()) as Result)[0]
    const tokenContract = new Contract(tokenAddress, erc20Abi, this.signerOrProvider)
    this.tokenContract = tokenContract
    return tokenContract
  }
}
