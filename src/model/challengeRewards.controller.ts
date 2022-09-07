import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { account } from '@senswap/sen-js'
import { ChallengeRewardData } from '@sentre/lucky-wheel-core'

/**
 * Interface & Utility
 */

export type ChallengeRewardState = Record<string, ChallengeRewardData>

/**
 * Store constructor
 */

const NAME = 'challengeReward'
const initialState: ChallengeRewardState = {}

/**
 * Actions
 */

export const initChallengeRewards = createAsyncThunk(
  `${NAME}/initChallengeRewards`,
  async (bulk: ChallengeRewardState) => {
    return bulk
  },
)

export const upsetChallengeReward = createAsyncThunk<
  ChallengeRewardState,
  { address: string; data: ChallengeRewardData },
  { state: any }
>(`${NAME}/upsetChallengeReward`, async ({ address, data }) => {
  if (!account.isAddress(address)) throw new Error('Invalid reward address')
  if (!data) throw new Error('Data is empty')
  return { [address]: data }
})

export const getChallengeReward = createAsyncThunk<
  ChallengeRewardState,
  { address: string },
  { state: any }
>(`${NAME}/getChallengeReward`, async ({ address }, { getState }) => {
  const {
    challengeRewards: { [address]: data },
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
      .addCase(initChallengeRewards.fulfilled, (state, { payload }) => payload)
      .addCase(
        upsetChallengeReward.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
