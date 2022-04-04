import { Hall } from './Hall'
import { Movie } from './Movie'

export type Session = {
    id: number
    begin_at: string
    end_at: string
    movie: Movie
    hall: Hall
    created_at: string
    updated_at: string
}

export type UpdateSession = {
    begin_at: string
    end_at: string
    movie_id: number
    hall_id: number
}
