import { Entity } from './Entity'
import { Movie } from './Movie'

export interface Producer extends Entity {
    name: string
    movies: Movie[]
}

export type UpdateProducer = {
    name: string
}
