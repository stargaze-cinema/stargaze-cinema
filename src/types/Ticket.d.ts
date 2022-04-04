import { Session } from './Session'
import { User } from './User'

export type Ticket = {
    id: number
    place: number
    user: User
    session: Session
    created_at: string
    updated_at: string
}

export type UpdateTicket = {
    place?: number
    user_id?: number
    session_id?: number
}
