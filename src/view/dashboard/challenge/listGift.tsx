import { Fragment } from 'react'

import { GiftStatus } from 'constant'

import imgGift from 'static/images/gifts/gift01.png'
import CardGift from './cardGift'
import { TOTAL_PERCENT } from './index'

const MINT_WIDTH = 150

type SepRewardState = Record<string, { src: string; status: GiftStatus }>
const STEP_REWARDS: SepRewardState = {
  20: { src: imgGift, status: GiftStatus.Claimed },
  50: { src: imgGift, status: GiftStatus.Ready },
  80: { src: imgGift, status: GiftStatus.Pending },
  120: { src: imgGift, status: GiftStatus.Pending },
  180: { src: imgGift, status: GiftStatus.Pending },
}
const ListGift = () => {
  return (
    <Fragment>
      {Object.keys(STEP_REWARDS).map((key) => {
        const { src, status } = STEP_REWARDS[key]
        return (
          <div
            className="card-challenge-gift"
            key={key}
            style={{
              left: `calc(${Number(key) * TOTAL_PERCENT}% - ${
                MINT_WIDTH / 2
              }px)`,
            }}
          >
            <div style={{ minWidth: MINT_WIDTH }}>
              <CardGift
                src={src}
                status={status}
                amount={key}
                active={Number(key) <= 50}
              />
            </div>
          </div>
        )
      })}
    </Fragment>
  )
}

export default ListGift
