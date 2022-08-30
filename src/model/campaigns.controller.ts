import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CampaignData } from 'lucky-wheel-core'

/**
 * Interface & Utility
 */

export type CampaignState = Record<string, CampaignData>

/**
 * Store constructor
 */

const NAME = 'campaigns'
const initialState: CampaignState = {}

/**
 * Actions
 */

export const intCampaign = createAsyncThunk(`${NAME}/intCampaign`, async () => {
  let bulk: CampaignState = {}
  const { account } = window.luckyWheel.program
  const campaigns = await account.campaign.all()
  for (const { publicKey, account: campaignData } of campaigns) {
    const address = publicKey.toBase58()
    bulk[address] = campaignData
  }
  return bulk
})

/**
 * Usual procedure
 */

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder.addCase(
      intCampaign.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
