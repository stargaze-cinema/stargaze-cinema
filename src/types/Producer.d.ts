import { Movie } from './Movie'

export type Producer = {
    id: number
    name: string
    movies: Movie[]
    created_at: string
    updated_at: string
}

export type UpdateProducer = {
    name: string
}
