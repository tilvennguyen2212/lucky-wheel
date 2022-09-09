import { Fragment, useMemo } from 'react'

import CardGift from './cardGift'

import { useLotteryInfo } from 'hooks/useLotteryInfo'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { useChallengeRewardByCampaign } from 'hooks/challengeReward/useChallengeRewardByCampaign'
import { useChallengePercent } from 'hooks/useChallengePercent'

const MINT_WIDTH = 150

const ListGift = () => {
  const selectedCampaign = useSelectedCampaign()
  const challengeRewards = useChallengeRewardByCampaign(selectedCampaign)
  const lotteryInfo = useLotteryInfo(selectedCampaign)
  const challengePercent = useChallengePercent()

  const processes = useMemo(() => {
    const result: number[] = []
    for (const rewardAddress in challengeRewards) {
      const totalPicked = challengeRewards[rewardAddress].totalPicked.toNumber()
      if (result.includes(totalPicked)) continue
      result.push(totalPicked)
    }

    return result.sort()
  }, [challengeRewards])

  return (
    <Fragment>
      {processes.map((totalPicked) => {
        return (
          <div
            className="card-challenge-gift"
            key={totalPicked}
            style={{
              left: `calc(${totalPicked * challengePercent}% - ${
                MINT_WIDTH / 2
              }px)`,
            }}
          >
            <div style={{ minWidth: MINT_WIDTH }}>
              <CardGift
                amount={totalPicked}
                active={totalPicked <= lotteryInfo.totalPicked.toNumber()}
              />
            </div>
          </div>
        )
      })}
    </Fragment>
  )
}

export default ListGift
