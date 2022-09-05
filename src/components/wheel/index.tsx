import { useMemo, useState } from 'react'

import { Button, Col, Image, Row } from 'antd'
import DisplayReward from './displayReward'
import NotifyResult from 'components/notifyResult'

import { LIST_BG_WHEEL, Reward } from 'constant'
import { useSpin } from 'hooks/actions/useSpin'
import { useAvailableTickets } from 'hooks/lottery/useAvailableTickets'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { notifyError } from 'helper'

import ARROW from 'static/images/arrow.png'
import SOUND from 'static/images/sound.mp3'
import WINNER from 'static/images/winner.mp3'

import './index.less'

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

  const [pickedTickets, setPickedTickets] = useState<string[]>([])
  const selectedCampaign = useSelectedCampaign()
  const tickets = useAvailableTickets(selectedCampaign)
  const onSpin = useSpin(selectedCampaign)

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
    for (let i = 1; i <= rewards.length; i++) {
      if (!LIST_BG_WHEEL[index]) {
        index = 0
        if (
          i === rewards.length &&
          [result[0], result[i - 1]].includes(LIST_BG_WHEEL[index])
        )
          index++
      }

      result.push(LIST_BG_WHEEL[index])
      index++
    }
    return result
  }, [rewards.length])

  const onSpinning = async (amount: number) => {
    let tickets: string[] = []
    try {
      setPinning(true)
      tickets = await onSpin(amount)

      audio.play()
      let wheel = document.getElementById('wheel')

      if (!wheel) return

      const max = -20000
      const min = -10000
      let deg = Math.floor(Math.random() * (max - min + 1)) + min
      wheel.style.transform = 'rotate(' + deg + 'deg)'
      wheel.style.transition = '3s all'

      let rewardAddress: string = Reward.GoodLuck
      const ticketData = await window.luckyWheel.account.ticket.fetch(
        tickets[0],
      )
      if (ticketData.state.won) rewardAddress = ticketData.reward.toBase58()

      setTimeout(() => {
        if (!wheel) return
        deg = -(value.get(rewardAddress || Reward.GoodLuck) || 0) - contentDeg //Value selected
        wheel.style.transform = 'rotate(' + deg + 'deg)'
      }, 2000)
    } catch (error) {
      notifyError(error)
      setPinning(false)
    } finally {
      setTimeout(() => {
        audio.pause()
        audio.currentTime = 0
        winner.currentTime = 0
        winner.play()
        setPinning(false)
        setPickedTickets(tickets)
      }, 5000)
    }
  }

  return (
    <Row gutter={[0, 32]}>
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
              disabled={spinning || !Object.keys(tickets).length}
              onClick={() => onSpinning(1)}
              loading={spinning}
              type="primary"
            >
              SPIN X1
            </Button>
          </Col>
          <Col xs={24} lg={12}>
            <Button
              size="large"
              block
              disabled={spinning || !Object.keys(tickets).length}
              loading={spinning}
              onClick={() => onSpinning(5)}
            >
              SPIN X5
            </Button>
          </Col>
        </Row>
      </Col>
      {pickedTickets.map((ticket) => (
        <NotifyResult ticket={ticket} key={ticket} />
      ))}
    </Row>
  )
}

export default Wheel
