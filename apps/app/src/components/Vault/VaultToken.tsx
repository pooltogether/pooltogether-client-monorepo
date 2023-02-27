import { VaultInfo } from 'pt-types'

interface VaultTokenProps {
  vaultInfo: VaultInfo
}

export const VaultToken = (props: VaultTokenProps) => {
  return (
    <div className='flex gap-2'>
      <img
        src={props.vaultInfo.logoURI}
        alt={`${props.vaultInfo.name} Logo`}
        className='h-6 w-6 my-auto'
      />
      <div className='flex flex-col text-left'>
        <span>{props.vaultInfo.name}</span>
        <span className='text-sm dark:text-gray-400'>{props.vaultInfo.symbol}</span>
      </div>
    </div>
  )
}
