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
        {vaults.map((vault) => {
          return <VaultListItem vaultInfo={vault} key={`vault-${vault.name}`} />
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
      <img src={logoURI} alt={`${name} Logo`} />
      <span>{name}</span>
      <span>{symbol}</span>
      <span>Yield Source: {yieldSource}</span>
    </div>
  )
}
