import { POOL_EXPLORER_URL } from './constants'
import { PoolExplorerApiHistory, PoolExplorerApiStats } from './types'
import { updateHandler } from './updateHandler'

export const updateStats = async (event: FetchEvent | ScheduledEvent) => {
  try {
    const basicStatsResponse = await fetch(`${POOL_EXPLORER_URL}/stats`)
    const prizeHistoryResponse = await fetch(`${POOL_EXPLORER_URL}/history`)

    const basicStatsData = await basicStatsResponse.json<PoolExplorerApiStats>()
    const prizeHistoryData = await prizeHistoryResponse.json<PoolExplorerApiHistory[]>()

    return updateHandler(event, basicStatsData, prizeHistoryData)
  } catch (e) {
    return undefined
  }
}
