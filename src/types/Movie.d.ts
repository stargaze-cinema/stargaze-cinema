import { Session } from './Session'
import { Category } from './Category'
import { Frame } from './Frame'
import { Producer } from './Producer'

export type Movie = {
    id: number
    title: string
    description?: string
    poster?: string
    duration: number
    year: number
    price: number
    category: Category
    producer: Producer
    sessions: Session[]
    frames: Frame[]
    created_at: string
    updated_at: string
}

export type UpdateMovie = {
    title?: string
    description?: string
    poster?: string
    duration?: number
    year?: number
    price?: number
    category_id?: number
    producer_id?: number
}
