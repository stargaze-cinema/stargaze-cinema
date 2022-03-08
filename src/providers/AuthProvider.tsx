import { useState, createContext, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { User } from '@/types/User'

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

const AuthProvider = ({ children }: { children: JSX.Element }) => {
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

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const cookie = Cookies.get('user')

    if (!cookie) {
        return <Navigate to="/signin" replace />
    }

    return children
}

export const RequireAnon = ({ children }: { children: JSX.Element }) => {
    const cookie = Cookies.get('user')

    if (cookie) {
        return <Navigate to="/account" replace />
    }

    return children
}

export default AuthProvider
