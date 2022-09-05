import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

export type MainState = {
  campaign: string
  congratulate: boolean
}

/**
 * Store constructor
 */

const NAME = 'main'
const initialState: MainState = {
  campaign: '',
  congratulate: false,
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

export const setCongratulate = createAsyncThunk<
  Partial<MainState>,
  { congratulate: boolean }
>(`${NAME}/setCongratulate`, async ({ congratulate }) => {
  return { congratulate }
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
        setCampaign.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setCongratulate.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
