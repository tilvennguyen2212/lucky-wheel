import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TabId } from 'constant'

export const CONFETTI_CONGRATS = {
  gravity: 0.5,
  opacity: 1,
  zIndex: 9999,
  numberOfPieces: 200,
}

export const CONFETTI_DEFAULT = {
  gravity: 0.008,
  opacity: 0.3,
  zIndex: 'unset',
  numberOfPieces: 50,
}

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
  confetti: CONFETTI_DEFAULT,
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
