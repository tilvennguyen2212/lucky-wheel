import { util } from '@sentre/senhub'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { LotteryInfoData } from '@sentre/lucky-wheel-core'

/**
 * Interface & Utility
 */

export type LotteryInfoState = Record<string, LotteryInfoData>

/**
 * Store constructor
 */

const NAME = 'lotteryInfo'
const initialState: LotteryInfoState = {}

/**
 * Actions
 */

export const initLotteryInfo = createAsyncThunk(
  `${NAME}/initLotteryInfo`,
  async (bulk: LotteryInfoState) => {
    return bulk
  },
)

export const upsetLotteryInfo = createAsyncThunk<
  LotteryInfoState,
  { address: string; data: LotteryInfoData },
  { state: any }
>(`${NAME}/upsetLotteryInfo`, async ({ address, data }) => {
  if (!util.isAddress(address)) throw new Error('Invalid Lottery Info address')
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
        initLotteryInfo.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        upsetLotteryInfo.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
