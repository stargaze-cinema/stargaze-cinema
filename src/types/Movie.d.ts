import { Session } from './Session'
import { Category } from './Category'
import { Frame } from './Frame'
import { Producer } from './Producer'
import { Entity } from './Entity'

export interface Movie extends Entity {
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
