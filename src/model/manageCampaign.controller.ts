import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

export type ManageCampaignState = {
  campaign: string
}

/**
 * Store constructor
 */

const NAME = 'manageCampaign'
const initialState: ManageCampaignState = {
  campaign: '',
}

/**
 * Actions
 */

export const setCampaign = createAsyncThunk<
  Partial<ManageCampaignState>,
  { campaign: string }
>(`${NAME}/setCampaign`, async ({ campaign }) => {
  return { campaign }
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
      setCampaign.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
