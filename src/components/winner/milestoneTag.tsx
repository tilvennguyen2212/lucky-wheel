import { useCallback } from 'react'
import { BN } from '@project-serum/anchor'

import { Tag } from 'antd'

import { useMilestoneByCampaign } from 'hooks/challengeReward/useMilestoneByCampaign'
import { useSelectedCampaign } from 'hooks/useSelectedCampaign'

const TAG_COLOR = ['#B9F8FD', '#708FFF', '#A0E86F', '#FF9470', '#FFD970']

type MilestoneTagProps = { value?: BN }
const MilestoneTag = ({ value = new BN(0) }: MilestoneTagProps) => {
  const campaignSelected = useSelectedCampaign()
  const { getMilestoneCampaign } = useMilestoneByCampaign(campaignSelected)
  const processes = getMilestoneCampaign()

  const getColor = useCallback(() => {
    let i = 0
    for (const milestone of processes) {
      if (!value.gt(milestone)) break
      i++
    }
    const idxColor = i > TAG_COLOR.length - 1 ? TAG_COLOR.length - 1 : i
    return TAG_COLOR[idxColor]
  }, [processes, value])

  const color = getColor()

  return (
    <Tag style={{ color, background: `${color}33`, margin: 0, border: 'none' }}>
      {value.toNumber()}
    </Tag>
  )
}

export default MilestoneTag
