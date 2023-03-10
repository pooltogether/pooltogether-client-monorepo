import { CurrencyValue } from 'pt-components'
import { formatDailyCountToFrequency, getPrizeTextFromFrequency } from 'pt-utilities'

interface PrizesTableProps {
  chainId: number
}

export const PrizesTable = (props: PrizesTableProps) => {
  const { chainId } = props

  // TODO: get proper prize pool info
  const prizes: { val: number; dailyCount: number }[] = [
    { val: 161_121, dailyCount: 1 / 365 },
    { val: 57_209, dailyCount: 12 / 365 },
    { val: 7_298, dailyCount: 208 / 365 },
    { val: 121, dailyCount: 6 },
    { val: 22, dailyCount: 78 },
    { val: 2, dailyCount: 256 }
  ]

  return (
    <>
      <div className='flex w-[36rem] text-center text-sm text-pt-purple-100/50 mt-8 pb-2 border-b-[0.5px] border-b-current'>
        <span className='w-1/2'>Estimated Prize Value</span>
        <span className='w-1/2'>Estimated Frequency</span>
      </div>
      <div className='flex flex-col gap-2 mb-8'>
        {prizes.map((prize, i) => {
          const frequency = formatDailyCountToFrequency(prize.dailyCount)

          return (
            <div key={`pp-prizes-${chainId}-${i}`} className='flex w-[36rem] text-center'>
              <span className='w-1/2 text-3xl text-pt-teal'>
                <CurrencyValue baseValue={prize.val} hideZeroes={true} />
              </span>
              <span className='w-1/2 text-xl text-pt-purple-100'>
                {getPrizeTextFromFrequency(frequency, 'daily')}
              </span>
            </div>
          )
        })}
      </div>
    </>
  )
}
