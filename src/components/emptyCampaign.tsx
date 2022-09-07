import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'

import { Result, Row, Col } from 'antd'
import CreateCampaign from 'view/admin/header/createCampaign'

import { AppState } from 'model'

const EmptyCampaign: React.FC<{ campaignAddress: string }> = ({
  children,
  campaignAddress,
}) => {
  const campaignData = useSelector(
    (state: AppState) => state.campaigns[campaignAddress],
  )

  if (!campaignData)
    return (
      <Row justify="center">
        <Col>
          <Result
            status="403"
            title="Not Found Campaign"
            subTitle="Sorry, we not found campaign."
            extra={<CreateCampaign />}
          />
        </Col>
      </Row>
    )

  return <Fragment>{children}</Fragment>
}

export default EmptyCampaign
