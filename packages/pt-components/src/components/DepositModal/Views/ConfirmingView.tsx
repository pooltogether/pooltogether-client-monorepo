import { useAtomValue } from 'jotai'
import { Vault } from 'pt-client-js'
import { Button, ExternalLink, Spinner } from 'pt-ui'
import { formatNumberForDisplay, getBlockExplorerUrl } from 'pt-utilities'
import { NetworkBadge } from '../../Badges/NetworkBadge'
import { depositFormTokenAmountAtom } from '../../Form/DepositForm'

interface ConfirmingViewProps {
  vault: Vault
  txHash: string
  closeModal: () => void
}

export const ConfirmingView = (props: ConfirmingViewProps) => {
  const { vault, txHash, closeModal } = props

  const formTokenAmount = useAtomValue(depositFormTokenAmountAtom)

  return (
    <div className='flex flex-col gap-6'>
      <span className='text-xl font-semibold text-center'>Transaction Submitted</span>
      <NetworkBadge chainId={vault.chainId} appendText='Prize Pool' className='mx-auto' />
      <span className='text-center'>
        Depositing {formatNumberForDisplay(formTokenAmount)} {vault.tokenData?.symbol}...
      </span>
      <Spinner className='w-24 h-24 mx-auto after:border-y-pt-teal' />
      <div className='flex flex-col w-full gap-6 mt-auto'>
        <ExternalLink
          href={getBlockExplorerUrl(vault.chainId, txHash, 'tx')}
          text='View TX'
          size='sm'
          className='mx-auto text-pt-purple-100'
        />
        <Button fullSized={true} color='transparent' onClick={closeModal}>
          Close
        </Button>
      </div>
    </div>
  )
}
