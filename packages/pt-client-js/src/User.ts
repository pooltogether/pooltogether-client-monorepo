import { BigNumber, Signer } from 'ethers'
import { TokenWithBalance } from 'pt-types'
import { Vault } from './Vault'

/**
 * User
 * This class provides read and write functions to interact with a vault.
 */
export class User extends Vault {
  /**
   * Creates an instance of a User for a specific Vault
   * @param chainId the vault's chain ID
   * @param vaultAddress the vault's address
   * @param signer a Signer for the network the vault is deployed on
   */
  constructor(chainId: number, vaultAddress: string, public signer: Signer) {
    super(chainId, vaultAddress, signer)
  }

  /////////////////////////////////// Read Functions ///////////////////////////////////

  /**
   * Returns the user's balance for the vault's share token
   * @returns
   */
  async getShareBalance(): Promise<TokenWithBalance> {
    const userAddress = await this.signer.getAddress()
    return this.getUserShareBalance(userAddress)
  }

  /**
   * Returns the user's balance for the vault's underlying asset
   * @returns
   */
  async getTokenBalance(): Promise<TokenWithBalance> {
    const userAddress = await this.signer.getAddress()
    return this.getUserTokenBalance(userAddress)
  }

  /**
   * Returns the user's allowance for the vault's underlying token
   * @returns
   */
  async getTokenAllowance(): Promise<BigNumber> {
    const userAddress = await this.signer.getAddress()
    return this.getUserTokenAllowance(userAddress)
  }

  /////////////////////////////////// Write Functions ///////////////////////////////////

  // TODO
}
