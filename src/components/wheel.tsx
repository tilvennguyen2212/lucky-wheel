import { useMemo, useState } from 'react'
import { util } from '@sentre/senhub'
import { MintAvatar, MintSymbol } from '@sen-use/app'

import { Avatar, Button, Col, Image, Modal, Row, Space, Typography } from 'antd'

import { Material } from '../view/createWheel/addMaterial'
import { LIST_BG_WHEEL, Reward } from 'constant'

import TICKET from 'static/images/ticket.png'
import NFT from 'static/images/nft.png'
import GoodLuck from 'static/images/image-test/1.png'
import ARROW from 'static/images/arrow.png'
import SOUND from 'static/images/sound.mp3'

let audio = new Audio(SOUND)

type WheelProps = {
  rewards: Material[]
}

const Wheel = ({ rewards }: WheelProps) => {
  const [spinning, setPinning] = useState(false)
  const [visible, setVisible] = useState(false)
  const [prize, setPrize] = useState('')

  const singleDeg = Math.ceil(360 / rewards.length)
  const skewDeg = 90 - singleDeg
  const contentDeg = Math.floor(singleDeg / 2)

  const value = useMemo(() => {
    const map = new Map<string, number>()
    for (let i = 0; i < rewards.length; i++) {
      map.set(rewards[i].value, i * singleDeg)
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

  const onSpinning = () => {
    audio.play()

    let wheel = document.getElementById('wheel')

    if (!wheel) return

    const max = -20000
    const min = -10000
    let deg = Math.floor(Math.random() * (max - min + 1)) + min
    wheel.style.transform = 'rotate(' + deg + 'deg)'
    wheel.style.transition = '3s all'

    const res = Array.from(value.keys())

    const valueSelected = res[Math.floor(Math.random() * res.length)]
    setPrize(valueSelected)

    setTimeout(() => {
      if (!wheel) return
      deg = -(value.get(valueSelected) || 0) - contentDeg //Value selected
      wheel.style.transform = 'rotate(' + deg + 'deg)'
    }, 2000)

    //Sound wheel
    setTimeout(() => {
      audio.pause()
      audio.currentTime = 0

      // winner.play()

      setPinning(false)
      setVisible(true)
    }, 5000)

    //Sound celebration
    // setTimeout(() => {
    //    winner.currentTime = 0
    // }, 5000)
  }

  return (
    <Row gutter={[64, 64]}>
      <Col span={24}>
        <div className="container">
          <div className="container-body">
            <Image src={ARROW} id="stopper" preview={false} />
            <ul className="circle" id="wheel">
              {rewards.map(({ value, type, amount }, index) => (
                <li
                  key={value}
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
                    <Space
                      style={{ zIndex: 3, position: 'relative' }}
                      direction="vertical"
                      size={0}
                    >
                      {Reward.GoodLuck === type && (
                        <Avatar size={64} shape="circle" src={GoodLuck} />
                      )}
                      {Reward.NFT === type && (
                        <Avatar size={64} shape="circle" src={NFT} />
                      )}
                      {type === Reward.Token && (
                        <MintAvatar size={64} mintAddress={value} />
                      )}
                      {type === Reward.Ticket && (
                        <Image preview={false} src={TICKET} />
                      )}
                      <Typography.Title level={5} style={{ color: '#212433' }}>
                        {amount}
                      </Typography.Title>
                      <Typography.Title level={5} style={{ color: '#212433' }}>
                        <MintSymbol mintAddress={value} />
                      </Typography.Title>
                    </Space>
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
          <Col span={24}></Col>
        </Row>
      </Col>
      <Modal visible={visible} onCancel={() => setVisible(false)} footer={null}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Typography.Title style={{ color: 'red' }} level={5}>
              Congrats: {util.shortenAddress('23423423sdfsdfsdfssdf')}
            </Typography.Title>
          </Col>
          <Col span={24}>
            You have received the :
            <span style={{ color: '#FFBE45', textTransform: 'uppercase' }}>
              {prize}
            </span>
          </Col>
        </Row>
      </Modal>
    </Row>
  )
}

export default Wheel
