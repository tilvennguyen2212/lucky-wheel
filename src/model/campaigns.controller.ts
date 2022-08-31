import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { account } from '@senswap/sen-js'
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

export const intCampaign = createAsyncThunk(
  `${NAME}/intCampaign`,
  async (bulk: CampaignState) => {
    return bulk
  },
)

export const upsetCampaign = createAsyncThunk<
  CampaignState,
  { address: string; data: CampaignData },
  { state: any }
>(`${NAME}/upsetCampaign`, async ({ address, data }) => {
  if (!account.isAddress(address)) throw new Error('Invalid campaign address')
  if (!data) throw new Error('Data is empty')
  return { [address]: data }
})

/**
 * Usual procedure
 */

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder
      .addCase(
        intCampaign.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        upsetCampaign.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
