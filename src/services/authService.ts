import Cookies from 'js-cookie'
import type { User } from '@/types/User'

export const getUserCookie = () => {
    const cookie = Cookies.get('user')
    if (!cookie) return null
    return JSON.parse(cookie) as User
}
