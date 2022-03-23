export type User = {
    id: number
    name: string
    email: string
    roles: 'User' | 'Administartor' | 'Moderator'
    created_at: string
    updated_at: string
    token: string
}
