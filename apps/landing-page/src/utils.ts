import { ProtocolStats } from './types'

export const getProtocolStats = async () => {
  const results = await fetch('https://protocol-stats.ncookie.workers.dev')
  const data: ProtocolStats = await results.json()
  return data
}
