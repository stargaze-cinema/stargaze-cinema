import { useState, createContext, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import type { User } from '@/types/User'

const AuthContext = createContext<AuthContextType>(null!)
export const useAuth = () => useContext(AuthContext)

interface AuthContextType {
    user: CookieUser | null
    signIn: SignIn
    signOut: SignOut
}

type CookieUser = {
    id: number
    name: string
    email: string
    token: string
}

interface SignIn {
    (user: CookieUser | User, token: string, ttl?: number): void
}

interface SignOut {
    (): void
}

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<CookieUser | null>(
        Cookies.get('user') && JSON.parse(Cookies.get('user') as string)
    )

    const signIn: SignIn = (user, token, ttl) => {
        const userCombined = {
            ...user,
            token: `Bearer ${token}`,
        }
        Cookies.set('user', JSON.stringify(userCombined), {
            expires: ttl,
            sameSite: 'strict',
        })
        setUser(userCombined)
    }

    const signOut: SignOut = () => {
        Cookies.remove('user')
        setUser(null)
    }

    return (
        <>
            <AuthContext.Provider
                value={{
                    user,
                    signIn,
                    signOut,
                }}
            >
                {children}
            </AuthContext.Provider>
        </>
    )
}

export const RequireAuth: React.FC = ({ children }) => {
    const cookie = Cookies.get('user')

    if (!cookie) {
        return <Navigate to="/signin" replace />
    }

    return <>{children}</>
}

export const RequireAnon: React.FC = ({ children }) => {
    const cookie = Cookies.get('user')

    if (cookie) {
        return <Navigate to="/account" replace />
    }

    return <>{children}</>
}
