import { configureStore } from '@reduxjs/toolkit'
import { devTools, bigintSerializationMiddleware } from 'model/devTools'

import main from 'model/main.controller'
import campaigns from 'model/campaigns.controller'
import rewards from 'model/rewards.controller'
import tickets from 'model/tickets.controller'
import lotteryInfos from 'model/lotteryInfo.controller'
import manageCampaign from 'model/manageCampaign.controller'

/**
 * Isolated store
 */
const model = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(bigintSerializationMiddleware),
  devTools: devTools(process.env.REACT_APP_ID as string),
  reducer: {
    main,
    campaigns,
    rewards,
    tickets,
    lotteryInfos,
    manageCampaign,
  },
})

export type AppState = ReturnType<typeof model.getState>
export type AppDispatch = typeof model.dispatch
export default model
