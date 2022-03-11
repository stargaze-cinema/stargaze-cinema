export type Movie = {
    id: number
    title: string
    description?: string
    poster?: string
    duration: number
    year: number
    price: number
    category: { id: number; name: string }
    producer: { id: number; name: string }
    created_at: string
    updated_at: string
}

type PostMovie = {
    title: string
    description?: string
    poster?: string
    duration: number
    year: number
    price: number
    category: string
    producer: string
}

export type UpdateMovie = {
    title?: string
    description?: string
    poster?: string
    duration?: number
    year?: number
    price?: number
    category?: string
    producer?: string
}
