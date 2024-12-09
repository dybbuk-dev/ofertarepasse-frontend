/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
// import Fiat from 'assets/images/fiat.png'
// import Ford from 'assets/images/ford.png'
// import Nissan from 'assets/images/nissan.png'
// import Volks from 'assets/images/volks.png'
// import Toyota from 'assets/images/toyota.png'
import {
    // Link,
    useNavigate,
} from 'react-router-dom'
import api from 'services/api'

interface ISearch extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: React.InputHTMLAttributes<HTMLInputElement>['className']
    onChange?: (e: any) => void
}

interface ISearches {
    id: string
    text: string
    access: number
}

const Search = ({ className, onChange, ...props }: ISearch) => {
    const [focused, setFocused] = React.useState(false)
    const [popularSearches, setPopularSearches] = React.useState<Array<ISearches> | null>(null)
    const [sugestions, setSugestions] = React.useState<Array<ISearches> | null>(null)

    const navigate = useNavigate()

    // const brands = [Fiat, Toyota, Ford, Volks, Nissan]

    const updateAccessSearch = async (id: string) => {
        await api.patch(`/api/v1/researches/${id}`)
    }

    const getPopularSearches = async () => {
        const { data } = await api.get('/api/v1/researches?limit=10')

        if (data) {
            setPopularSearches(data)
        }
    }

    const getResearches = async (value: string) => {
        const { data } = await api.get(`/api/v1/researches?limit=4&search=${value}`)

        setSugestions(data)
    }

    React.useEffect(() => {
        getPopularSearches()
    }, [])

    return (
        <div className='relative w-full px-8'>
            <input
                className={`w-full bg-transparent text-xs outline-none placeholder:text-gray-500 sm:text-sm md:text-base ${className}`}
                onFocus={() => {
                    getResearches('')
                    setFocused(true)
                }}
                onBlur={() => setTimeout(() => setFocused(false), 100)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        navigate(`/estoque?title=${props.value}`)
                    }
                }}
                onChange={(e) => {
                    getResearches(e.target.value)

                    if (onChange) {
                        onChange(e)
                    }
                }}
                {...props}
            />
            <div
                className={`ease absolute top-full left-0 mt-4 w-full overflow-hidden  rounded-b-xl bg-white shadow-lg duration-200 ${
                    focused ? 'block' : 'hidden'
                }`}
            >
                {sugestions ? (
                    <div className='flex flex-col gap-2 border-y border-gray-700 px-6 py-4'>
                        {sugestions.map((item, index) => (
                            <button
                                key={index}
                                className='!w-max'
                                onClick={() => {
                                    updateAccessSearch(item.id)
                                    navigate(`/estoque?title=${item.text}`)
                                }}
                            >
                                <span className='font-medium text-gray-500'>{item.text}</span>
                            </button>
                        ))}
                    </div>
                ) : null}
                {popularSearches ? (
                    <div className='flex flex-col gap-2 p-6'>
                        <p className='text-lg font-medium text-gray-100'>Buscas Populares</p>
                        <div className='flex flex-wrap items-center gap-2'>
                            {popularSearches.map((item, index) => (
                                <button
                                    key={index}
                                    className='rounded-full border border-gray-600 px-3 py-1 text-gray-400'
                                    onClick={() => {
                                        updateAccessSearch(item.id)
                                        navigate(`/estoque?title=${item.text}`)
                                    }}
                                >
                                    {item.text}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : null}
                {/* <div className='flex flex-col gap-2 border-b border-gray-700 p-6'>
                    <p className='text-lg font-medium text-gray-100'>Marcas sugeridas</p>
                    <div className='flex flex-wrap items-center gap-2'>
                        {brands.map((item, index) => (
                            <Link to='#' key={index}>
                                <img
                                    src={item}
                                    alt='marca sugerida'
                                    className='w-[120px] object-contain'
                                />
                            </Link>
                        ))}
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Search
