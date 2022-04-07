import { Entity } from './Entity'
import { Movie } from './Movie'

export interface Category extends Entity {
    name: string
    movies: Movie[]
}

export type UpdateCategory = {
    name: string
}
