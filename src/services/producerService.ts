import { axiosClient } from '@/utils/axiosClient'
import { parseDates } from '@/utils/parseDates'
import type { Producer, UpdateProducer } from '@/types/Producer'

export const getProducers = async () => {
    const res = await axiosClient.get('/producers')

    return parseDates(res.data) as Producer[]
}

export const getProducer = async (id: number | string) => {
    const res = await axiosClient.get('/producers/' + id)

    return parseDates(res.data) as Producer
}

export const createProducer = async (data: FormData) => {
    const res = await axiosClient.post('/producers', data)

    return parseDates(res.data) as Producer
}

export const updateProducer = async ({ id, data }: { id: number; data: UpdateProducer }) => {
    const res = await axiosClient.patch('/producers/' + id, data)

    return parseDates(res.data) as Producer
}

export const deleteProducer = async (id: number) => {
    const res = await axiosClient.delete('/producers/' + id)

    return res.data
}
