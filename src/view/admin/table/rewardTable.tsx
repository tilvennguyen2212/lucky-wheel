import { Col, Row, Table, Typography } from 'antd'

type RewardTableProps = {
  title: string
  columns: any[]
  data: any[]
}

const RewardTable = ({ title, columns, data }: RewardTableProps) => {
  return (
    <Row justify="center">
      <Col xs={24} lg={16}>
        <Table
          className="reward"
          key={title}
          title={() => (
            <Row justify="center">
              <Col>
                <Typography.Title level={5} style={{ fontWeight: 'bold' }}>
                  {title}
                </Typography.Title>
              </Col>
            </Row>
          )}
          columns={columns}
          dataSource={data}
          bordered={false}
          pagination={false}
          style={{ width: '100%' }}
        />
      </Col>
    </Row>
  )
}

export default RewardTable
