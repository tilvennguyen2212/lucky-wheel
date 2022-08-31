import { useMemo, useState } from 'react'

import { Button, Col, Image, Row } from 'antd'
import DisplayReward from './displayReward'
import NotifyResult from 'components/notifyResult'

import { LIST_BG_WHEEL, Reward, SENTRE_CAMPAIGN } from 'constant'
import { useSpin } from 'hooks/lottery/useSpin'

import ARROW from 'static/images/arrow.png'
import SOUND from 'static/images/sound.mp3'
import WINNER from 'static/images/winner.mp3'

let audio = new Audio(SOUND)
let winner = new Audio(WINNER)

export type Material = {
  type: string
  rewardAddress: string
}

type WheelProps = {
  rewards: Material[]
}

const Wheel = ({ rewards }: WheelProps) => {
  const [spinning, setPinning] = useState(false)
  const [visible, setVisible] = useState(false)
  const [resultReward, setResultReward] = useState('')
  const onSpin = useSpin(SENTRE_CAMPAIGN)

  const singleDeg = Math.ceil(360 / rewards.length)
  const skewDeg = 90 - singleDeg
  const contentDeg = Math.floor(singleDeg / 2)

  const value = useMemo(() => {
    const map = new Map<string, number>()
    for (let i = 0; i < rewards.length; i++) {
      map.set(rewards[i].rewardAddress, i * singleDeg)
    }
    return map
  }, [rewards, singleDeg])

  const listBG = useMemo(() => {
    let index = 0
    const result = []
    for (let i = 0; i < rewards.length; i++) {
      if (!LIST_BG_WHEEL[index]) index = 0

      result.push(LIST_BG_WHEEL[index])
      index++
    }
    return result
  }, [rewards.length])

  const onSpinning = async () => {
    setPinning(true)
    const rewardAddress = await onSpin()

    audio.play()
    let wheel = document.getElementById('wheel')

    if (!wheel) return

    const max = -20000
    const min = -10000
    let deg = Math.floor(Math.random() * (max - min + 1)) + min
    wheel.style.transform = 'rotate(' + deg + 'deg)'
    wheel.style.transition = '3s all'

    setResultReward(rewardAddress || Reward.GoodLuck)

    setTimeout(() => {
      if (!wheel) return
      deg = -(value.get(rewardAddress || Reward.GoodLuck) || 0) - contentDeg //Value selected
      wheel.style.transform = 'rotate(' + deg + 'deg)'
    }, 2000)

    //Sound wheel
    setTimeout(() => {
      audio.pause()
      audio.currentTime = 0

      winner.play()

      setPinning(false)
      setVisible(true)
    }, 5000)

    //Sound celebration
    setTimeout(() => {
      winner.currentTime = 0
    }, 5000)
  }

  return (
    <Row gutter={[64, 64]}>
      <Col span={24}>
        <div className="container">
          <div className="container-body">
            <Image src={ARROW} id="stopper" preview={false} />
            <ul className="circle" id="wheel">
              {rewards.map((reward, index) => (
                <li
                  key={reward.rewardAddress}
                  style={{
                    transform: `rotate(${
                      index * singleDeg
                    }deg) skewY(-${skewDeg}deg)`,
                  }}
                >
                  <div
                    style={{
                      transform: `skewY(${skewDeg}deg) rotate(${contentDeg}deg)`,
                    }}
                    className="text"
                  >
                    <div
                      className="bg"
                      style={{ background: `${listBG[index]}` }}
                    />
                    <DisplayReward material={reward} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Button
              size="large"
              block
              disabled={spinning}
              onClick={onSpinning}
              loading={spinning}
              type="primary"
            >
              SPIN X1
            </Button>
          </Col>
          <Col xs={24} lg={12}>
            <Button size="large" block disabled={spinning} onClick={onSpinning}>
              SPIN X10
            </Button>
          </Col>
        </Row>
      </Col>
      <NotifyResult
        resultReward={resultReward}
        visible={visible}
        onClose={setVisible}
      />
    </Row>
  )
}

export default Wheel
