import { useCallback, useEffect, useState } from 'react'
import { accountDiscriminator, encodeIxData } from '@sen-use/web3'
import { LotteryInfoData } from '@sentre/lucky-wheel-core'

export const useGetLastLottery = () => {
  const [watchId, setWatchId] = useState(0)
  const [lotteryInfo, setLotteryInfo] = useState<
    Record<string, LotteryInfoData>
  >({})

  const watchData = useCallback(async () => {
    if (watchId) return
    const nextLotteryInfo = JSON.parse(JSON.stringify(lotteryInfo))
    const { provider, program } = window.luckyWheel
    const newWatcherId = provider.connection.onProgramAccountChange(
      program.account.ticket.programId,
      async (info) => {
        const address = info.accountId.toBase58()
        const buffer = info.accountInfo.data
        const accountData = program.coder.accounts.decode('lotteryInfo', buffer)
        nextLotteryInfo[address] = accountData
      },
      'confirmed',
      [
        {
          memcmp: {
            offset: 0,
            bytes: encodeIxData(accountDiscriminator('lotteryInfo')),
          },
        },
      ],
    )
    setWatchId(newWatcherId)
    return setLotteryInfo(nextLotteryInfo)
  }, [lotteryInfo, watchId])

  useEffect(() => {
    if (watchId) return
    watchData()
    return () => {
      ;(async () => {
        if (!watchId) return
        await window.luckyWheel.provider.connection.removeProgramAccountChangeListener(
          watchId,
        )
        setWatchId(0)
      })()
    }
  }, [watchData, watchId])

  return { ...lotteryInfo }
}
