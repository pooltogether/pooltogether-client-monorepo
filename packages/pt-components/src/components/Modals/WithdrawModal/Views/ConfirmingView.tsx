import { useAtomValue } from 'jotai'
import { Vault } from 'pt-client-js'
import { Button, ExternalLink, Spinner } from 'pt-ui'
import { formatNumberForDisplay, getBlockExplorerUrl } from 'pt-utilities'
import { NetworkBadge } from '../../../Badges/NetworkBadge'
import { withdrawFormShareAmountAtom } from '../../../Form/WithdrawForm'

interface ConfirmingViewProps {
  vault: Vault
  closeModal: () => void
  txHash?: string
}

export const ConfirmingView = (props: ConfirmingViewProps) => {
  const { vault, txHash, closeModal } = props

  const formShareAmount = useAtomValue(withdrawFormShareAmountAtom)

  return (
    <div className='flex flex-col gap-6'>
      <span className='text-xl font-semibold text-center'>Transaction Submitted</span>
      <NetworkBadge
        chainId={vault.chainId}
        appendText='Prize Pool'
        hideBorder={true}
        className='!py-1 mx-auto'
      />
      <span className='text-center'>
        Withdrawing {formatNumberForDisplay(formShareAmount)} {vault.shareData?.symbol}...
      </span>
      <Spinner className='w-24 h-24 mx-auto after:border-y-pt-teal' />
      <div className='flex flex-col w-full justify-end h-36 gap-6'>
        {!!txHash && (
          <ExternalLink
            href={getBlockExplorerUrl(vault.chainId, txHash, 'tx')}
            text='View TX'
            size='sm'
            className='mx-auto text-pt-purple-100'
          />
        )}
        <Button fullSized={true} color='transparent' onClick={closeModal}>
          Close
        </Button>
      </div>
    </div>
  )
}
