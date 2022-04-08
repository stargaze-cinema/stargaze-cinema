import { axiosClient } from '@/utils/axiosClient'
import { parseDates } from '@/utils/parseDates'
import type { Category, UpdateCategory } from '@/types/Category'

export const getCategories = async () => {
    const res = await axiosClient.get('/categories')

    return parseDates(res.data) as Category[]
}

export const getCategory = async (id: number | string) => {
    const res = await axiosClient.get('/categories/' + id)

    return parseDates(res.data) as Category
}

export const createCategory = async (data: FormData) => {
    const res = await axiosClient.post('/categories', data)

    return parseDates(res.data) as Category
}

export const updateCategory = async ({ id, data }: { id: number; data: UpdateCategory }) => {
    const res = await axiosClient.patch('/categories/' + id, data)

    return parseDates(res.data) as Category
}

export const deleteCategory = async (id: number) => {
    const res = await axiosClient.delete('/categories/' + id)

    return res.data
}
