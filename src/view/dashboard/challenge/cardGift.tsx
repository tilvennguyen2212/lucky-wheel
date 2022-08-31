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
  const circleCln = active ? 'gift-step-icon active' : 'gift-step-icon'

  return (
    <div className="card-gift">
      <Image src={src} preview={false} />
      <div className={circleCln}>{amount}</div>
      <Button type="primary" onClick={() => {}} ghost>
        CLAIM
      </Button>
    </div>
  )
}

export default CardGift
