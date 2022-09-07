import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { account } from '@senswap/sen-js'
import { ChallengeRewardReceiptData } from '@sentre/lucky-wheel-core'

/**
 * Interface & Utility
 */

export type ChallengeReceiptState = Record<string, ChallengeRewardReceiptData>

/**
 * Store constructor
 */

const NAME = 'ChallengeReceipt'
const initialState: ChallengeReceiptState = {}

/**
 * Actions
 */

export const initChallengeReceipts = createAsyncThunk(
  `${NAME}/initChallengeReceipts`,
  async (bulk: ChallengeReceiptState) => {
    return bulk
  },
)

export const upsetChallengeReceipt = createAsyncThunk<
  ChallengeReceiptState,
  { address: string; data: ChallengeRewardReceiptData },
  { state: any }
>(`${NAME}/upsetChallengeReceipt`, async ({ address, data }) => {
  if (!account.isAddress(address)) throw new Error('Invalid receipt address')
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
      .addCase(initChallengeReceipts.fulfilled, (state, { payload }) => payload)
      .addCase(
        upsetChallengeReceipt.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
