import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { account } from '@senswap/sen-js'
import { RewardData } from '@sentre/lucky-wheel-core'

/**
 * Interface & Utility
 */

export type RewardState = Record<string, RewardData>

/**
 * Store constructor
 */

const NAME = 'rewards'
const initialState: RewardState = {}

/**
 * Actions
 */

export const initRewards = createAsyncThunk(
  `${NAME}/initRewards`,
  async (bulk: RewardState) => {
    return bulk
  },
)

export const upsetReward = createAsyncThunk<
  RewardState,
  { address: string; data: RewardData },
  { state: any }
>(`${NAME}/upsetReward`, async ({ address, data }) => {
  if (!account.isAddress(address)) throw new Error('Invalid reward address')
  if (!data) throw new Error('Data is empty')
  return { [address]: data }
})

export const getReward = createAsyncThunk<
  RewardState,
  { address: string },
  { state: any }
>(`${NAME}/getReward`, async ({ address }, { getState }) => {
  const {
    rewards: { [address]: data },
  } = getState()
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
      .addCase(initRewards.fulfilled, (state, { payload }) => payload)
      .addCase(
        upsetReward.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
