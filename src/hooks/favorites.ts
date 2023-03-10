import * as React from 'react'

import { FavoriteContext } from 'contexts/favorites'
export const useFavorite = () => {
    const context = React.useContext(FavoriteContext)

    if (context === undefined) {
        throw new Error('useFavorite must be used within a FavoriteProvider')
    }

    return context
}
