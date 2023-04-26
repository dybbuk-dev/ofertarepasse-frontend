/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAdvert } from 'components/organisms/Dashboard/Adverts'
import { useAuth } from 'hooks/auth'
import * as React from 'react'
import { toast } from 'react-toastify'
import api from 'services/api'

interface IFavorite {
    id: string
    advert: IAdvert
}

interface IFavoriteProvider {
    children: React.ReactNode
}

interface IFavoriteContext {
    favorites: Array<IFavorite>
    addFavorite: (advertId: string) => Promise<void>
    removeFavorite: (id: string) => Promise<void>
    isFavorited: (advertId: string) => IFavorite | undefined
}

export const FavoriteContext = React.createContext({} as IFavoriteContext)

const FavoriteProvider: React.FC<IFavoriteProvider> = ({ children }) => {
    const [favorites, setFavorites] = React.useState<Array<IFavorite>>([])
    const { user } = useAuth()

    const getFavorites = async () => {
        try {
            const { data } = await api.get(`/api/v1/favorites/${user?.id}`)

            if (data) {
                setFavorites(data.items)
            }
        } catch (err) {
            toast.error('Algo deu error ao trazer seus favoritos')
        }
    }

    React.useEffect(() => {
        if (user) getFavorites()
    }, [user])

    const isFavorited = (advertId: string) => {
        return favorites.find((item) => item.advert.id === advertId)
    }

    const addFavorite = async (advertId: string) => {
        if (user) {
            try {
                await api.post('/api/v1/favorites', {
                    user: user.id,
                    advert: advertId,
                })

                getFavorites()
            } catch (err) {
                toast.error('Erro ao adicionar aos favoritos')
            }
        } else {
            toast.error('Você precisa estar logado para adicionar esse anúncio aos seus favoritos')
        }
    }

    const removeFavorite = async (id: string) => {
        try {
            await api.delete(`/api/v1/favorites/${id}`)

            setFavorites(favorites.filter((item) => item.id !== id))
        } catch (err) {
            toast.error('Erro ao remover esse item dos favoritos')
        }
    }

    return (
        <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorited }}>
            {children}
        </FavoriteContext.Provider>
    )
}

export default FavoriteProvider
