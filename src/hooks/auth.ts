import * as React from 'react'

import { AuthContext } from 'contexts/auth'
export const useAuth = () => {
    const context = React.useContext(AuthContext)

    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider')
    }

    return context
}
