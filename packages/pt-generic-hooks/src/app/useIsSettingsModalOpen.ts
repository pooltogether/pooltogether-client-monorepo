import { atom, useAtom } from 'jotai'

const isSettingsModalOpenAtom = atom<boolean>(false)

/**
 * Returns the state of `isSettingsModalOpenAtom` as well as a method to toggle it
 * @returns
 */
export const useIsSettingsModalOpen = () => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useAtom(isSettingsModalOpenAtom)

  return { isSettingsModalOpen, setIsSettingsModalOpen }
}
