import type { PublicClient, WalletClient } from 'viem'

export interface ViemPublicClients {
  [chainId: number]: PublicClient
}

export interface ViemWalletClients {
  [chainId: number]: WalletClient
}
