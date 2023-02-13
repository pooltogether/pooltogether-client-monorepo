import { providers } from 'ethers'

export interface Transaction {
  id: string
  name: string
  chainId: number
  usersAddress: string
  status: TransactionStatus
  state: TransactionState
  response?: providers.TransactionResponse
  receipt?: providers.TransactionReceipt
  callbacks?: TransactionCallbacks
}

export enum TransactionStatus {
  pendingUserConfirmation = 'userConfirming',
  pendingBlockchainConfirmation = 'chainConfirming',
  cancelled = 'cancelled',
  success = 'success',
  error = 'error'
}

export enum TransactionState {
  pending = 'pending',
  complete = 'complete'
}

export interface TransactionCallbacks {
  refetch?: (id: string) => void
  onConfirmedByUser?: (id: string) => void
  onSuccess?: (id: string) => void
  onSentToWallet?: (id: string) => void
  onCancelled?: (id: string) => void
  onComplete?: (id: string) => void
  onError?: (id: string) => void
}

export interface SendTransactionOptions {
  name: string
  callTransaction: () => Promise<providers.TransactionResponse>
  callbacks?: TransactionCallbacks
}
