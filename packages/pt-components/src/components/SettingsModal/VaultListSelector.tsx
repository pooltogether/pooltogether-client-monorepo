import { Cog8ToothIcon } from '@heroicons/react/20/solid'
import { useMemo } from 'react'
import {
  defaultVaultList,
  defaultVaultListId,
  useCachedVaultLists,
  useSelectedVaultLists
} from 'pt-hyperstructure-hooks'
import { VaultList } from 'pt-types'
import { ExternalLink, Toggle } from 'pt-ui'
import { getVaultListId } from 'pt-utilities'
import { ImportedBadge } from '../Badges/ImportedBadge'

export const VaultListSelector = () => {
  const { cachedVaultLists } = useCachedVaultLists()

  return (
    <div className='flex flex-col gap-8 px-4'>
      <div className='flex flex-col items-center gap-2 text-center'>
        <span className='text-xl font-semibold'>Manage Prize Asset Lists</span>
        <span className='text-pt-purple-50'>
          Prize asset lists determine what assets are displayed throughout the app. Use caution when
          interacting with imported lists.
        </span>
        {/* TODO: add link */}
        <ExternalLink
          href='#'
          text='Learn more about prize asset lists'
          size='medium'
          className='text-pt-purple-200'
        />
      </div>

      {/* TODO: vault list input functionality (fetching URL, IPFS & ENS data + caching) */}
      <input
        id='vaultListInput'
        type='text'
        className='w-full text-sm bg-gray-50 text-pt-purple-900 px-4 py-3 rounded-lg focus:outline-none'
        placeholder='https:// or ipfs:// or ENS name'
        disabled
      />

      <VaultListItem
        key={`vl-item-${defaultVaultListId}`}
        vaultList={defaultVaultList}
        id={defaultVaultListId}
        disabled={cachedVaultLists.length === 0}
      />
      {cachedVaultLists.map((vaultList) => {
        const vaultListId = getVaultListId(vaultList)
        return (
          <VaultListItem key={`vl-item-${vaultListId}`} vaultList={vaultList} id={vaultListId} />
        )
      })}
    </div>
  )
}

interface VaultListItemProps {
  vaultList: VaultList
  id: string
  disabled?: boolean
}

const VaultListItem = (props: VaultListItemProps) => {
  const { vaultList, id, disabled } = props

  const { selectedVaultLists, addVaultList, removeVaultList } = useSelectedVaultLists()

  const isChecked = useMemo(() => selectedVaultLists.includes(id), [id, selectedVaultLists])
  const isImported = useMemo(() => id !== defaultVaultListId, [id])

  const handleChange = (checked: boolean) => {
    if (checked) {
      addVaultList(id)
    } else {
      removeVaultList(id)
    }
  }

  const version = `v${vaultList.version.major}.${vaultList.version.minor}.${vaultList.version.patch}`

  return (
    <div className='w-full flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        {!!vaultList.logoURI && <img src={vaultList.logoURI} className='w-8 h-8 rounded-full' />}
        <div className='flex flex-col gap-1 text-pt-purple-50'>
          <span>
            <span className='font-medium'>{vaultList.name}</span>{' '}
            <span className='text-xs'>{version}</span>
          </span>
          <div className='flex items-center gap-1 text-pt-purple-100'>
            <span className='text-xs'>
              {vaultList.tokens.length} Token{vaultList.tokens.length > 1 ? 's' : ''}
            </span>
            {/* TODO: cog functionality */}
            <Cog8ToothIcon className='h-5 w-5 text-inherit cursor-pointer' />
            {isImported && <ImportedBadge />}
          </div>
        </div>
      </div>
      <Toggle label={''} checked={isChecked} onChange={handleChange} disabled={disabled} />
    </div>
  )
}
