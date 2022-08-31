import { Button, Image } from 'antd'
import { GiftStatus } from 'constant'

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
  const cardGiftCln = active ? 'card-gift active' : 'card-gift'
  const btnType = status === GiftStatus.Pending ? 'default' : 'primary'
  const btnClnClaimed =
    status === GiftStatus.Claimed
      ? 'card-gift-btn claimed-btn'
      : 'card-gift-btn'

  return (
    <div className={cardGiftCln}>
      <Image src={src} preview={false} />
      <div className="gift-step-icon">{amount}</div>
      <div className={btnClnClaimed}>
        <Button
          type={btnType}
          onClick={() => {}}
          ghost={status === GiftStatus.Claimed}
        >
          {status}
        </Button>
      </div>
    </div>
  )
}

export default CardGift
