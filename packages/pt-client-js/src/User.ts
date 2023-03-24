import { BigNumber, Overrides, providers, Signer } from 'ethers'
import { TokenWithBalance, TokenWithSupply } from 'pt-types'
import { validateAddress, validateSignerNetwork } from 'pt-utilities'
import { Vault } from './Vault'

/**
 * This class provides read and write functions to interact with a vault
 */
export class User extends Vault {
  /**
   * Creates an instance of a User for a specific Vault
   * @param chainId the vault's chain ID
   * @param vaultAddress the vault's address
   * @param signer a Signer for the network the vault is deployed on
   * @param options optional parameters
   */
  constructor(
    chainId: number,
    vaultAddress: string,
    public signer: Signer,
    options?: { decimals?: number; tokenAddress?: string }
  ) {
    super(chainId, vaultAddress, signer, options)
  }

  /* ============================== Read Functions ============================== */

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
   * Returns the user's deposited balance, in terms of the vault's underlying asset
   * @returns
   */
  async getDepositedTokenBalance(): Promise<TokenWithBalance & TokenWithSupply> {
    const tokenData = await this.getTokenData()
    const shares = await this.getShareBalance()
    const assets = await this.getAssetsFromShares(BigNumber.from(shares.balance))
    const balance = assets.toString()
    return { ...tokenData, balance }
  }

  /**
   * Returns the user's allowance for the vault's underlying asset
   * @returns
   */
  async getTokenAllowance(): Promise<BigNumber> {
    const userAddress = await this.signer.getAddress()
    return this.getUserTokenAllowance(userAddress)
  }

  /* ============================== Write Functions ============================== */

  /**
   * Submits a transaction to deposit into the vault
   * @param amount an unformatted token amount (w/ decimals)
   * @param overrides optional overrides for this transaction
   * @returns
   */
  async deposit(amount: BigNumber, overrides?: Overrides): Promise<providers.TransactionResponse> {
    const source = 'User [deposit]'
    const userAddress = await this.signer.getAddress()
    validateAddress(userAddress, source)
    await validateSignerNetwork(this.chainId, this.signer, source)

    if (!!overrides) {
      return this.vaultContract.deposit(amount, userAddress, overrides)
    } else {
      return this.vaultContract.deposit(amount, userAddress)
    }
  }

  /**
   * Submits a transaction to deposit into the vault and send shares to another address
   * @param amount an unformatted token amount (w/ decimals)
   * @param receiver the address to send shares to
   * @param overrides optional overrides for this transaction
   * @returns
   */
  async depositTo(
    amount: BigNumber,
    receiver: string,
    overrides?: Overrides
  ): Promise<providers.TransactionResponse> {
    const source = 'User [depositTo]'
    validateAddress(receiver, source)
    await validateSignerNetwork(this.chainId, this.signer, source)

    if (!!overrides) {
      return this.vaultContract.deposit(amount, receiver, overrides)
    } else {
      return this.vaultContract.deposit(amount, receiver)
    }
  }

  /**
   * Submits a transaction to withdraw from the vault
   * @param amount an unformatted token amount (w/ decimals)
   * @param overrides optional overrides for this transaction
   * @returns
   */
  async withdraw(amount: BigNumber, overrides?: Overrides): Promise<providers.TransactionResponse> {
    const source = 'User [withdraw]'
    const userAddress = await this.signer.getAddress()
    validateAddress(userAddress, source)
    await validateSignerNetwork(this.chainId, this.signer, source)

    if (!!overrides) {
      return this.vaultContract.withdraw(amount, userAddress, userAddress, overrides)
    } else {
      return this.vaultContract.withdraw(amount, userAddress, userAddress)
    }
  }

  /**
   * Submits a transaction to withdraw from the vault and send underlying assets to another address
   * @param amount an unformatted token amount (w/ decimals)
   * @param receiver the address to send assets to
   * @param overrides optional overrides for this transaction
   * @returns
   */
  async withdrawTo(
    amount: BigNumber,
    receiver: string,
    overrides?: Overrides
  ): Promise<providers.TransactionResponse> {
    const source = 'User [withdrawTo]'
    const userAddress = await this.signer.getAddress()
    validateAddress(userAddress, source)
    validateAddress(receiver, source)
    await validateSignerNetwork(this.chainId, this.signer, source)

    if (!!overrides) {
      return this.vaultContract.withdraw(amount, receiver, userAddress, overrides)
    } else {
      return this.vaultContract.withdraw(amount, receiver, userAddress)
    }
  }

  /**
   * Submits a transaction to set an allowance for vault deposits
   * @param amount an unformatted token amount (w/ decimals)
   * @param overrides optional overrides for this transaction
   * @returns
   */
  async approveDeposit(
    amount: BigNumber,
    overrides?: Overrides
  ): Promise<providers.TransactionResponse> {
    const source = 'User [approveDeposit]'
    await validateSignerNetwork(this.chainId, this.signer, source)
    const tokenContract = await this.getTokenContract()

    if (!!overrides) {
      return tokenContract.approve(this.address, amount, overrides)
    } else {
      return tokenContract.approve(this.address, amount)
    }
  }

  /**
   * Submits a transaction to set an allowance of 0 for vault deposits
   * @param overrides optional overrides for this transaction
   * @returns
   */
  async revokeAllowance(overrides?: Overrides): Promise<providers.TransactionResponse> {
    const source = 'User [revokeAllowance]'
    await validateSignerNetwork(this.chainId, this.signer, source)
    const tokenContract = await this.getTokenContract()

    if (!!overrides) {
      return tokenContract.approve(this.address, 0, overrides)
    } else {
      return tokenContract.approve(this.address, 0)
    }
  }
}
