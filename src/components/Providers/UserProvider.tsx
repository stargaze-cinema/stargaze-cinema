import { useState, createContext, useContext } from 'react'
import type { ReactNode } from 'react'

const ProviderContext = createContext({})
export const useUser = () => useContext(ProviderContext)

interface Props {
    children: ReactNode
}

type User = {
    id?: number
    name?: string
    email?: string
}

const UserProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>({
        id: 0,
        name: '',
        email: '',
    })

    const userHandler = (value: User) => {
        value
            ? setUser({
                  ...user,
                  ...value,
              })
            : setUser(null)
    }

    return (
        <>
            <ProviderContext.Provider
                value={{
                    user,
                    setUser: userHandler,
                }}
            >
                {children}
            </ProviderContext.Provider>
        </>
    )
}

export default UserProvider
