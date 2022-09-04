import { useMemo } from 'react'
import { useWidth } from '@sentre/senhub'

import InfiniteSwiper from './infiniteSwiper'

import { useTicketByCampaign } from 'hooks/ticket/useTicketByCampaign'
import { SENTRE_CAMPAIGN } from 'constant'
import { Card } from 'antd'

export type Winner = {
  authority: string
  rewardAddress: string
}

const Winners = () => {
  const tickets = useTicketByCampaign(SENTRE_CAMPAIGN, false)

  const width = useWidth()

  const perView = useMemo(() => {
    let result = 2
    if (width > 575) result = 3
    if (width > 992) result = 4
    if (width > 1200) result = 5
    return result
  }, [width])

  const winnersLatestList = useMemo(() => {
    const data: Winner[] = []
    for (const address in tickets) {
      if (data.length > 5) return data
      const { state, reward, authority } = tickets[address]
      if (!state.won && !state.claimed) continue
      data.push({
        authority: authority.toBase58(),
        rewardAddress: reward.toBase58(),
      })
    }
    return data
  }, [tickets])

  if (!winnersLatestList.length) return null

  return (
    <Card
      bordered={false}
      style={{ borderRadius: 50 }}
      bodyStyle={{ padding: 16 }}
    >
      <InfiniteSwiper
        data={winnersLatestList}
        perViews={perView}
        height="auto"
        spacing={24}
        speed={12000}
      />
    </Card>
  )
}

export default Winners
