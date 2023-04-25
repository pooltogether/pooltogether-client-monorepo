import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCachedVaultLists, useSelectedVaultListIds, useVaultList } from 'pt-hyperstructure-hooks'
import { VaultList } from 'pt-types'
import { ExternalLink, Toggle } from 'pt-ui'
import { ImportedBadge } from '../../../Badges/ImportedBadge'

interface VaultListViewProps {
  localVaultLists?: { [id: string]: VaultList }
}

export const VaultListView = (props: VaultListViewProps) => {
  const { localVaultLists } = props

  const { cachedVaultLists } = useCachedVaultLists()

  const { localIds, importedIds } = useSelectedVaultListIds()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<{ src: string }>({
    mode: 'onSubmit',
    defaultValues: { src: '' }
  })

  const error =
    !!errors.src?.message && typeof errors.src?.message === 'string' ? errors.src?.message : null

  const [newVaultList, setNewVaultList] = useState<{ src: string }>({ src: '' })
  useVaultList(newVaultList.src)

  // TODO: the form should display some form of loading indicator instead of simply resetting on successful query
  const onSubmit = (data: { src: string }) => {
    setNewVaultList(data)
    reset()
  }

  const importedVaultLists = useMemo(() => {
    const localVaultListIds = Object.keys(localVaultLists ?? {})
    const newVaultLists: { [id: string]: VaultList } = {}
    Object.keys(cachedVaultLists).forEach((key) => {
      if (!localVaultListIds.includes(key) && !!cachedVaultLists[key]) {
        newVaultLists[key] = cachedVaultLists[key] as VaultList
      }
    })
    return newVaultLists
  }, [localVaultLists, cachedVaultLists])

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
          className='text-pt-purple-200'
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('src', {
            validate: {
              isValidSrc: (v) =>
                v.startsWith('http://') ||
                v.startsWith('https://') ||
                v.startsWith('ipfs://') ||
                v.startsWith('ipns://') ||
                v.endsWith('.eth') ||
                'Not a valid URL or ENS domain'
            }
          })}
          id='vaultListInput'
          type='text'
          className='w-full text-sm bg-gray-50 text-pt-purple-900 px-4 py-3 rounded-lg focus:outline-none'
          placeholder='https:// or ipfs:// or ENS name'
        />
        {!!error && <span className='text-sm text-pt-warning-light'>{error}</span>}
      </form>

      {!!localVaultLists &&
        Object.keys(localVaultLists).map((id) => (
          <VaultListItem
            key={`vl-local-item-${id}`}
            id={id}
            vaultList={localVaultLists[id]}
            isChecked={localIds.includes(id)}
          />
        ))}

      {Object.keys(importedVaultLists).map((id) => (
        <VaultListItem
          key={`vl-imported-item-${id}`}
          id={id}
          vaultList={importedVaultLists[id]}
          isChecked={importedIds.includes(id)}
          isImported={true}
        />
      ))}
    </div>
  )
}

interface VaultListItemProps {
  id: string
  vaultList: VaultList
  isChecked?: boolean
  isImported?: boolean
}

const VaultListItem = (props: VaultListItemProps) => {
  const { vaultList, id, isChecked, isImported } = props

  const { select, unselect } = useSelectedVaultListIds()

  const handleChange = (checked: boolean) => {
    if (checked) {
      select(id, isImported ? 'imported' : 'local')
    } else {
      unselect(id, isImported ? 'imported' : 'local')
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
          <div className='flex items-center gap-2 text-pt-purple-100'>
            <span className='text-xs'>
              {vaultList.tokens.length} Token{vaultList.tokens.length > 1 ? 's' : ''}
            </span>
            {isImported && <ImportedBadge />}
          </div>
        </div>
      </div>
      <Toggle checked={!!isChecked} onChange={handleChange} />
    </div>
  )
}
