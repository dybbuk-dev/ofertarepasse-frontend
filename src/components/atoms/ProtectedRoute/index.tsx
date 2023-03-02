/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from 'hooks/auth'
import { Navigate } from 'react-router-dom'

interface IProtectedRoute {
    role: 'user' | 'admin'
    children: React.ReactNode
}

const ProtectedRoute = ({ role, children }: IProtectedRoute): any => {
    const { user } = useAuth()

    if (!user || user.roles !== role) {
        return <Navigate to='/' />
    }

    return children
}

export default ProtectedRoute
