import { useCallback, useMemo } from 'react'
import { BN } from '@project-serum/anchor'

import { Card, Col, Row } from 'antd'
import WinList from './winList'

import { useTicketByCampaign } from 'hooks/ticket/useTicketByCampaign'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { useLotteryInfo } from 'hooks/useLotteryInfo'
import { useMilestoneByCampaign } from 'hooks/challengeReward/useMilestoneByCampaign'
import IconSax from '@sentre/antd-iconsax'

export type Winner = {
  authority: string
  rewardAddress?: string
  milestone?: BN
}

const Winners = () => {
  const selectedCampaign = useSelectedCampaign()
  const tickets = useTicketByCampaign(selectedCampaign, false)
  const { getListLotteryData } = useLotteryInfo(selectedCampaign)
  const listLottery = getListLotteryData()
  const { getMilestoneCampaign } = useMilestoneByCampaign(selectedCampaign)

  const processes = getMilestoneCampaign()

  const getAroundedMilestone = useCallback(
    (val: BN) => {
      let result = new BN(0)
      for (const milestone of processes) {
        if (!val.gte(milestone)) continue
        result = milestone
      }
      return result
    },
    [processes],
  )

  const reachedMilestoneList = useMemo(() => {
    const data: Winner[] = []
    for (const { totalPicked, authority } of listLottery) {
      if (data.length > 5) return data

      const lotteryMilestone = getAroundedMilestone(totalPicked)
      if (lotteryMilestone.lte(new BN(0))) continue

      data.push({
        milestone: lotteryMilestone,
        authority: authority.toBase58(),
      })
    }
    return data
  }, [getAroundedMilestone, listLottery])

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
      style={{ borderRadius: 50, backdropFilter: ' blur(96px)' }}
      bodyStyle={{ padding: 8 }}
    >
      <Row gutter={[8, 8]} wrap={false}>
        <Col>
          <IconSax name="Global" />
        </Col>
        <Col flex="auto">
          <WinList
            data={[...winnersLatestList, ...reachedMilestoneList]}
            height="auto"
          />
        </Col>
      </Row>
    </Card>
  )
}

export default Winners
