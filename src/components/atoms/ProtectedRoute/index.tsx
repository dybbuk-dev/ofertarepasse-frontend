/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from 'hooks/auth'
import { Navigate } from 'react-router-dom'

interface IProtectedRoute {
    role: Array<'user' | 'admin' | 'intermediary'>
    children: React.ReactNode
}

const ProtectedRoute = ({ role, children }: IProtectedRoute): any => {
    const { user } = useAuth()

    if (!user || !role.find((item) => user.roles === item)) {
        return <Navigate to='/' />
    }

    return children
}

export default ProtectedRoute
