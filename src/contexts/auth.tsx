/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import api from 'services/api'
import { toast } from 'react-toastify'

export interface IUser {
    id: string
    name: string
    image: string | null
    email: string
    phone: string | null
    type: string
    cpf: string | null
    cnpj: string | null
    cep: string | null
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
    handleAuthGoogle: (credential: string) => void
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

    const handleAuthGoogle = async (credencial: any) => {
        try {
            const { data } = await api.post('/api/auth/google', { credencial })

            localStorage.setItem(
                'ofertarepasse@user',
                JSON.stringify({ token: data.token, id: data.id })
            )
            setUser(data)
            setIsAuthenticated(true)
            window.location.href = '/'
        } catch (err: any) {
            toast.error('Erro ao tentar se autenticar com o google')
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

                    setUser(data)
                    setIsAuthenticated(true)
                }
            } catch (err) {
                localStorage.removeItem('ofertarepasse@user')
            }
        }

        checkToken()
    }, [])

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, signIn, signOut, setIsAuthenticated, handleAuthGoogle }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
