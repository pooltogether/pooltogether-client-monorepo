import { BigNumber, Contract, providers, Signer, utils } from 'ethers'
import { TokenWithBalance, TokenWithSupply } from 'pt-types'
import {
  erc20 as erc20Abi,
  erc4626 as erc4626Abi,
  getTokenAllowances,
  getTokenBalances,
  getTokenInfo,
  validateAddress,
  validateSignerOrProviderNetwork
} from 'pt-utilities'

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

  /**
   * Returns basic data about the vault's underlying asset
   * @returns
   */
  async getTokenData(): Promise<TokenWithSupply> {
    const source = 'Vault [getTokenData]'
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)
    const tokenContract = await this.getTokenContract()
    const tokenInfo = await getTokenInfo(this.signerOrProvider, [tokenContract.address])
    return tokenInfo[tokenContract.address]
  }

  /**
   * Returns basic data about the vault's share token
   * @returns
   */
  async getShareData(): Promise<TokenWithSupply> {
    const source = 'Vault [getShareData]'
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)
    const shareInfo = await getTokenInfo(this.signerOrProvider, [this.address])
    return shareInfo[this.address]
  }

  /**
   * Returns a user's balance for the vault's underlying asset
   * @param userAddress the user's address to get a balance for
   * @returns
   */
  async getUserTokenBalance(userAddress: string): Promise<TokenWithBalance> {
    const source = 'Vault [getUserTokenBalance]'
    validateAddress(userAddress)
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)
    const tokenContract = await this.getTokenContract()
    const tokenBalance = await getTokenBalances(this.signerOrProvider, userAddress, [
      tokenContract.address
    ])
    return tokenBalance[tokenContract.address]
  }

  /**
   * Returns a user's balance for the vault's share token
   * @param userAddress the user's address to get a balance for
   * @returns
   */
  async getUserShareBalance(userAddress: string): Promise<TokenWithBalance> {
    const source = 'Vault [getUserShareBalance]'
    validateAddress(userAddress)
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)
    const shareBalance = await getTokenBalances(this.signerOrProvider, userAddress, [this.address])
    return shareBalance[this.address]
  }

  /**
   * Returns a user's allowance for the vault's underlying token
   * @param userAddress the user's address to get an allowance for
   * @returns
   */
  async getUserTokenAllowance(userAddress: string): Promise<BigNumber> {
    const source = 'Vault [getUserTokenAllowance]'
    validateAddress(userAddress)
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)
    const tokenContract = await this.getTokenContract()
    const tokenAllowance = await getTokenAllowances(
      this.signerOrProvider,
      userAddress,
      this.address,
      [tokenContract.address]
    )
    return tokenAllowance[tokenContract.address]
  }

  //////////////////////////////// Contract Initializers ////////////////////////////////

  /**
   * Initializes a contract for the vault's underlying asset.
   * @returns
   */
  async getTokenContract(): Promise<Contract> {
    if (this.tokenContract !== undefined) return this.tokenContract
    const tokenAddress: string = ((await this.vaultContract.functions.asset()) as utils.Result)[0]
    const tokenContract = new Contract(tokenAddress, erc20Abi, this.signerOrProvider)
    this.tokenContract = tokenContract
    return tokenContract
  }
}
