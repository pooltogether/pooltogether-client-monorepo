import { Button } from 'pt-ui'
import { DepositModalView } from '..'

interface ErrorViewProps {
  setModalView: (view: DepositModalView) => void
}

// TODO: implement proper error view design
export const ErrorView = (props: ErrorViewProps) => {
  const { setModalView } = props

  return (
    <div className='flex flex-col gap-6'>
      <span className='text-xl font-medium text-center'>Something went wrong</span>
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
