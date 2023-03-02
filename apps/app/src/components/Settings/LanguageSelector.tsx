import { CheckIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { useAtom } from 'jotai'
import { selectedLanguageAtom } from '@atoms'
import { LANGUAGE_ID, SUPPORTED_LANGUAGES } from '@constants/languages'

export const LanguageSelector = () => {
  const languageIds = Object.keys(SUPPORTED_LANGUAGES) as LANGUAGE_ID[]

  return (
    <div className='flex flex-col items-center gap-4'>
      <span className='text-xl font-semibold dark:text-pt-purple-300'>Customize Language</span>
      {languageIds.map((languageId) => {
        return <LanguageItem key={`lang-item-${languageId}`} id={languageId} />
      })}
    </div>
  )
}

interface LanguageItemProps {
  id: LANGUAGE_ID
}

const LanguageItem = (props: LanguageItemProps) => {
  const { id } = props

  const [languageId, setLanguageId] = useAtom(selectedLanguageAtom)

  return (
    <div
      className={classNames(
        'w-full rounded-lg p-4 dark:bg-pt-purple-600/40 dark:hover:bg-pt-purple-600/60 cursor-pointer select-none',
        { 'outline outline-2 outline-pt-teal-dark': id === languageId }
      )}
      onClick={() => {
        setLanguageId(id)
      }}
    >
      <span className='flex items-center justify-center gap-2 dark:text-pt-purple-50'>
        {id === languageId && <CheckIcon className='h-4 w-4 dark:text-inherit' />}
        {`${id.toUpperCase()} - ${SUPPORTED_LANGUAGES[id].nativeName} (${
          SUPPORTED_LANGUAGES[id].name
        })`}
      </span>
    </div>
  )
}
