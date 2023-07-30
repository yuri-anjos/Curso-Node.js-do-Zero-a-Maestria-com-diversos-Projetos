import { createContext } from 'react'
import useAuth from '../hooks/useAuth'

const UserContext = createContext()

function UserProvider({ children }) {
    const { register, authenticated, logout, login } = useAuth()

    return (
        <UserContext.Provider value={{ register, authenticated, logout, login }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }