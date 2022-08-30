import { Table } from 'antd'

const Reward = () => {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ]

  const columns = [
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'AGE',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'ADDRESS',
      dataIndex: 'address',
      key: 'address',
    },
  ]

  return <Table dataSource={dataSource} columns={columns} pagination={false} />
}

export default Reward
