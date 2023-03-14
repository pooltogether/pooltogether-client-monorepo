import { atom, useAtom } from 'jotai'

const isDepositModalOpenAtom = atom<boolean>(false)

/**
 * Returns the state of `isDepositModalOpenAtom` as well as a method to toggle it
 * @returns
 */
export const useIsDepositModalOpen = () => {
  const [isDepositModalOpen, setIsDepositModalOpen] = useAtom(isDepositModalOpenAtom)

  return { isDepositModalOpen, setIsDepositModalOpen }
}
