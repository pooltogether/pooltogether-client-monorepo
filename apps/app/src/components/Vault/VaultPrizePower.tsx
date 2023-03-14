import { VaultInfo } from 'pt-types'
import { formatNumberForDisplay } from 'pt-utilities'

interface VaultPrizePowerProps {
  vaultInfo: VaultInfo
}

export const VaultPrizePower = (props: VaultPrizePowerProps) => {
  const { vaultInfo } = props

  // TODO: calculate vault prize power
  const prizePower: number = 4.2

  return (
    <span className='text-2xl font-semibold text-pt-purple-400'>
      {formatNumberForDisplay(prizePower, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
    </span>
  )
}
