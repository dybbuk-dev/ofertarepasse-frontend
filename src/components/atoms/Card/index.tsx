/* eslint-disable tailwindcss/no-custom-classname */
import {
    IoCheckmarkOutline,
    IoChevronBack,
    IoChevronForward,
    IoHeart,
    IoHeartOutline,
} from 'react-icons/io5'
import Calendar from 'assets/icon/Calendar'
import BarChart from 'assets/icon/BarChart'
import Compass from 'assets/icon/Compass'
import formatMoney from 'utils/formatMoney'
import { useFavorite } from 'hooks/favorites'
import WithoutImage from 'assets/images/withoutImage.png'
import getUrlAws from 'utils/getUrlAws'
import React from 'react'

interface ICard extends React.HTMLAttributes<HTMLDivElement> {
    data: {
        id: string
        images?: Array<string> | null
        title: string
        description: string
        price: number
        year: string
        distance: number
        location: string
        previewImage?: string | null
    }
    inline?: boolean
    inverseColors?: boolean
}

const Card = ({ data, inline, inverseColors = false, ...props }: ICard) => {
    const [indexImageSlide, setIndexImageSlide] = React.useState(0)

    const { addFavorite, removeFavorite, favorites, isFavorited } = useFavorite()

    return (
        <div
            className={`h-max ${inline ? 'grid grid-cols-[225px_1fr]' : 'block'} ${
                inverseColors ? 'bg-white' : 'bg-gray-900'
            } rounded-xl`}
            {...props}
        >
            {data.images && data.images.length > 1 ? (
                <div className='relative w-full'>
                    <img
                        src={getUrlAws(data.images[indexImageSlide])}
                        className={`${inline ? 'h-full' : 'h-[165px]'} min-w-full object-cover ${
                            inline ? 'rounded-l-xl' : 'rounded-t-xl'
                        }`}
                    />
                    <div className='absolute top-0 left-0 flex h-full w-full justify-center'>
                        <div className='group flex h-full w-full justify-between hover:opacity-100'>
                            <button
                                className='options flex h-full items-center bg-gradient-to-r from-[#00000077] px-3 opacity-0 duration-200 ease-in-out group-hover:opacity-100'
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (indexImageSlide > 0) {
                                        setIndexImageSlide(indexImageSlide - 1)
                                    }
                                }}
                            >
                                <IoChevronBack className='text-3xl text-white' />
                            </button>
                            <button
                                className='options flex h-full items-center bg-gradient-to-l from-[#00000077] px-3 opacity-0 duration-200 ease-in-out group-hover:opacity-100'
                                onClick={(e) => {
                                    e.preventDefault()
                                    if ((data.images?.length as number) - 1 > indexImageSlide) {
                                        setIndexImageSlide(indexImageSlide + 1)
                                    }
                                }}
                            >
                                <IoChevronForward className='text-3xl text-white' />
                            </button>
                        </div>
                        <div className='absolute bottom-3 flex gap-[2px]'>
                            {data.images.map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-[2px] w-[10px] shadow ${
                                        indexImageSlide === index ? 'bg-primary' : 'bg-white'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <img
                    src={
                        data.previewImage
                            ? data.previewImage
                            : data.images
                            ? getUrlAws(data.images[0])
                            : WithoutImage
                    }
                    className={`${inline ? 'h-full' : 'h-[165px]'} w-full  object-cover ${
                        inline ? 'rounded-l-xl' : 'rounded-t-xl'
                    }`}
                />
            )}
            {inline ? (
                <div className='px-8 py-3'>
                    <div className='flex items-center justify-between'>
                        <p className='text-lg font-semibold text-gray-100'>{data.title}</p>
                        <button>
                            <IoHeartOutline className='text-lg text-gray-500' />
                        </button>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-xs font-medium text-gray-500 line-clamp-2'>
                                {data.description}
                            </p>
                            <div className='my-6 flex flex-wrap items-center gap-4'>
                                {[
                                    'Aceita Troca',
                                    'Todas revisões feitas pela concessionária',
                                    'Garantia de Fábrica',
                                ].map((item) => (
                                    <p key={item} className='flex items-center gap-2 text-xs'>
                                        <IoCheckmarkOutline /> {item}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <p className='mt-4 mb-6 text-2xl font-medium text-gray-200'>
                            {formatMoney(data.price)}
                        </p>
                    </div>
                    <div className='flex items-center justify-between rounded-xl bg-gray-900 px-5 py-3'>
                        <div className='flex items-center gap-5'>
                            <div className='grid grid-cols-[20px_1fr] items-center gap-2'>
                                <Calendar />
                                <span className='text-sm font-medium text-gray-400'>
                                    {data.year}
                                </span>
                            </div>
                            <div className='grid grid-cols-[20px_1fr] items-center gap-2'>
                                <BarChart />
                                <span className='text-sm font-medium text-gray-400'>
                                    {data.distance}
                                </span>
                            </div>
                            <div className='grid grid-cols-[20px_1fr] items-center gap-2'>
                                <Compass />
                                <span className='text-sm font-medium text-gray-400'>
                                    {data.location}
                                </span>
                            </div>
                        </div>
                        <p className='flex items-center gap-2 text-xs'>
                            <IoCheckmarkOutline /> Concessionária
                        </p>
                    </div>
                </div>
            ) : (
                <div className='py-3 px-4'>
                    <div className='grid grid-cols-[1fr_auto] items-start'>
                        <div>
                            <p className='text-lg font-semibold uppercase text-gray-100'>
                                {data.title}
                            </p>
                            <p className='text-xs font-medium uppercase text-gray-500 line-clamp-1'>
                                {data.description}
                            </p>
                        </div>
                        <button
                            onClick={(e) => {
                                e.preventDefault()

                                !isFavorited(data.id)
                                    ? addFavorite(data.id)
                                    : removeFavorite((isFavorited(data.id) as { id: string }).id)
                            }}
                        >
                            {favorites.find((item) => item.advert.id === data.id) ? (
                                <IoHeart className='text-lg text-primary' />
                            ) : (
                                <IoHeartOutline className='text-lg text-gray-500' />
                            )}
                        </button>
                    </div>
                    <p className='mt-4 mb-6 text-2xl font-medium text-gray-200'>
                        R${' '}
                        {Number(data.price)
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                    </p>
                    <div
                        className={`flex flex-col gap-3 rounded-xl  ${
                            inverseColors ? 'bg-gray-900' : 'bg-white'
                        } p-3`}
                    >
                        <div className='grid grid-cols-[20px_1fr] items-center gap-2'>
                            <Calendar />
                            <span className='text-sm font-medium text-gray-400'>{data.year}</span>
                        </div>
                        <div className='grid grid-cols-[20px_1fr] items-center gap-2'>
                            <BarChart />
                            <span className='text-sm font-medium text-gray-400'>
                                {data.distance ? `${data.distance} km` : '----'}
                            </span>
                        </div>
                        <div className='grid grid-cols-[20px_1fr] items-center gap-2'>
                            <Compass />
                            <span className='text-sm font-medium text-gray-400'>
                                {data.location}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Card
