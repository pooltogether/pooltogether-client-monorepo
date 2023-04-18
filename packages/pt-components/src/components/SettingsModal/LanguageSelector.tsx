import { CheckIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { LANGUAGE_ID, SUPPORTED_LANGUAGES, useSelectedLanguage } from 'pt-generic-hooks'
import { SettingsModalView } from '.'

interface LanguageSelectorProps {
  setView: (view: SettingsModalView) => void
}

export const LanguageSelector = (props: LanguageSelectorProps) => {
  const { setView } = props

  const languages = Object.keys(SUPPORTED_LANGUAGES) as LANGUAGE_ID[]

  return (
    <div className='flex flex-col items-center gap-4 px-4'>
      <span className='text-xl font-semibold text-pt-purple-50 order-first'>
        Customize Language
      </span>
      {languages.map((id) => {
        return <LanguageItem key={`lang-item-${id}`} id={id} setView={setView} />
      })}
    </div>
  )
}

interface LanguageItemProps {
  id: LANGUAGE_ID
  setView: (view: SettingsModalView) => void
}

const LanguageItem = (props: LanguageItemProps) => {
  const { id, setView } = props

  const { selectedLanguage, setSelectedLanguage } = useSelectedLanguage()

  return (
    <div
      className={classNames(
        'w-full rounded-lg p-4 bg-pt-transparent hover:bg-pt-transparent/5 cursor-pointer select-none',
        { 'outline outline-2 outline-pt-teal-dark -order-1': id === selectedLanguage }
      )}
      onClick={() => {
        setSelectedLanguage(id)
        setView('menu')
      }}
    >
      <span className='flex items-center justify-center gap-2 text-pt-purple-50'>
        {id === selectedLanguage && <CheckIcon className='h-4 w-4 text-inherit' />}
        {`${id.toUpperCase()} - ${SUPPORTED_LANGUAGES[id].nativeName} (${
          SUPPORTED_LANGUAGES[id].name
        })`}
      </span>
    </div>
  )
}
