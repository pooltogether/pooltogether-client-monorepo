import { Button } from 'pt-ui'
import { DepositModalView } from '..'
import { ErrorPooly } from '../../../Graphics/ErrorPooly'

interface ErrorViewProps {
  setModalView: (view: DepositModalView) => void
}

export const ErrorView = (props: ErrorViewProps) => {
  const { setModalView } = props

  return (
    <div className='flex flex-col gap-6 items-center'>
      <div className='flex flex-col items-center text-xl font-semibold text-center'>
        <span className='text-[#EA8686]'>Uh oh!</span>
        <span>Something went wrong...</span>
      </div>
      <ErrorPooly />
      <Button
        fullSized={true}
        color='transparent'
        onClick={() => setModalView('main')}
        className='mt-32'
      >
        Try Again
      </Button>
    </div>
  )
}
