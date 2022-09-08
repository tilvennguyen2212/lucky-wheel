import { Fragment } from 'react'

import imgGift from 'static/images/gifts/gift01.png'
import CardGift from './cardGift'

import { GiftStatus } from 'constant'
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

  const processes = Object.keys(challengeRewards).map((addr) => {
    const challengeData = challengeRewards[addr]

    let status = GiftStatus.Pending
    return {
      src: imgGift,
      value: challengeData.totalPicked.toNumber(),
      status,
    }
  })

  const sortedProcesses = processes.sort((a, b) => (a.value > b.value ? 1 : -1))
  return (
    <Fragment>
      {sortedProcesses.map(({ src, status, value }) => {
        return (
          <div
            className="card-challenge-gift"
            key={value}
            style={{
              left: `calc(${Number(value) * challengePercent}% - ${
                MINT_WIDTH / 2
              }px)`,
            }}
          >
            <div style={{ minWidth: MINT_WIDTH }}>
              <CardGift
                src={src}
                status={status}
                amount={value}
                active={Number(value) <= lotteryInfo.totalPicked.toNumber()}
              />
            </div>
          </div>
        )
      })}
    </Fragment>
  )
}

export default ListGift
