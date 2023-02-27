/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import api from 'services/api'

interface IUser {
    id: string
    name: string
    email: string
    phone: string | null
    type: string
    roles: string
    status: string
    dateOfBirth: Date | null
    created_at: Date
    updated_at: Date
    token: string
}

interface IAuthProvider {
    children: React.ReactNode
}

interface IAuthContext {
    user: IUser | null
    isAuthenticated: boolean
    signIn: (email: string, password: string) => Promise<{ error: boolean; message?: string }>
    signOut: () => void
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
    // loading: boolean
}

export const AuthContext = React.createContext({} as IAuthContext)

const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
    const [user, setUser] = React.useState<IUser | null>(null)
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false)
    // const [loading, setLoading] = React.useState<boolean>(true)

    const signIn = async (email: string, password: string) => {
        const { data } = await api.post('/api/auth/login', {
            email,
            password,
        })

        if (data && data.error) {
            return {
                error: true,
                message: data.message,
            }
        } else {
            localStorage.setItem(
                'ofertarepasse@user',
                JSON.stringify({ token: data.token, id: data.id })
            )
            setUser(data)
            setIsAuthenticated(true)

            return {
                error: false,
            }
        }
    }

    const signOut = async () => {
        localStorage.removeItem('ofertarepasse@user')
        setUser(null)
        setIsAuthenticated(false)
    }

    React.useEffect(() => {
        const checkToken = async () => {
            try {
                let user: any = localStorage.getItem('ofertarepasse@user')

                if (user) {
                    user = JSON.parse(user)
                    const { data } = await api.get(`/api/v1/users/${user.id}`)

                    if (data && !data.error) {
                        setUser(data.user)
                        setIsAuthenticated(true)
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }

        checkToken()
    }, [])

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, signIn, signOut, setIsAuthenticated }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
