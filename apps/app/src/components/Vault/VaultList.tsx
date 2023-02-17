import { VaultInfo } from 'pt-types'
import { getVaultsByChainId } from 'pt-utilities'
import defaultVaultList from '../../data/defaultVaultList'

export interface VaultListProps {
  chainId: number
}

export const VaultList = (props: VaultListProps) => {
  const vaults = getVaultsByChainId(props.chainId, defaultVaultList)

  return (
    <>
      <VaultListHeaders />
      <div className='flex flex-col gap-4'>
        {vaults.map((vault, i) => {
          return <VaultListItem vaultInfo={vault} key={`vault-${i}-${vault.name}`} />
        })}
      </div>
    </>
  )
}

const VaultListHeaders = () => {
  return <></>
}

interface VaultListItemProps {
  vaultInfo: VaultInfo
}

const VaultListItem = (props: VaultListItemProps) => {
  const {
    vaultInfo: {
      name,
      symbol,
      logoURI,
      extensions: { yieldSource }
    }
  } = props

  return (
    <div className='flex gap-4'>
      <img src={logoURI} alt={`${name} Logo`} className='h-6 w-6' />
      <span>{name}</span>
      <span>{symbol}</span>
      <span>Yield Source: {yieldSource}</span>
    </div>
  )
}
