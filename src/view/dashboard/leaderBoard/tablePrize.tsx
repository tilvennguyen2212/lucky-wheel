import { useEffect, useState } from 'react'
import { useWalletAddress, util } from '@sentre/senhub'

import { Image, Table, Typography } from 'antd'

import useTotalReward from 'hooks/leaderBoard/useTotalReward'
import { LIMIT } from 'constant'

import Rank01 from 'static/images/ranking/rank-1.svg'
import Rank02 from 'static/images/ranking/rank-2.svg'
import Rank03 from 'static/images/ranking/rank-3.svg'

type RewardAvailabelState = { authority: string; total: number }

const TablePrize = () => {
  const [rewards, setRewards] = useState<RewardAvailabelState[]>([])
  const { calculateTotalRewards, loading } = useTotalReward()
  const walletAddress = useWalletAddress()

  const getRankingIcon = (val: number) => {
    switch (val) {
      case 1:
        return <Image src={Rank01} preview={false} />
      case 2:
        return <Image src={Rank02} preview={false} />
      case 3:
        return <Image src={Rank03} preview={false} />

      default:
        return <Typography.Text>{val}</Typography.Text>
    }
  }
  const columns = [
    {
      title: 'NO.',
      dataIndex: 'index',
      render: (index: number) => getRankingIcon(index + 1),
    },
    {
      title: 'WALLLET ADDRESS',
      dataIndex: 'authority',
      key: 'authority',
      render: (authority: string) => (
        <Typography.Text className={authority === walletAddress ? 'owner' : ''}>
          {util.shortenAddress(authority)}
        </Typography.Text>
      ),
    },
    {
      title: 'PRIZE',
      dataIndex: 'total',
      key: 'total',
      render: (total: number) => (
        <Typography.Text>
          {util.numeric(total).format('0,0.[000]a$')}
        </Typography.Text>
      ),
    },
  ]

  useEffect(() => {
    ;(async () => {
      const rewards = await calculateTotalRewards()
      const filteredRewards = [...rewards].splice(0, LIMIT)

      const yourReward = rewards.find(
        ({ authority }) => authority === walletAddress,
      )
      if (!!yourReward && yourReward.index > LIMIT)
        filteredRewards.push({ ...yourReward })

      setRewards(filteredRewards)
    })()
  }, [calculateTotalRewards, walletAddress])

  return (
    <Table
      dataSource={rewards}
      columns={columns}
      pagination={false}
      rowKey={(record) => record.authority}
      loading={loading}
      className="center-index"
    />
  )
}

export default TablePrize
