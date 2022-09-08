import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TabId } from 'constant'

/**
 * Interface & Utility
 */

type Confetti = {
  gravity: number
  zIndex: string | number
  opacity: number
  numberOfPieces: number
}

export type MainState = {
  campaign: string
  confetti: Confetti
  tabId: TabId
}

/**
 * Store constructor
 */

const NAME = 'main'
const initialState: MainState = {
  campaign: '',
  confetti: {
    gravity: 0.008,
    zIndex: 'unset',
    opacity: 0.3,
    numberOfPieces: 50,
  },
  tabId: TabId.Spin,
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

export const setConfetti = createAsyncThunk<
  Partial<MainState>,
  { confetti: Confetti }
>(`${NAME}/setConfetti`, async ({ confetti }) => {
  return { confetti }
})

export const setTabId = createAsyncThunk<Partial<MainState>, { tabId: TabId }>(
  `${NAME}/setTabId`,
  async ({ tabId }) => {
    return { tabId }
  },
)

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
        setConfetti.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setTabId.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
