import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

export type MainState = {
  campaign: string
}

/**
 * Store constructor
 */

const NAME = 'main'
const initialState: MainState = {
  campaign: '',
}

/**
 * Actions
 */

export const setCampaign = createAsyncThunk<
  Partial<MainState>,
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
