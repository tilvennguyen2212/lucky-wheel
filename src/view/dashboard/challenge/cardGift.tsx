import { Button, Image } from 'antd'
import { GiftStatus, TabId } from 'constant'

type CardGiftProps = {
  src?: string
  status?: GiftStatus
  amount?: number | string
  active?: boolean
  setTabId: (val: string) => void
}
const CardGift = ({
  src = '',
  status = GiftStatus.Pending,
  amount = 0,
  active,
  setTabId,
}: CardGiftProps) => {
  const cardGiftCln = active ? 'card-gift active' : 'card-gift'
  const btnType = status === GiftStatus.Pending ? 'default' : 'primary'
  const btnClnClaimed =
    status === GiftStatus.Claimed
      ? 'card-gift-btn claimed-btn'
      : 'card-gift-btn'

  const onHandleClick = () => {
    if (status === GiftStatus.Pending) return setTabId(TabId.Spin)
  }

  return (
    <div className={cardGiftCln}>
      <Image src={src} preview={false} />
      <div className="gift-step-icon">{amount}</div>
      <div className={btnClnClaimed}>
        <Button
          type={btnType}
          onClick={onHandleClick}
          ghost={status === GiftStatus.Claimed}
        >
          {status}
        </Button>
      </div>
    </div>
  )
}

export default CardGift
