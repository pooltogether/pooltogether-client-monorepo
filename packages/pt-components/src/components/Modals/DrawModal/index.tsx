import { PrizePool } from 'pt-client-js'
import { MODAL_KEYS, useIsModalOpen } from 'pt-generic-hooks'
import { SubgraphPrizePoolDraw } from 'pt-types'
import { Button, Modal } from 'pt-ui'
import { MainView } from './Views/MainView'

export interface DrawModalProps {
  draw: SubgraphPrizePoolDraw
  prizePool: PrizePool
}

export const DrawModal = (props: DrawModalProps) => {
  const { draw, prizePool } = props

  const { isModalOpen, setIsModalOpen } = useIsModalOpen(MODAL_KEYS.drawWinners)

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
        className='sm:!max-w-2xl'
      />
    )
  }
}
