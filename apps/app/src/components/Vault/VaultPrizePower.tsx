import { Vault } from 'pt-client-js'
import { formatNumberForDisplay } from 'pt-utilities'

interface VaultPrizePowerProps {
  vault: Vault
}

export const VaultPrizePower = (props: VaultPrizePowerProps) => {
  const { vault } = props

  // TODO: calculate vault prize power
  const prizePower: number = 4.2

  return (
    <span className='text-xl font-semibold text-pt-purple-400'>
      {formatNumberForDisplay(prizePower, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %
    </span>
  )
}
