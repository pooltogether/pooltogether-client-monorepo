import { updateStats } from './updateStats'

export const handleScheduled = async (event: ScheduledEvent): Promise<boolean> => {
  try {
    await updateStats(event)
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}
