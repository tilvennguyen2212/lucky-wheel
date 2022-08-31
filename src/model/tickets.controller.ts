import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { account } from '@senswap/sen-js'
import { TicketData } from '@sentre/lucky-wheel-core'

/**
 * Interface & Utility
 */

export type TicketState = Record<string, TicketData>

/**
 * Store constructor
 */

const NAME = 'tickets'
const initialState: TicketState = {}

/**
 * Actions
 */

export const initTickets = createAsyncThunk(
  `${NAME}/initTickets`,
  async (bulk: TicketState) => {
    return bulk
  },
)

export const upsetTicket = createAsyncThunk<
  TicketState,
  { address: string; data: TicketData },
  { state: any }
>(`${NAME}/upsetTicket`, async ({ address, data }) => {
  if (!account.isAddress(address)) throw new Error('Invalid reward address')
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
      .addCase(initTickets.fulfilled, (state, { payload }) => payload)
      .addCase(
        upsetTicket.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
