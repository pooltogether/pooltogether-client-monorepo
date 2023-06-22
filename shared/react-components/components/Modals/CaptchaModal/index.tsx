import HCaptcha from '@hcaptcha/react-hcaptcha'
import { MODAL_KEYS, useIsModalOpen } from '@shared/generic-react-hooks'
import { ExternalLink, Modal } from '@shared/ui'
import { useEffect, useRef, useState } from 'react'

export interface CaptchaModalProps {
  hCaptchaSiteKey: string
}

export const CaptchaModal = (props: CaptchaModalProps) => {
  const { hCaptchaSiteKey } = props

  const { isModalOpen, setIsModalOpen } = useIsModalOpen(MODAL_KEYS.captcha)

  const handleClose = () => {
    setIsModalOpen(false)
  }

  if (isModalOpen && !!hCaptchaSiteKey) {
    return (
      <Modal
        headerContent={<HeaderContent />}
        bodyContent={<BodyContent hCaptchaSiteKey={hCaptchaSiteKey} handleClose={handleClose} />}
        footerContent={<FooterContent />}
        onClose={handleClose}
        label='discord-captcha'
        mobileStyle='tab'
        className='md:!max-w-2xl'
        footerClassName='flex justify-center'
      />
    )
  }

  return <></>
}

const HeaderContent = () => {
  return <>Join our Discord Community</>
}

interface BodyContentProps {
  hCaptchaSiteKey: string
  handleClose: () => void
}

const BodyContent = (props: BodyContentProps) => {
  const { hCaptchaSiteKey, handleClose } = props

  const [token, setToken] = useState<string>('')

  const captchaRef = useRef(null)

  const onExpire = () => {
    console.warn('hCaptcha Token Expired')
    handleClose()
  }

  useEffect(() => {
    if (!!token) {
      const getInviteToken = async () => {
        let bodyFormData = new FormData()
        bodyFormData.append('h-captcha-response', token)
        console.log('🍪 ~ bodyFormData:', bodyFormData)

        const response = await fetch(
          'https://discord-invite.pooltogether-api.workers.dev/generateInvite',
          { method: 'POST', headers: { 'Content-Type': 'multipart/form-data' }, body: bodyFormData }
        )
        console.log('🍪 ~ response:', response)

        if (response.status === 200) {
          const inviteToken = await response.json()
          console.log('🍪 ~ inviteToken:', inviteToken)
          // window.location.href = `https://discord.com/invite/${inviteToken}`
        }
      }

      getInviteToken().catch((err) => console.error(err))
    }
  }, [token])

  return (
    <div className='flex flex-col items-center'>
      <HCaptcha
        sitekey={hCaptchaSiteKey}
        onVerify={setToken}
        onExpire={onExpire}
        ref={captchaRef}
        theme='dark'
      />
    </div>
  )
}

const FooterContent = () => {
  return (
    <span className='text-center text-xs opacity-50'>
      This site is protected by hCaptcha and its{' '}
      <ExternalLink
        href='https://hcaptcha.com/privacy'
        text='Privacy Policy'
        className='text-xs text-pt-teal'
      />{' '}
      and{' '}
      <ExternalLink
        href='https://hcaptcha.com/terms'
        text='Terms of Service'
        className='text-xs text-pt-teal'
      />{' '}
      apply.
    </span>
  )
}
