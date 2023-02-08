import { IoCheckmarkOutline, IoHeartOutline } from 'react-icons/io5'
import Calendar from 'assets/icon/Calendar'
import BarChart from 'assets/icon/BarChart'
import Compass from 'assets/icon/Compass'

interface ICard extends React.HTMLAttributes<HTMLDivElement> {
    data: {
        title: string
        description: string
        price: string
        year: string
        distance: string
        location: string
    }
    inline?: boolean
}

const Card = ({ data, inline, ...props }: ICard) => {
    return (
        <div className={`h-max ${inline ? 'grid grid-cols-[225px_1fr]' : 'block'}`} {...props}>
            <img
                src='https://www.autoo.com.br/fotos/2022/2/960_720/kia1_11022022_70604_960_720.jpg'
                className={`h-[165px] w-full  object-cover ${
                    inline ? 'rounded-l-xl' : 'rounded-t-xl'
                }`}
            />
            {inline ? (
                <div className='p-5'>
                    <div className='grid grid-cols-[1fr_auto] items-start'>
                        <div>
                            <p className='text-lg font-semibold text-gray-100'>{data.title}</p>
                            <p className='text-xs font-medium text-gray-500'>{data.description}</p>
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
                            <div className='flex items-center gap-3'>
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
                        </div>
                        <div className='flex flex-col items-end'>
                            <button>
                                <IoHeartOutline className='text-lg text-gray-500' />
                            </button>
                            <p className='mt-4 mb-6 text-2xl font-medium text-gray-200'>
                                {data.price}
                            </p>
                            <p className='flex items-center gap-2 text-xs'>
                                <IoCheckmarkOutline /> Concessionária
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='py-3 px-4'>
                    <div className='grid grid-cols-[1fr_auto] items-start'>
                        <div>
                            <p className='text-lg font-semibold text-gray-100'>{data.title}</p>
                            <p className='text-xs font-medium text-gray-500'>{data.description}</p>
                        </div>
                        <button>
                            <IoHeartOutline className='text-lg text-gray-500' />
                        </button>
                    </div>
                    <p className='mt-4 mb-6 text-2xl font-medium text-gray-200'>{data.price}</p>
                    <div className='flex flex-col gap-3'>
                        <div className='grid grid-cols-[20px_1fr] items-center gap-2'>
                            <Calendar />
                            <span className='text-sm font-medium text-gray-400'>{data.year}</span>
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
                </div>
            )}
        </div>
    )
}

export default Card
