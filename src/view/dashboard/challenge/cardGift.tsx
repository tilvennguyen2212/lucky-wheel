import { useCallback, useEffect, useMemo, useState } from 'react'
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
import { useChallengeReceipts } from 'hooks/useChallengeReceipt'

type CardGiftProps = {
  src?: string
  amount?: number | string
  active?: boolean
}
const CardGift = ({ src = '', amount = 0, active }: CardGiftProps) => {
  const [claimed, setClaimed] = useState(false)
  const selectedCampaign = useSelectedCampaign()
  const challengeRewards = useChallengeRewardByCampaign(selectedCampaign)
  const { checkExistedReceipt } = useChallengeReceipts()
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
  const btnType = active ? 'primary' : 'default'
  const btnClnClaimed = claimed ? 'card-gift-btn claimed-btn' : 'card-gift-btn'

  const btnText = useMemo(() => {
    if (claimed) return GiftStatus.Claimed
    if (active) return GiftStatus.Ready
    return GiftStatus.Pending
  }, [active, claimed])

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
          disabled={claimed}
          type={btnType}
          onClick={onHandleClick}
          ghost={claimed}
        >
          {btnText}
        </Button>
      </div>
    </div>
  )
}

export default CardGift
