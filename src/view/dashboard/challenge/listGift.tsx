import { Fragment, useMemo } from 'react'
import { useInfix, Infix } from '@sentre/senhub'

import CardGift from './cardGift'

import { useLotteryInfo } from 'hooks/useLotteryInfo'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { useChallengeRewardByCampaign } from 'hooks/challengeReward/useChallengeRewardByCampaign'
import { useChallengePercent } from 'hooks/useChallengePercent'

const MINT_WIDTH = 150
const MINT_WIDTH_MOBILE = 75

const ListGift = () => {
  const selectedCampaign = useSelectedCampaign()
  const challengeRewards = useChallengeRewardByCampaign(selectedCampaign)
  const lotteryInfo = useLotteryInfo(selectedCampaign)
  const { challengePecrent } = useChallengePercent()
  const infix = useInfix()

  const isMobile = infix < Infix.lg
  const cardMintWidth = isMobile ? MINT_WIDTH_MOBILE : MINT_WIDTH
  const avatarSize = isMobile ? 38 : 64

  const processes = useMemo(() => {
    const result: number[] = []
    for (const rewardAddress in challengeRewards) {
      const totalPicked = challengeRewards[rewardAddress].totalPicked.toNumber()
      if (result.includes(totalPicked)) continue
      result.push(totalPicked)
    }

    return result.sort()
  }, [challengeRewards])

  const nextMilestone = useMemo(() => {
    const totalSpin = lotteryInfo.totalPicked.toNumber()
    for (const value of processes) {
      if (value > totalSpin) return value
    }
    return processes[0]
  }, [lotteryInfo.totalPicked, processes])

  return (
    <Fragment>
      {processes.map((totalPicked) => {
        return (
          <div
            className="card-challenge-gift"
            key={totalPicked}
            style={{
              left: `calc(${totalPicked * challengePecrent}% - ${
                cardMintWidth / 2
              }px)`,
            }}
          >
            <div style={{ minWidth: cardMintWidth }}>
              <CardGift
                amount={totalPicked}
                active={totalPicked <= lotteryInfo.totalPicked.toNumber()}
                nextMilestone={nextMilestone === totalPicked}
                size={avatarSize}
              />
            </div>
          </div>
        )
      })}
    </Fragment>
  )
}

export default ListGift
