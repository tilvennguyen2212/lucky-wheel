import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Button, Image, Space, Typography } from 'antd'
import { RewardAmount } from 'components/reward/rewardAmount'
import { RewardAvatar } from 'components/reward/rewardAvatar'

import { useClaimChallengeReward } from 'hooks/actions/useClaimChallengeReward'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { useChallengeRewardByCampaign } from 'hooks/challengeReward/useChallengeRewardByCampaign'
import { useChallengeReceipts } from 'hooks/useChallengeReceipt'
import { GiftStatus, TabId } from 'constant'
import { AppDispatch } from 'model'
import { setTabId } from 'model/main.controller'

import imgGift from 'static/images/gifts/gift01.png'

type CardGiftProps = {
  amount: number
  active: boolean
  nextMilestone: boolean
}
const CardGift = ({ amount, active, nextMilestone }: CardGiftProps) => {
  const [claimed, setClaimed] = useState(false)
  const selectedCampaign = useSelectedCampaign()
  const challengeRewards = useChallengeRewardByCampaign(selectedCampaign)
  const { checkExistedReceipt } = useChallengeReceipts()
  const { onClaimChallengeReward, loading } = useClaimChallengeReward()
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

  const checkIsClaimed = useCallback(async () => {
    for (const address of listAddress) {
      const isClaimed = await checkExistedReceipt(address)
      if (!isClaimed) return setClaimed(isClaimed)
    }
    return setClaimed(true)
  }, [checkExistedReceipt, listAddress])

  useEffect(() => {
    checkIsClaimed()
  }, [checkIsClaimed])

  const cardGiftCln = active ? 'card-gift active' : 'card-gift'
  const btnType = active ? 'primary' : 'text'
  const btnClnClaimed = claimed ? 'card-gift-btn claimed-btn' : 'card-gift-btn'

  const btnText = useMemo(() => {
    if (claimed) return GiftStatus.Claimed
    if (active) return GiftStatus.Ready
    return GiftStatus.Pending
  }, [active, claimed])

  return (
    <div className={cardGiftCln}>
      <Space direction="vertical" align="center" className="card-gift_item">
        <Space size={12}>
          {listAddress.map((address) => (
            <Typography.Title level={4} key={address}>
              <RewardAmount rewardAddress={address} isChallenge={true} />{' '}
              <RewardAvatar
                size={24}
                rewardAddress={address}
                isChallenge={true}
              />
            </Typography.Title>
          ))}
        </Space>
        <Image src={imgGift} preview={false} />
      </Space>
      <div className="gift-step-icon">{amount}</div>
      <div className={btnClnClaimed}>
        {(active || claimed || nextMilestone) && (
          <Button
            disabled={claimed}
            type={btnType}
            onClick={onHandleClick}
            ghost={claimed}
            loading={loading}
          >
            {btnText}
          </Button>
        )}
      </div>
    </div>
  )
}

export default CardGift
