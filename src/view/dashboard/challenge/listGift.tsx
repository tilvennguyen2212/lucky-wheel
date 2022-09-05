import { Fragment } from 'react'

import imgGift from 'static/images/gifts/gift01.png'
import CardGift from './cardGift'

import { useLotteryInfo } from 'hooks/useLotteryInfo'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { TOTAL_PERCENT } from './index'
import { GiftStatus } from 'constant'

const MINT_WIDTH = 150
const PROCESSES = [20, 50, 80, 120, 180]

type ListGiftProps = {
  setTabId: (val: string) => void
}

const ListGift = ({ setTabId }: ListGiftProps) => {
  const selectedCampaign = useSelectedCampaign()
  const lotteryInfo = useLotteryInfo(selectedCampaign)

  const processes = PROCESSES.map((value) => {
    let status = GiftStatus.Pending
    if (lotteryInfo.totalPicked.toNumber() >= value) status = GiftStatus.Ready
    if (lotteryInfo.totalClaimed.toNumber() >= value)
      status = GiftStatus.Claimed
    return {
      src: imgGift,
      value,
      status,
    }
  })
  return (
    <Fragment>
      {processes.map(({ src, status, value }) => {
        return (
          <div
            className="card-challenge-gift"
            key={value}
            style={{
              left: `calc(${Number(value) * TOTAL_PERCENT}% - ${
                MINT_WIDTH / 2
              }px)`,
            }}
          >
            <div style={{ minWidth: MINT_WIDTH }}>
              <CardGift
                setTabId={setTabId}
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
