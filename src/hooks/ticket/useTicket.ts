import { useSelector } from 'react-redux'

import { AppState } from 'model'

export const useTicket = (ticketAddress: string) => {
  const ticket = useSelector((state: AppState) => state.tickets[ticketAddress])
  return ticket
}
