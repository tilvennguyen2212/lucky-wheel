import { Fragment } from 'react'
import { Keypair, PublicKey } from '@solana/web3.js'

import { Button, Table } from 'antd'

import { SENTRE_CAMPAIGN } from 'constant'
import { notifySuccess } from 'helper'
import { useTicketByOwner } from 'hooks/ticket/useTicketByOwner'

const Reward = () => {
  const tickets = useTicketByOwner(SENTRE_CAMPAIGN)

  const initTicket = async () => {
    const TICKET = Keypair.generate()
    const { txId } = await window.luckyWheel.initializeTicket({
      campaign: new PublicKey(SENTRE_CAMPAIGN),
      ticket: TICKET,
      sendAndConfirm: true,
    })
    notifySuccess('Create Ticket', txId)
  }

  const columns = [
    {
      title: 'REWARD',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'AMOUNT',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'ACTIONS',
      dataIndex: 'address',
      key: 'address',
    },
  ]

  return (
    <Fragment>
      <Button onClick={initTicket}>New Ticket</Button>
      <Table dataSource={tickets} columns={columns} pagination={false} />
    </Fragment>
  )
}

export default Reward
