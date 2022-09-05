import { Fragment, useState } from 'react'
import { BN } from '@project-serum/anchor'
import { REWARD_TYPE } from '@sentre/lucky-wheel-core'

import { AvatarNFT } from '@sen-use/components'
import { Button, Col, InputNumber, Modal, Row, Space, Typography } from 'antd'
import NftCollection from '../deposit/nftCollection'

import { useCreateReward } from 'hooks/admin/useCreateReward'

const CreateNFTReward = ({ campaignAddress }: { campaignAddress: string }) => {
  const [visible, setVisible] = useState(false)
  const [ratio, setRatio] = useState('0')
  const [collection, setCollection] = useState('')
  const { createReward, loading } = useCreateReward()

  const onCreate = async () => {
    await createReward({
      prizeAmount: new BN(1),
      campaign: campaignAddress,
      rewardMint: collection,
      ratio: Number(ratio),
      rewardType: REWARD_TYPE.nftCollection,
    })
  }

  return (
    <Fragment>
      <Button block type="primary" onClick={() => setVisible(true)}>
        Add New
      </Button>
      <Modal
        title="Create Token Reward"
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
