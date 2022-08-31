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

  return (
    <div className={cardGiftCln}>
      <Image src={src} preview={false} />
      <div className="gift-step-icon">{amount}</div>
      <div className="card-gift-btn">
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
