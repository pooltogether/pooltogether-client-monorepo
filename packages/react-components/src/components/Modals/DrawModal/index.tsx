import { MODAL_KEYS, useIsModalOpen, useScreenSize } from 'generic-react-hooks'
import { PrizePool, SubgraphPrizePoolDraw } from 'hyperstructure-client-js'
import { Button, Modal } from 'ui'
import { MainView } from './Views/MainView'

export interface DrawModalProps {
  draw: SubgraphPrizePoolDraw
  prizePool: PrizePool
}

export const DrawModal = (props: DrawModalProps) => {
  const { draw, prizePool } = props

  const { isModalOpen, setIsModalOpen } = useIsModalOpen(MODAL_KEYS.drawWinners)

  const { isMobile } = useScreenSize()

  const handleClose = () => {
    setIsModalOpen(false)
  }

  if (isModalOpen && !!draw && !!prizePool) {
    return (
      <Modal
        bodyContent={<MainView draw={draw} prizePool={prizePool} />}
        footerContent={
          <Button onClick={handleClose} fullSized={true}>
            Close
          </Button>
        }
        onClose={handleClose}
        label='draw-info'
        mobileStyle='tab'
        hideHeader={isMobile}
        className='md:!max-w-2xl'
      />
    )
  }
}
