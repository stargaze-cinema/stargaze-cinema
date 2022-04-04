export type Hall = {
    id: number
    name: string
    capacity: number
    type: '2D' | '3D' | '4DX' | '5D'
    created_at: string
    updated_at: string
}

export type UpdateHall = {
    name?: string
    capacity?: number
    type?: '2D' | '3D' | '4DX' | '5D'
}
