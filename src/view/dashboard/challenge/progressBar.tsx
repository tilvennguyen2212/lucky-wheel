import { CSSProperties } from 'react'

const enum ProgressDirection {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

type ProgressBarProps = {
  direction?: 'horizontal' | 'vertical'
  percent?: number
  showInfo?: boolean
  style?: CSSProperties
  borderRadius?: CSSProperties['borderRadius']
  strokeWitdh?: CSSProperties['width']
  background?: CSSProperties['background']
  successColor?: CSSProperties['background']
  infoStyle?: CSSProperties
}
const ProgressBar = ({
  direction = 'horizontal',
  percent = 0,
  showInfo = false,
  style,
  strokeWitdh = 4,
  borderRadius = strokeWitdh,
  background = '#fff',
  successColor = '#000',
  infoStyle,
}: ProgressBarProps) => {
  const wraperStye =
    direction === ProgressDirection.Vertical
      ? {
          flexFlow: 'column',
          alignItems: 'start',
          width: strokeWitdh,
          height: '100%',
        }
      : { flexFlow: 'row nowrap', alignItems: 'center', width: '100%' }

  const wrapInnerStyle =
    direction === ProgressDirection.Vertical
      ? { height: '100%', width: strokeWitdh }
      : { height: strokeWitdh, width: '100%' }

  const innerStyle =
    direction === ProgressDirection.Vertical
      ? { height: `${percent}%`, width: '100%' }
      : { height: '100%', width: `${percent}%` }

  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        ...wraperStye,
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          ...wrapInnerStyle,
          background,
          transition: 'all 0.3s ease',
          borderRadius,
        }}
      >
        <div
          style={{
            ...innerStyle,
            background: successColor,
            transition: 'all 0.3s ease',
            borderRadius,
          }}
        />
      </div>
      {showInfo && <div style={{ ...infoStyle }}>{percent}%</div>}
    </div>
  )
}

export default ProgressBar
