import { XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import { useWaitForTransaction } from 'wagmi'
import { Vault } from 'pt-client-js'
import { MODAL_KEYS, useIsModalOpen } from 'pt-generic-hooks'
import { useSelectedVault } from 'pt-hyperstructure-hooks'
import { Spinner, toast } from 'pt-ui'
import {
  getBlockExplorerName,
  getBlockExplorerUrl,
  getNiceNetworkNameByChainId
} from 'pt-utilities'
import { ErrorPooly } from '../Graphics/ErrorPooly'
import { SuccessPooly } from '../Graphics/SuccessPooly'

type TransactionType = 'deposit' | 'withdraw'

export interface TransactionToastProps {
  id: string | number
  type: TransactionType
  vault: Vault
  txHash: string
  formattedAmount: string
  addRecentTransaction?: (tx: { hash: string; description: string; confirmations?: number }) => void
}

export const TransactionToast = (props: TransactionToastProps) => {
  const { id, type, vault, txHash, formattedAmount, addRecentTransaction } = props

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    chainId: vault.chainId,
    hash: txHash as `0x${string}`
  })

  useEffect(() => {
    if (isSuccess && !!txHash && !!addRecentTransaction) {
      const networkName = getNiceNetworkNameByChainId(vault.chainId)
      const txDescription = `${vault.tokenData?.symbol} ${
        type === 'deposit' ? 'Deposit' : 'Withdrawal'
      }`

      addRecentTransaction({
        hash: txHash,
        description: `${networkName}: ${txDescription}`
      })
    }
  }, [isSuccess, txHash])

  return (
    <div className='relative flex flex-col gap-2 items-center text-center'>
      {isLoading && (
        <ConfirmingView
          type={type}
          vault={vault}
          txHash={txHash}
          formattedAmount={formattedAmount}
        />
      )}
      {!isLoading && isSuccess && (
        <SuccessView type={type} vault={vault} txHash={txHash} formattedAmount={formattedAmount} />
      )}
      {!isLoading && !isSuccess && isError && (
        <ErrorView type={type} vault={vault} txHash={txHash} />
      )}
      <XMarkIcon
        className='absolute top-0 right-0 h-3 w-3 text-pt-purple-100 cursor-pointer'
        onClick={() => toast.dismiss(id)}
      />
    </div>
  )
}

interface ConfirmingViewProps {
  type: TransactionType
  vault: Vault
  txHash: string
  formattedAmount: string
}

const ConfirmingView = (props: ConfirmingViewProps) => {
  const { type, vault, txHash, formattedAmount } = props

  return (
    <>
      <span className='flex items-center gap-2 text-pt-purple-50'>
        <Spinner className='after:border-y-pt-teal' />{' '}
        {type === 'deposit' ? 'Depositing' : 'Withdrawing'} {formattedAmount}{' '}
        {vault.tokenData?.symbol}...
      </span>
      <a
        href={getBlockExplorerUrl(vault.chainId, txHash, 'tx')}
        target='_blank'
        className='text-xs text-pt-teal'
      >
        View on {getBlockExplorerName(vault.chainId)}
      </a>
    </>
  )
}

interface SuccessViewProps {
  type: TransactionType
  vault: Vault
  txHash: string
  formattedAmount: string
}

const SuccessView = (props: SuccessViewProps) => {
  const { type, vault, txHash, formattedAmount } = props

  return (
    <>
      <SuccessPooly className='w-16 h-auto' />
      <div className='flex flex-col items-center text-center'>
        <span className='text-xl font-semibold text-pt-teal'>Success!</span>
        <span className='text-pt-purple-50'>
          You {type === 'deposit' ? 'deposited' : 'withdrew'} {formattedAmount}{' '}
          {vault.tokenData?.symbol} on {getNiceNetworkNameByChainId(vault.chainId)}
        </span>
      </div>
      <a
        href={getBlockExplorerUrl(vault.chainId, txHash, 'tx')}
        target='_blank'
        className='text-xs text-pt-teal'
      >
        View on {getBlockExplorerName(vault.chainId)}
      </a>
    </>
  )
}

interface ErrorViewProps {
  type: TransactionType
  vault: Vault
  txHash: string
}

const ErrorView = (props: ErrorViewProps) => {
  const { type, vault, txHash } = props

  const { setSelectedVaultById } = useSelectedVault()

  const { setIsModalOpen } = useIsModalOpen(
    type === 'deposit' ? MODAL_KEYS.deposit : MODAL_KEYS.withdraw
  )

  const handleRetry = () => {
    setSelectedVaultById(vault.id)
    setIsModalOpen(true)
  }

  return (
    <>
      <ErrorPooly className='w-16 h-auto' />
      <div className='flex flex-col items-center text-center'>
        <span className='text-xl font-semibold text-[#EA8686]'>Uh oh!</span>
        <span className='text-pt-purple-50'>Something went wrong...</span>
      </div>
      <span className='text-xs text-pt-purple-100'>
        <span onClick={handleRetry} className='text-pt-teal cursor-pointer'>
          Try Again
        </span>{' '}
        |{' '}
        <a
          href={getBlockExplorerUrl(vault.chainId, txHash, 'tx')}
          target='_blank'
          className='text-pt-teal'
        >
          View on {getBlockExplorerName(vault.chainId)}
        </a>
      </span>
    </>
  )
}