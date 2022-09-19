import { useMemo } from 'react'
import { util } from '@sentre/senhub'

import { Image, Table, Typography } from 'antd'

import { useSelectedCampaign } from 'hooks/useSelectedCampaign'
import { useLotteryInfo } from 'hooks/useLotteryInfo'

import Rank01 from 'static/images/ranking/rank-1.svg'
import Rank02 from 'static/images/ranking/rank-2.svg'
import Rank03 from 'static/images/ranking/rank-3.svg'

const LIMIT = 10

const TableSpin = () => {
  const selectedCampaign = useSelectedCampaign()
  const { getListLotteryData } = useLotteryInfo(selectedCampaign)
  const listLottery = getListLotteryData()

  const filteredLotteries = useMemo(() => {
    listLottery.sort(
      (a, b) => b.totalPicked.toNumber() - a.totalPicked.toNumber(),
    )
    const nextData = []
    let index = 0
    for (const { authority, totalPicked } of listLottery) {
      if (nextData.length >= LIMIT) break
      index++
      nextData.push({
        index,
        authority: authority.toBase58(),
        totalPicked: totalPicked.toNumber(),
      })
    }

    return nextData
  }, [listLottery])

  const getRankingIcon = (val: number) => {
    if (!val) return 0
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
      render: (index: number) => getRankingIcon(index),
    },
    {
      title: 'WALLLET ADDRESS',
      dataIndex: 'authority',
      key: 'authority',
      render: (authority: string) => (
        <Typography.Text>{util.shortenAddress(authority)}</Typography.Text>
      ),
    },
    {
      title: 'Spin',
      dataIndex: 'totalPicked',
      key: 'totalPicked',
      render: (totalPicked: number) => (
        <Typography.Text>{totalPicked}</Typography.Text>
      ),
    },
  ]

  return (
    <Table
      dataSource={filteredLotteries}
      columns={columns}
      pagination={false}
      rowKey={(record) => record.authority}
      className="center-index"
    />
  )
}

export default TableSpin
