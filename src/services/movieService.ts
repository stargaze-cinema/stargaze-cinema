import axios from 'axios'
import { getUserCookie } from './authService'
import { parseDates } from '@/utils/parseDates'
import type { Movie, UpdateMovie } from '@/types/Movie'

interface PaginatedMovies {
    paginator: {
        currentPage: number
        perPage: number
        totalPages: number
        totalItems: number
        nextPage: number
        prevPage: number
    }
    data: Movie[]
}

const user = getUserCookie()
const client = axios.create({
    baseURL: import.meta.env.APP_API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: user?.token as string,
    },
})

export const getMovies = async (params?: URLSearchParams) => {
    const res = await client.get('/movies', { params })

    return {
        paginator: res.data.paginator,
        data: parseDates(res.data.data),
    } as PaginatedMovies
}

export const getMovie = async (id: number | string) => {
    const res = await client.get('/movies/' + id)

    return parseDates(res.data) as Movie
}

export const createMovie = async (data: FormData) => {
    const res = await client.post('/movies', data)

    return parseDates(res.data) as Movie
}

export const updateMovie = async ({ id, data }: { id: number; data: UpdateMovie }) => {
    const res = await client.patch('/movies/' + id, data)

    return parseDates(res.data) as Movie
}

export const deleteMovie = async (id: number) => {
    const res = await client.delete('/movies/' + id)

    return res.data
}
