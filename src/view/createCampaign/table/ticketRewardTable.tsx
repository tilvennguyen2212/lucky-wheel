import { BN } from '@project-serum/anchor'
import { useSelector } from 'react-redux'

import { MintAmount } from '@sen-use/app'
import RewardTable from './rewardTable'
import { Row, Typography } from 'antd'

import { useTicketByCampaign } from 'hooks/ticket/useTicketByCampaign'
import { AppState } from 'model'

const columns = [
  {
    title: 'Prize Amount',
    dataIndex: 'prizeAmount',
    key: 'prizeAmount',
    render: (prizeAmount: BN, data: any) => {
      console.log('du lieu trong cot peirxx', data, prizeAmount)
      return <MintAmount mintAddress={data.mint} amount={prizeAmount} />
    },
  },
  {
    title: 'Reserve Prize',
    dataIndex: 'reservePrize',
    key: 'reservePrize',
    render: (reservePrize: BN) => (
      <Typography>{reservePrize.toNumber()}</Typography>
    ),
  },

  {
    title: 'Ratio',
    dataIndex: 'ratio',
    key: 'ratio',
    render: (ratio: BN) => (
      <Typography.Text>
        {(Number(ratio.toString()) / 10 ** 18) * 100}%
      </Typography.Text>
    ),
  },
  {
    title: 'Action',
    dataIndex: 'campaign',
    key: 'campaign',
    render: (campaign: string) => <ColumnAction />,
  },
]

const ColumnAction = () => {
  return <Row></Row>
}

const TicketRewardTable = () => {
  const { campaign } = useSelector((state: AppState) => state.manageCampaign)
  const tickets = useTicketByCampaign(campaign)
  console.log('reward chua filter', tickets)
  const data: [] = []

  // TODO: pending
  // useMemo(() => {
  //   const ticketValues = Object.values(tickets)
  //   const prizeAmount = ticketValues.length
  //   const reservePrize = ticketValues.filter(
  //     (val) => !!val.state.initialized,
  //   ).length
  //   const ratio = toLuckyNumber

  //   return Object.values(tickets).map((val) => {
  //     return {
  //       prizeAmount: tickets.l,
  //     }
  //   })
  // }, [])
  console.log('reward da filter: ', data)
  return <RewardTable title={'Ticket Rewards'} columns={columns} data={data} />
}

export default TicketRewardTable
