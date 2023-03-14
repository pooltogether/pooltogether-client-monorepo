import { VaultInfo } from 'pt-types'

interface VaultYieldSourceProps {
  vaultInfo: VaultInfo
}

export const VaultYieldSource = (props: VaultYieldSourceProps) => {
  const { vaultInfo } = props

  return <span className='text-lg'>{vaultInfo.extensions.yieldSource}</span>
}
