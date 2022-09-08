import { ReactNode } from 'react'

import './index.less'

type GradientAvatarProps = {
  children?: ReactNode
  size?: number
}
const GradientAvatar = ({ children, size = 48 }: GradientAvatarProps) => {
  return (
    <div
      style={{ width: size + 4, height: size + 4 }}
      className="shadow-rotate"
    >
      <div className="inner-color">{children}</div>

      {new Array(4).fill('span-item-').map((key, idx) => (
        <span className={key + idx} key={idx} />
      ))}
    </div>
  )
}

export default GradientAvatar
