import { useAtomValue } from 'jotai'
import { Vault } from 'pt-client-js'
import { Button, ExternalLink } from 'pt-ui'
import { formatNumberForDisplay, getBlockExplorerName, getBlockExplorerUrl } from 'pt-utilities'
import { NetworkBadge } from '../../../Badges/NetworkBadge'
import { withdrawFormTokenAmountAtom } from '../../../Form/WithdrawForm'
import { SuccessPooly } from '../../../Graphics/SuccessPooly'

interface SuccessViewProps {
  vault: Vault
  closeModal: () => void
  txHash?: string
  goToAccount?: () => void
}

export const SuccessView = (props: SuccessViewProps) => {
  const { vault, txHash, closeModal, goToAccount } = props

  const formTokenAmount = useAtomValue(withdrawFormTokenAmountAtom)

  return (
    <div className='flex flex-col gap-6 items-center'>
      <div className='flex flex-col gap-3 items-center'>
        <div className='flex flex-col items-center text-xl font-medium text-center'>
          <span className='text-pt-teal'>Success!</span>
          <span>
            You withdrew {formatNumberForDisplay(formTokenAmount)} {vault.tokenData?.symbol}
          </span>
        </div>
        <NetworkBadge
          chainId={vault.chainId}
          appendText='Prize Pool'
          hideBorder={true}
          className='!py-1'
        />
        <SuccessPooly className='w-40 h-auto mt-3' />
      </div>
      {!!txHash && (
        <ExternalLink
          href={getBlockExplorerUrl(vault.chainId, txHash, 'tx')}
          text={`View on ${getBlockExplorerName(vault.chainId)}`}
          size='sm'
          className='text-pt-purple-100'
        />
      )}
      {!!goToAccount && (
        <Button
          fullSized={true}
          color='transparent'
          onClick={() => {
            goToAccount()
            closeModal()
          }}
        >
          View Account
        </Button>
      )}
    </div>
  )
}
