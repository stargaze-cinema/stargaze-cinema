import { Movie } from './Movie'

export type Category = {
    id: number
    name: string
    movies: Movie[]
    created_at: string
    updated_at: string
}

export type UpdateCategory = {
    name: string
}
