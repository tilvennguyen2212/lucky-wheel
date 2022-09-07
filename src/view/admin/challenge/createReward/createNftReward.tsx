import { Fragment, useState } from 'react'
import { BN } from '@project-serum/anchor'
import { REWARD_TYPE } from '@sentre/lucky-wheel-core'

import { AvatarNFT } from '@sen-use/components'
import { Button, Col, InputNumber, Modal, Row, Space, Typography } from 'antd'
import NftCollection from '../deposit/nftCollection'

import { useCreateChallengeReward } from 'hooks/challengeReward/useCreateChallengeReward'

const CreateNFTReward = ({ campaignAddress }: { campaignAddress: string }) => {
  const [visible, setVisible] = useState(false)
  const [ratio, setRatio] = useState('0')
  const [collection, setCollection] = useState('')
  const { createChallengeReward, loading } = useCreateChallengeReward()

  const onCreate = async () => {
    await createChallengeReward({
      totalPicked: new BN(1),
      campaign: campaignAddress,
      rewardMint: collection,
      rewardType: REWARD_TYPE.nftCollection,
      amount: new BN(1),
    })
  }

  return (
    <Fragment>
      <Button block type="primary" onClick={() => setVisible(true)}>
        Add New
      </Button>
      <Modal
        title="Create NFT Reward"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={onCreate}
        confirmLoading={loading}
      >
        <Row gutter={[24, 24]}>
          <Col span={10}>
            <Typography.Text>Prize Amount :</Typography.Text>
          </Col>
          <Col span={14}>
            <Typography.Text>1 NFT</Typography.Text>
          </Col>
          <Col span={10}>
            <Typography.Text>Ratio (%) :</Typography.Text>
          </Col>
          <Col span={14}>
            <InputNumber
              style={{ width: '100%' }}
              min="0"
              max="100"
              value={ratio}
              onChange={(val) => setRatio(val)}
            />
          </Col>
          <Col span={10}>
            <Typography.Text>Collection :</Typography.Text>
          </Col>
          <Col span={14}>
            <Space direction="vertical">
              <NftCollection setCollection={setCollection} />
              {collection && <AvatarNFT mintAddress={collection} />}
            </Space>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default CreateNFTReward
