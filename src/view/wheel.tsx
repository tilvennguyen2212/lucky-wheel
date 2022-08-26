import { useState } from 'react'
import { useWalletAddress, util } from '@sentre/senhub'

import { Button, Col, Row, Image, Modal, Typography, Avatar } from 'antd'

import WHEEL from 'static/images/spin_final.svg'
import ARROW from 'static/images/arrow.png'
import SOUND from 'static/images/sound.mp3'
import WINNER from 'static/images/winner.mp3'

import M1 from 'static/images/image-test/1.png'
import M2 from 'static/images/image-test/2.png'
import M3 from 'static/images/image-test/3.png'
import M4 from 'static/images/image-test/4.png'
import M5 from 'static/images/image-test/5.png'
import M6 from 'static/images/image-test/6.png'
import M7 from 'static/images/image-test/7.png'

import './index.less'

let audio = new Audio(SOUND)
let winner = new Audio(WINNER)

const VALUE: Record<string, number> = {
  fail: 0,
  degod: 51.5,
  sentre: 103,
  usdc: 154.5,
  ticket: 206,
  secret: 257.5,
  nft: 309,
}

const MATERIAL: Record<string, string> = {
  fail: M1,
  degod: M2,
  sentre: M3,
  usdc: M4,
  ticket: M5,
  secret: M6,
  nft: M7,
}

const Wheel = () => {
  const [spinning, setPinning] = useState(false)
  const [visible, setVisible] = useState(false)
  const [prize, setPrize] = useState('')

  const walletAddress = useWalletAddress()

  const click = () => {
    setPinning(true)
    audio.play()

    let wheel = document.getElementById('wheel')
    let container = document.getElementById('container')

    if (!container || !wheel) return

    const max = -20000
    const min = -10000
    let deg = Math.floor(Math.random() * (max - min + 1)) + min
    container.style.transform = 'rotate(' + deg + 'deg)'
    container.style.transition = '3s all'
    wheel.style.transform = 'rotate(' + deg + 'deg)'
    wheel.style.transition = '3s all'

    const tmp =
      Object.keys(VALUE)[Math.floor(Math.random() * Object.keys(VALUE).length)]
    setPrize(tmp)

    setTimeout(() => {
      if (!container || !wheel) return
      deg = VALUE[tmp] //Value selected
      container.style.transform = 'rotate(' + deg + 'deg)'
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
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <div className="ttt">
          <Image src={ARROW} id="stopper" preview={false} />
          <Image src={WHEEL} id="wheel" preview={false} />
          <div className="container" id="container">
            {Object.keys(VALUE).map((item) => {
              return (
                <div
                  key={item}
                  style={{
                    transform: `rotate(${-VALUE[item]}deg)`,
                  }}
                >
                  <Avatar size={64} shape="circle" src={MATERIAL[item]} />
                </div>
              )
            })}
          </div>
          <Button disabled={spinning} className="btn" onClick={click}>
            SPIN
          </Button>
        </div>
      </Col>
      <Modal visible={visible} onCancel={() => setVisible(false)} footer={null}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Typography.Title style={{ color: 'red' }} level={5}>
              Congrats: {util.shortenAddress(walletAddress)}
            </Typography.Title>
          </Col>
          <Col span={24}>
            Chúc mừng bạn đã trở thành Đại sứ thương hiệu cho Clear Men:
            <span style={{ color: '#FFBE45', textTransform: 'uppercase' }}>
              <Avatar size={128} shape="circle" src={MATERIAL[prize]} />
            </span>
          </Col>
        </Row>
      </Modal>
    </Row>
  )
}

export default Wheel
