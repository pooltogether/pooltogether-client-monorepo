import { BigNumber, Contract, providers, Signer, utils } from 'ethers'
import { TokenWithBalance, TokenWithSupply } from 'pt-types'
import {
  erc20 as erc20Abi,
  erc4626 as erc4626Abi,
  getProviderFromSigner,
  getTokenAllowances,
  getTokenBalances,
  getTokenInfo,
  getVaultId,
  validateAddress,
  validateSignerOrProviderNetwork
} from 'pt-utilities'

/**
 * This class provides read-only functions to fetch on-chain data from a vault
 */
export class Vault {
  readonly vaultContract: Contract
  readonly id: string
  tokenContract: Contract | undefined
  exchangeRate: BigNumber | undefined

  /**
   * Creates an instance of a Vault with a given signer or provider to query on-chain data with
   * @param chainId the vault's chain ID
   * @param address the vault's address
   * @param decimals the vault's decimals
   * @param signerOrProvider a Signer or Provider for the network the vault is deployed on
   * @param tokenAddress optional token address (prevents 1 extra call)
   */
  constructor(
    public chainId: number,
    public address: string,
    public decimals: number,
    public signerOrProvider: Signer | providers.Provider,
    tokenAddress?: string
  ) {
    this.vaultContract = new Contract(address, erc4626Abi, signerOrProvider)
    this.id = getVaultId({ address, chainId })
    if (!!tokenAddress) {
      this.tokenContract = new Contract(tokenAddress, erc20Abi, signerOrProvider)
    }
  }

  /* ============================== Read Functions ============================== */

  /**
   * Returns basic data about the vault's underlying asset
   * @returns
   */
  async getTokenData(): Promise<TokenWithSupply> {
    const source = 'Vault [getTokenData]'
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)
    const tokenContract = await this.getTokenContract()
    const provider = getProviderFromSigner(this.signerOrProvider)
    if (provider === undefined) throw new Error(`${source} | Invalid Provider'`)
    const tokenInfo = await getTokenInfo(provider, [tokenContract.address])
    return tokenInfo[tokenContract.address]
  }

  /**
   * Returns basic data about the vault's share token
   * @returns
   */
  async getShareData(): Promise<TokenWithSupply> {
    const source = 'Vault [getShareData]'
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)
    const provider = getProviderFromSigner(this.signerOrProvider)
    if (provider === undefined) throw new Error(`${source} | Invalid Provider'`)
    const shareInfo = await getTokenInfo(provider, [this.address])
    return shareInfo[this.address]
  }

  /**
   * Returns a user's balance for the vault's underlying asset
   * @param userAddress the user's address to get a balance for
   * @returns
   */
  async getUserTokenBalance(userAddress: string): Promise<TokenWithBalance> {
    const source = 'Vault [getUserTokenBalance]'
    validateAddress(userAddress, source)
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)
    const provider = getProviderFromSigner(this.signerOrProvider)
    if (provider === undefined) throw new Error(`${source} | Invalid Provider'`)
    const tokenContract = await this.getTokenContract()
    const tokenBalance = await getTokenBalances(provider, userAddress, [tokenContract.address])
    return tokenBalance[tokenContract.address]
  }

  /**
   * Returns a user's balance for the vault's share token
   * @param userAddress the user's address to get a balance for
   * @returns
   */
  async getUserShareBalance(userAddress: string): Promise<TokenWithBalance> {
    const source = 'Vault [getUserShareBalance]'
    validateAddress(userAddress, source)
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)
    const provider = getProviderFromSigner(this.signerOrProvider)
    if (provider === undefined) throw new Error(`${source} | Invalid Provider'`)
    const shareBalance = await getTokenBalances(provider, userAddress, [this.address])
    return shareBalance[this.address]
  }

  /**
   * Returns a user's allowance for the vault's underlying asset
   * @param userAddress the user's address to get an allowance for
   * @returns
   */
  async getUserTokenAllowance(userAddress: string): Promise<BigNumber> {
    const source = 'Vault [getUserTokenAllowance]'
    validateAddress(userAddress, source)
    await validateSignerOrProviderNetwork(this.chainId, this.signerOrProvider, source)
    const provider = getProviderFromSigner(this.signerOrProvider)
    if (provider === undefined) throw new Error(`${source} | Invalid Provider'`)
    const tokenContract = await this.getTokenContract()
    const tokenAllowance = await getTokenAllowances(provider, userAddress, this.address, [
      tokenContract.address
    ])
    return tokenAllowance[tokenContract.address]
  }

  /**
   * Returns the equivalent amount of underlying assets from a share amount
   * @param shares the amount of shares to convert
   * @returns
   */
  async getAssetsFromShares(shares: BigNumber): Promise<BigNumber> {
    const assets: string = this.vaultContract.convertToAssets(shares)
    return BigNumber.from(assets)
  }

  /**
   * Returns the equivalent amount of shares from an underlying asset amount
   * @param assets the amount of assets to convert
   * @returns
   */
  async getSharesFromAssets(assets: BigNumber): Promise<BigNumber> {
    const shares: string = this.vaultContract.convertToShares(assets)
    return BigNumber.from(shares)
  }

  /**
   * Returns the total amount of underlying assets deposited in the vault
   * @returns
   */
  async getTotalTokenBalance(): Promise<BigNumber> {
    const totalAssets: string = this.vaultContract.totalAssets()
    return BigNumber.from(totalAssets)
  }

  /**
   * Returns the exchange rate from 1 share to the vault's underlying asset
   * @returns
   */
  async getExchangeRate(): Promise<BigNumber> {
    const exchangeRate = await this.getAssetsFromShares(utils.parseUnits('1', this.decimals))
    this.exchangeRate = exchangeRate
    return exchangeRate
  }

  /* =========================== Contract Initializers =========================== */

  /**
   * Initializes a contract for the vault's underlying asset
   * @returns
   */
  async getTokenContract(): Promise<Contract> {
    if (this.tokenContract !== undefined) return this.tokenContract
    const tokenAddress: string = await this.vaultContract.asset()
    const tokenContract = new Contract(tokenAddress, erc20Abi, this.signerOrProvider)
    this.tokenContract = tokenContract
    return tokenContract
  }
}
