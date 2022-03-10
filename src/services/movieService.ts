import axios from 'axios'
import { getUserCookie } from './authService'
import type { Movie, PostMovie, UpdateMovie } from '@/types/Movie'

const user = getUserCookie()
const client = axios.create({
    baseURL: import.meta.env.APP_API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: user?.token as string,
    },
})

export const getMovies = async () => {
    const res = await client.get('/movies')

    return res.data as Movie[]
}

export const getMovie = async (id: number) => {
    const res = await client.get('/movies/' + id)

    return res.data as Movie
}

export const createMovie = async (data: PostMovie) => {
    const res = await client.post('/movies', data)

    return res.data
}

export const updateMovie = async ({ id, data }: { id: number; data: UpdateMovie }) => {
    const res = await client.patch('/movies/' + id, data)

    return res.data
}

export const deleteMovie = async (id: number) => {
    const res = await client.delete('/movies/' + id)

    return res.data
}
