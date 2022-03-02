export type Movie = {
    category: { id: number; name: string }
    created_at: string
    description: string
    duration: number
    id: number
    poster?: string
    price: number
    producer: { id: number; name: string }
    title: string
    updated_at: string
    year: number
}
