import { LANGUAGE_ID, MODAL_KEYS, useIsModalOpen } from '@shared/generic-react-hooks'
import { Footer as BaseFooter, FooterItem, LINKS, SocialIcon } from '@shared/ui'
import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

export const Footer = () => {
  const router = useRouter()
  const pathname = usePathname()

  const t_footer = useTranslations('Footer')

  const { setIsModalOpen: setIsCaptchaModalOpen } = useIsModalOpen(MODAL_KEYS.captcha)

  const handleLocaleSwitch = (newLocale: LANGUAGE_ID) => {
    router.push(pathname, { locale: newLocale })
  }

  const footerItems: FooterItem[] = [
    {
      title: t_footer('audits'),
      content: [
        {
          content: (
            <SecurityAuditItem
              svgSrc='/graphics/c4Logo.svg'
              altText='CodeArena V4 Audit'
              href={'https://code4rena.com/reports/2021-10-pooltogether'}
              date='November 5th, 2021'
            />
          )
        },
        {
          content: (
            <SecurityAuditItem
              svgSrc='/graphics/ozLogo.svg'
              altText='OpenZeppelin V3 Audit'
              href={'https://blog.openzeppelin.com/pooltogether-v3-audit'}
              date='October 21, 2020'
            />
          )
        }
      ],
      className: 'min-w-min xl:pr-20',
      titleClassName: 'whitespace-nowrap lg:text-right',
      itemClassName: 'lg:ml-auto'
    },
    {
      title: t_footer('ecosystem'),
      content: [
        { content: t_footer('tools'), href: LINKS.tools },
        { content: t_footer('devDocs'), href: LINKS.devDocs },
        { content: t_footer('security'), href: LINKS.audits },
        { content: t_footer('faq'), href: LINKS.faq },
        { content: t_footer('brandAssets'), href: LINKS.brandKit },
        { content: t_footer('governance'), href: LINKS.governance },
        { content: t_footer('userDocs'), href: LINKS.docs }
      ]
    },
    {
      title: t_footer('community'),
      content: [
        {
          content: 'Twitter',
          href: LINKS.twitter,
          icon: <SocialIcon platform='twitter' className='w-6 h-auto shrink-0' />
        },
        {
          content: 'Discord',
          onClick: () => setIsCaptchaModalOpen(true),
          icon: <SocialIcon platform='discord' className='w-6 h-auto shrink-0' />
        },
        {
          content: 'GitHub',
          href: LINKS.github,
          icon: <SocialIcon platform='github' className='w-6 h-auto shrink-0' />
        },
        {
          content: 'Medium',
          href: LINKS.medium,
          icon: <SocialIcon platform='medium' className='w-6 h-auto shrink-0' />
        }
      ]
    },
    {
      title: t_footer('languages'),
      content: [
        { content: 'English', onClick: () => handleLocaleSwitch('en') },
        { content: 'Español', onClick: () => handleLocaleSwitch('es'), disabled: true },
        { content: 'Deutsch', onClick: () => handleLocaleSwitch('de'), disabled: true },
        { content: 'Français', onClick: () => handleLocaleSwitch('fr'), disabled: true },
        { content: 'हिन्दी', onClick: () => handleLocaleSwitch('hi'), disabled: true },
        { content: 'Italiano', onClick: () => handleLocaleSwitch('it'), disabled: true },
        { content: '한국어', onClick: () => handleLocaleSwitch('ko'), disabled: true },
        { content: 'Português', onClick: () => handleLocaleSwitch('pt') },
        { content: 'Türkçe', onClick: () => handleLocaleSwitch('tr'), disabled: true },
        { content: '中文', onClick: () => handleLocaleSwitch('zh'), disabled: true }
      ]
    }
  ]

  const isDarkerFooterBg = pathname === '/' || pathname === '/ecosystem'

  return (
    <BaseFooter
      items={footerItems}
      className={classNames({
        'bg-pt-bg-purple-darker': isDarkerFooterBg,
        'bg-pt-purple-800': !isDarkerFooterBg
      })}
      containerClassName='max-w-[1440px]'
      titleClassName='text-pt-purple-400'
    />
  )
}

interface SecurityAuditItemProps {
  svgSrc: `${string}.svg`
  altText: string
  href: string
  date: string
}

const SecurityAuditItem = (props: SecurityAuditItemProps) => {
  const { svgSrc, altText, href, date } = props

  return (
    <a href={href} target='_blank' className='relative flex flex-col'>
      <Image src={svgSrc} alt={altText} fill={true} className='!relative' />
      <span className='-mt-[2%] ml-[20%] text-gray-200'>{date}</span>
    </a>
  )
}
