import Ajv from 'ajv'
import { VaultList, Version } from 'pt-types'
import { vaultListSchema } from '../vaultLists/schema'

const ajv = new Ajv()
const isValidVaultList = ajv.compile(vaultListSchema)

/**
 * Returns a unique vault list ID
 * @param vaultList basic vault list info: name and version
 * @returns
 */
export const getVaultListId = (vaultList: VaultList | { name: string; version: Version }) => {
  const vaultName = vaultList.name.toLowerCase().replaceAll(' ', '-')
  const version = `v${vaultList.version.major}.${vaultList.version.minor}.${vaultList.version.patch}`
  const id = `${vaultName}-${version}`
  return id
}

/**
 * Returns a vault list object from an HTTP URL, IPFS/IPNS hash or ENS domain
 * @param src the source of the vault list
 * @returns
 */
export const getVaultList = async (src: string) => {
  let vaultList: VaultList | undefined

  if (src.startsWith('http://') || src.startsWith('https://')) {
    const response = await fetch(src)
    vaultList = await response.json()
  } else if (src.startsWith('ipfs://')) {
    const response = await fetch(`https://dweb.link/ipfs/${src.slice(7)}`)
    vaultList = await response.json()
  } else if (src.startsWith('ipns://')) {
    const response = await fetch(`https://dweb.link/ipns/${src.slice(7)}`)
    vaultList = await response.json()
  } else if (src.endsWith('.eth')) {
    // TODO: ens resolution
  }

  return isValidVaultList(vaultList) ? vaultList : undefined
}
