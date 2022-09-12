import { Fragment, useMemo } from 'react'
import { useInfix, Infix } from '@sentre/senhub'

import CardGift from './cardGift'

import { useLotteryInfo } from 'hooks/useLotteryInfo'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { useChallengePercent } from 'hooks/useChallengePercent'
import { useMilestoneByCampaign } from 'hooks/challengeReward/useMilestoneByCampaign'

const MINT_WIDTH = 150
const MINT_WIDTH_MOBILE = 75

const ListGift = () => {
  const selectedCampaign = useSelectedCampaign()
  const { getLotteryOwnerData } = useLotteryInfo(selectedCampaign)
  const { challengePecrent } = useChallengePercent()
  const infix = useInfix()
  const lotteryOwner = getLotteryOwnerData()
  const { getMilestoneCampaign } = useMilestoneByCampaign(selectedCampaign)

  const processes = getMilestoneCampaign()
  const isMobile = infix < Infix.lg
  const cardMintWidth = isMobile ? MINT_WIDTH_MOBILE : MINT_WIDTH
  const avatarSize = isMobile ? 38 : 64

  const nextMilestone = useMemo(() => {
    const totalSpin = lotteryOwner.totalPicked
    for (const value of processes) {
      if (value.gt(totalSpin)) return value
    }
    return processes[0]
  }, [lotteryOwner.totalPicked, processes])

  return (
    <Fragment>
      {processes.map((totalPicked, idx) => {
        const numTotalPicked = totalPicked.toNumber()
        return (
          <div
            className="card-challenge-gift"
            key={idx}
            style={{
              left: `calc(${numTotalPicked * challengePecrent}% - ${
                cardMintWidth / 2
              }px)`,
            }}
          >
            <div style={{ minWidth: cardMintWidth }}>
              <CardGift
                amount={numTotalPicked}
                active={totalPicked.lte(lotteryOwner.totalPicked)}
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
