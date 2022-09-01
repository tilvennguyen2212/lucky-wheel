import { useTicket } from './../ticket/useTicket'
import { useSelector } from 'react-redux'

import { AppState } from 'model'

export const useRewardByTicket = (ticketAddress: string) => {
  const ticket = useTicket(ticketAddress)
  const reward = useSelector(
    (state: AppState) => state.rewards[ticket.reward.toBase58()],
  )
  return reward
}
