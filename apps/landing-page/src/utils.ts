import deepmerge from 'deepmerge'
import { ProtocolStats } from './types'

export const getProtocolStats = async () => {
  const results = await fetch('https://protocol-stats.ncookie.workers.dev')
  const data: ProtocolStats = await results.json()
  return data
}

export const getMessages = async (locale?: string) => {
  const defaultMessages: IntlMessages = (await import(`../messages/en.json`)).default

  if (!locale) return defaultMessages

  const localeMessages: IntlMessages = (await import(`../messages/${locale}.json`)).default
  const messages = deepmerge<IntlMessages>(defaultMessages, localeMessages)

  return messages
}
