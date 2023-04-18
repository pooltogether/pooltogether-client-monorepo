import { useAtomValue } from 'jotai'
import { Vault } from 'pt-client-js'
import { Button, Spinner } from 'pt-ui'
import { formatNumberForDisplay } from 'pt-utilities'
import { NetworkBadge } from '../../Badges/NetworkBadge'
import { depositFormTokenAmountAtom } from '../../Form/DepositForm'

interface WaitingViewProps {
  vault: Vault
  closeModal: () => void
}

export const WaitingView = (props: WaitingViewProps) => {
  const { vault, closeModal } = props

  const formTokenAmount = useAtomValue(depositFormTokenAmountAtom)

  return (
    <div className='flex flex-col gap-6'>
      <span className='text-xl font-semibold text-center'>Confirm Transaction in Wallet</span>
      <NetworkBadge chainId={vault.chainId} appendText='Prize Pool' className='mx-auto' />
      <span className='text-center'>
        Depositing {formatNumberForDisplay(formTokenAmount)} {vault.tokenData?.symbol}...
      </span>
      <Spinner className='w-24 h-24 mx-auto after:border-y-pt-teal' />
      <div className='flex items-end h-36'>
        <Button fullSized={true} color='transparent' onClick={closeModal}>
          Close
        </Button>
      </div>
    </div>
  )
}
