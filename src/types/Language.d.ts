import { Entity } from './Entity'
import { Movie } from './Movie'

export interface Language extends Entity {
    name: string
    code: string
    native_name: string
    movies: Movie[]
}

export type UpdateLanguage = {
    name?: string
    code?: string
    native_name?: string
}
