import { Movie } from './Movie'

export type Frame = {
    id: number
    image: string
    movie: Movie
    created_at: string
    updated_at: string
}
