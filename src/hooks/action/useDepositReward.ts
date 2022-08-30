import { useCallback, useState } from 'react'
import { web3 } from '@project-serum/anchor'

type DepositDataProps = {
  campaignAddress: string
  prizeStructures: number[]
}

export const useDepositReward = () => {
  const [loading, setLoading] = useState(false)

  const depositReward = useCallback(
    async ({ campaignAddress, prizeStructures }: DepositDataProps) => {
      try {
        setLoading(true)

        for (const key in priz) {
          if (Object.prototype.hasOwnProperty.call(object, key)) {
            const element = object[key]
          }
        }
        const { tx: txCollect } = await senExchange.collectOrder({
          order,
          sendAndConfirm: false,
        })
        trans.add(txCollect)

        const { provider } = senExchange
        const txIds = await provider.sendAndConfirm(trans)
        return notifySuccess('Approved', txIds)
      } catch (error: any) {
        notifyError(error)
      } finally {
        setLoading(false)
      }
    },
    [senExchange],
  )

  return { depositReward, loading }
}
