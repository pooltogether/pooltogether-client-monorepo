import { VaultInfo } from 'pt-types'

interface VaultTokenProps {
  vaultInfo: VaultInfo
}

export const VaultToken = (props: VaultTokenProps) => {
  return (
    <div className='flex items-center gap-2'>
      <img src={props.vaultInfo.logoURI} alt={`${props.vaultInfo.name} Logo`} className='h-6 w-6' />
      <div className='flex flex-col'>
        <span>{props.vaultInfo.name}</span>
        <span className='text-sm'>{props.vaultInfo.symbol}</span>
      </div>
    </div>
  )
}
