import { useDispatch } from 'react-redux'
import { BN } from '@project-serum/anchor'

import { Button, Image, Space, Typography } from 'antd'
import { MintAmount } from '@sen-use/app'

import { GiftStatus, TabId } from 'constant'
import { AppDispatch } from 'model'
import { setTabId } from 'model/main.controller'
import { useClaimChallengeReward } from 'hooks/actions/useClaimChallengeReward'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { useChallengeRewardByCampaign } from 'hooks/challengeReward/useChallengeRewardByCampaign'
import { useCallback, useMemo } from 'react'

type CardGiftProps = {
  src?: string
  status?: GiftStatus
  amount?: number | string
  active?: boolean
}
const CardGift = ({
  src = '',
  status = GiftStatus.Pending,
  amount = 0,
  active,
}: CardGiftProps) => {
  const selectedCampaign = useSelectedCampaign()
  const challengeRewards = useChallengeRewardByCampaign(selectedCampaign)
  const { onClaimChallengeReward } = useClaimChallengeReward()
  const dispatch = useDispatch<AppDispatch>()

  const listAddress = useMemo(() => {
    const result: string[] = []
    for (const address in challengeRewards) {
      const { totalPicked } = challengeRewards[address]
      if (totalPicked.toNumber() !== amount) continue
      result.push(address)
    }
    return result
  }, [amount, challengeRewards])

  const onHandleClick = useCallback(() => {
    if (!active) return dispatch(setTabId({ tabId: TabId.Spin }))
    return onClaimChallengeReward(listAddress)
  }, [active, dispatch, listAddress, onClaimChallengeReward])

  const cardGiftCln = active ? 'card-gift active' : 'card-gift'
  const btnType = active ? 'primary' : 'default'
  const btnClnClaimed =
    status === GiftStatus.Claimed
      ? 'card-gift-btn claimed-btn'
      : 'card-gift-btn'

  return (
    <div className={cardGiftCln}>
      <Space direction="vertical" align="center" className="card-gift_item">
        <Typography.Title level={4}>
          <MintAmount
            mintAddress={'5YwUkPdXLoujGkZuo9B4LsLKj3hdkDcfP4derpspifSJ'}
            amount={new BN(1_000_000_000_000)}
          />
        </Typography.Title>
        <Image src={src} preview={false} />
      </Space>
      <div className="gift-step-icon">{amount}</div>
      <div className={btnClnClaimed}>
        <Button
          type={btnType}
          onClick={onHandleClick}
          ghost={status === GiftStatus.Claimed}
        >
          {active ? 'Claim' : 'Spin more'}
        </Button>
      </div>
    </div>
  )
}

export default CardGift
