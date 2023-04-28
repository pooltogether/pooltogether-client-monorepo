import classNames from 'classnames'
import { useAtomValue } from 'jotai'
import { Vault } from 'pt-client-js'
import { Button, ExternalLink } from 'pt-ui'
import { formatNumberForDisplay, getBlockExplorerName, getBlockExplorerUrl } from 'pt-utilities'
import { NetworkBadge } from '../../../Badges/NetworkBadge'
import { withdrawFormTokenAmountAtom } from '../../../Form/WithdrawForm'
import { SuccessIcon } from '../../../Icons/SuccessIcon'

interface SuccessViewProps {
  vault: Vault
  closeModal: () => void
  txHash?: string
  goToAccount?: () => void
}

export const SuccessView = (props: SuccessViewProps) => {
  const { vault, txHash, closeModal, goToAccount } = props

  return (
    <div className='flex flex-col gap-6'>
      <SuccessViewHeader vault={vault} />
      <NetworkBadge
        chainId={vault.chainId}
        appendText='Prize Pool'
        hideBorder={true}
        className='!py-1 mx-auto'
      />
      <div className='flex flex-col w-full gap-6'>
        {!!txHash && (
          <ExternalLink
            href={getBlockExplorerUrl(vault.chainId, txHash, 'tx')}
            text={`View on ${getBlockExplorerName(vault.chainId)}`}
            size='sm'
            className='mx-auto text-pt-purple-100'
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
    </div>
  )
}

interface SuccessViewHeaderProps {
  vault: Vault
  className?: string
}

const SuccessViewHeader = (props: SuccessViewHeaderProps) => {
  const { vault, className } = props

  const formTokenAmount = useAtomValue(withdrawFormTokenAmountAtom)

  return (
    <div className={classNames('flex flex-col items-center gap-3', className)}>
      <div className='flex flex-col text-center text-xl font-medium'>
        <span>Success!</span>
        <span>
          You withdrew {formatNumberForDisplay(formTokenAmount)} {vault.tokenData?.symbol}
        </span>
      </div>
      <SuccessIcon />
    </div>
  )
}
