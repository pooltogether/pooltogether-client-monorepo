import { useAtomValue } from 'jotai'
import { Vault } from 'pt-client-js'
import { Button, ExternalLink } from 'pt-ui'
import { formatNumberForDisplay, getBlockExplorerUrl } from 'pt-utilities'
import { NetworkBadge } from '../../Badges/NetworkBadge'
import { depositFormTokenAmountAtom } from '../../Form/DepositForm'

interface SuccessViewProps {
  vault: Vault
  txHash: string
  closeModal: () => void
  onGoToAccount?: () => void
}

export const SuccessView = (props: SuccessViewProps) => {
  const { vault, txHash, closeModal, onGoToAccount } = props

  const formTokenAmount = useAtomValue(depositFormTokenAmountAtom)

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col items-center'>
        <div className='flex flex-col text-center text-xl font-medium'>
          <span>Success!</span>
          <span>
            You deposited {formatNumberForDisplay(formTokenAmount)} {vault.tokenData?.symbol}
          </span>
        </div>
        {/* TODO: add checkmark icon/image */}
      </div>
      <NetworkBadge chainId={vault.chainId} appendText='Prize Pool' className='mx-auto' />
      <span className='text-center'>You are now eligible for all future draws in this pool.</span>
      <div className='flex flex-col w-full gap-6 mt-auto'>
        <ExternalLink
          href={getBlockExplorerUrl(vault.chainId, txHash, 'tx')}
          text='View TX'
          size='sm'
          className='mx-auto text-pt-purple-100'
        />
        {/* TODO: implement twitter sharing and enable button */}
        <Button fullSized={true} disabled>
          Share Tweet
        </Button>
        {/* TODO: implement lenster sharing and enable button */}
        <Button fullSized={true} disabled>
          Share on Lenster
        </Button>
        {!!onGoToAccount && (
          <Button
            fullSized={true}
            color='transparent'
            onClick={() => {
              onGoToAccount()
              closeModal()
            }}
          >
            View Account
          </Button>
        )}
      </div>
    </div>
  )
}
