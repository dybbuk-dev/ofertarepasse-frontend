import React from 'react'
import Fiat from 'assets/images/fiat.png'
import Ford from 'assets/images/ford.png'
import Nissan from 'assets/images/nissan.png'
import Volks from 'assets/images/volks.png'
import Toyota from 'assets/images/toyota.png'
import { Link } from 'react-router-dom'

interface ISearch extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: React.InputHTMLAttributes<HTMLInputElement>['className']
}

const Search = ({ className, ...props }: ISearch) => {
    const [focused, setFocused] = React.useState(false)

    const sugestions = ['HB20 2020', 'HB20 2019', 'HB20 2018', 'HB20 2015']
    const popular = [
        'Gol 2015',
        'Corolla 2012',
        'Jetta 2018',
        'Volkswagen',
        'Nissan',
        'Honda',
        'Hyundai Fit',
        'Fiat Fastback',
        'BMW X1',
        'HB20 2020',
    ]
    const brands = [Fiat, Toyota, Ford, Volks, Nissan]

    return (
        <div className='relative w-full px-8'>
            <input
                className={`w-full bg-transparent text-xl outline-none placeholder:text-gray-500 ${className}`}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                {...props}
            />
            <div
                className={`ease absolute top-full left-0 mt-4 w-full overflow-hidden  rounded-b-xl bg-white shadow-lg duration-200 ${
                    focused ? 'block' : 'hidden'
                }`}
            >
                <div className='flex flex-col gap-2 border-y border-gray-700 px-6 py-4'>
                    {sugestions.map((item) => (
                        <button key={item} className='!w-max'>
                            <span className='font-medium text-gray-500'>{item}</span>
                        </button>
                    ))}
                </div>
                <div className='flex flex-col gap-2 border-b border-gray-700 p-6'>
                    <p className='text-lg font-medium text-gray-100'>Buscas Populares</p>
                    <div className='flex flex-wrap items-center gap-2'>
                        {popular.map((item, index) => (
                            <button
                                key={index}
                                className='rounded-full border border-gray-600 px-3 py-1 text-gray-400'
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col gap-2 border-b border-gray-700 p-6'>
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
                </div>
            </div>
        </div>
    )
}

export default Search
