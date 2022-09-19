import { useCallback, useMemo } from 'react'
import { BN } from '@project-serum/anchor'
import { LotteryInfoData } from '@sentre/lucky-wheel-core'

import { Card, Col, Row } from 'antd'
import IconSax from '@sentre/antd-iconsax'
import WinList from './winList'

import { useWonTickets } from 'hooks/ticket/useWonTickets'
import { useGetLastLottery } from 'hooks/lottery/useGetLastLottery'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { useMilestoneByCampaign } from 'hooks/challengeReward/useMilestoneByCampaign'

export type Winner = {
  authority: string
  rewardAddress?: string
  milestone?: BN
}

const Winners = () => {
  const wonTickets = useWonTickets()
  const selectedCampaign = useSelectedCampaign()
  const lotteryInfo = useGetLastLottery()
  const { getMilestoneCampaign } = useMilestoneByCampaign(selectedCampaign)
  const milestones = getMilestoneCampaign()

  const checkValidMilestone = useCallback(
    (milestone: BN) => {
      for (const data of milestones) {
        if (!data.cmp(milestone)) return true
      }
      return false
    },
    [milestones],
  )

  const winnerList = useMemo(() => {
    const listWonTickets = Object.values(wonTickets)
    const length = listWonTickets.length
    if (!length) return []
    let result = listWonTickets
    if (length >= 4) result = listWonTickets.slice(length - 3, length)
    return result.map(({ authority, reward }) => ({
      authority: authority.toBase58(),
      rewardAddress: reward.toBase58(),
    }))
  }, [wonTickets])

  const reachedMilestoneList = useMemo(() => {
    const listLottery = Object.values(lotteryInfo)
    const length = listLottery.length
    if (!length) return []
    let result: LotteryInfoData[] = []

    for (const lottery of listLottery)
      if (checkValidMilestone(lottery.totalPicked)) result.push(lottery)

    if (result.length >= 4)
      result = listLottery.slice(result.length - 3, result.length)

    return result.map(({ authority, totalPicked }) => ({
      authority: authority.toBase58(),
      milestone: totalPicked,
    }))
  }, [checkValidMilestone, lotteryInfo])

  if (!winnerList.length && !reachedMilestoneList.length) return null

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
            data={[...winnerList, ...reachedMilestoneList]}
            height="auto"
          />
        </Col>
      </Row>
    </Card>
  )
}

export default Winners
