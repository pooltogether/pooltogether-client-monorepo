import { atom, useAtom } from 'jotai'

const isWithdrawModalOpenAtom = atom<boolean>(false)

/**
 * Returns the state of `isWithdrawModalOpenAtom` as well as a method to toggle it
 * @returns
 */
export const useIsWithdrawModalOpen = () => {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useAtom(isWithdrawModalOpenAtom)

  return { isWithdrawModalOpen, setIsWithdrawModalOpen }
}
