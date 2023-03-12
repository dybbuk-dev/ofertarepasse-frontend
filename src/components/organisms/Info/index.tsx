import Button from 'components/atoms/Button'
import { IoCheckmark, IoHeart, IoHeartOutline, IoLogoWhatsapp } from 'react-icons/io5'
import { RiErrorWarningLine } from 'react-icons/ri'
import { useParams, useNavigate } from 'react-router-dom'
import api from 'services/api'
import { toast } from 'react-toastify'
import * as React from 'react'
import { IAdvert } from '../Dashboard/Adverts'
import formatMoney from 'utils/formatMoney'
import CardValueFipe from 'components/atoms/CardValueFipe'
import { useFavorite } from 'hooks/favorites'

const Info = () => {
    const [advert, setAdvert] = React.useState<IAdvert | null>(null)

    const { id } = useParams()
    const navigate = useNavigate()
    const { favorites, addFavorite, removeFavorite, isFavorited } = useFavorite()

    React.useEffect(() => {
        const getAdvert = async () => {
            const { data } = await api.get(`/api/v1/adverts/${id}`)

            if (data) {
                setAdvert(data)
            } else {
                toast.error('Não encontramos o anúncio selecionado.')
                navigate(-1)
            }
        }

        if (id) {
            getAdvert()
        } else {
            toast.error('Não encontramos o anúncio selecionado.')
            navigate(-1)
        }
    }, [id])

    if (!advert) return <></>

    return (
        <section className='bg-gray-900'>
            <div className='mt-[150px] border-t border-gray-700'>
                <div className='container mx-auto grid grid-cols-[1fr_auto] gap-10'>
                    <div className='my-10'>
                        <div className='rounded-xl bg-white px-5 py-8 pb-5'>
                            <div className='flex items-start justify-between'>
                                <div>
                                    <h1 className='mb-2 text-3xl font-extrabold uppercase text-gray-100'>
                                        {advert.title}
                                    </h1>
                                    <h2 className='text-xl font-medium uppercase text-gray-500'>
                                        {advert.model}
                                    </h2>
                                </div>
                                <button
                                    onClick={() =>
                                        !isFavorited(advert.id)
                                            ? addFavorite(advert.id)
                                            : removeFavorite(
                                                  (isFavorited(advert.id) as { id: string }).id
                                              )
                                    }
                                >
                                    {favorites.find((item) => item.advert.id === advert.id) ? (
                                        <IoHeart className='text-3xl text-primary' />
                                    ) : (
                                        <IoHeartOutline className='text-3xl text-gray-500' />
                                    )}
                                </button>
                            </div>
                            <div className='my-8 flex justify-between '>
                                <div className='flex flex-wrap gap-6'>
                                    {advert.highlight.map((item, index) => (
                                        <span
                                            className='flex items-center gap-1 text-sm font-medium text-gray-200'
                                            key={index}
                                        >
                                            <IoCheckmark className='text-primary' /> {item}
                                        </span>
                                    ))}
                                </div>
                                <span className='text-gray-600'>
                                    <span className='font-bold'>ID</span> {advert.id.split('-')[0]}
                                </span>
                            </div>
                            <div className='grid grid-cols-[1fr_20%] gap-3'>
                                <img
                                    src='https://www.autoo.com.br/fotos/2022/2/960_720/kia1_11022022_70604_960_720.jpg'
                                    className='max-h-[425px] w-full rounded-xl object-cover 2xl:max-h-[500px]'
                                />
                                <div className='flex w-full flex-col gap-1'>
                                    <img
                                        src='https://www.autoo.com.br/fotos/2022/2/960_720/kia1_11022022_70604_960_720.jpg'
                                        className='w-full rounded-xl object-cover'
                                    />
                                    <img
                                        src='https://www.autoo.com.br/fotos/2022/2/960_720/kia1_11022022_70604_960_720.jpg'
                                        className='w-full rounded-xl object-cover'
                                    />
                                    <img
                                        src='https://www.autoo.com.br/fotos/2022/2/960_720/kia1_11022022_70604_960_720.jpg'
                                        className='w-full rounded-xl object-cover'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='mt-5 grid grid-cols-3 rounded-xl bg-gray-100 py-12 px-8'>
                            <div className='text-white'>
                                <p className='text-xs font-medium'>
                                    Valor <span className='text-lg font-bold'>fipe</span>
                                </p>
                                <p className='mt-2 mb-1 text-3xl'>
                                    {formatMoney(advert.fipeValue)}
                                </p>
                                <p className='text-xs'>Valor deste veículo na Tabela Fipe</p>
                            </div>
                            <div className='text-white'>
                                <p className='text-xs font-medium'>
                                    Valor média <span className='text-lg font-bold'>web</span>
                                </p>
                                <p className='mt-2 mb-1 text-3xl'>
                                    {formatMoney(advert.fipeValue + advert.fipeValue * 0.2)}
                                </p>
                                <p className='text-xs'>valor médio em toda internet</p>
                            </div>
                            <div className='text-white'>
                                <p className='text-xs font-medium'>
                                    Valor <span className='text-lg font-bold'>OfertaRepasse</span>
                                </p>
                                <p className='mt-2 mb-1 text-3xl'>{formatMoney(advert.value)}</p>
                                <p className='text-xs'>Valor deste veículo na Ofertarepasse</p>
                            </div>
                        </div>
                        <div className='mt-5 rounded-xl bg-white py-8'>
                            <div className='grid grid-cols-4 gap-y-10 px-8'>
                                <div>
                                    <p className='mb-1 text-sm font-medium text-gray-500'>Cidade</p>
                                    <p className='font-semibold text-gray-200'>{advert.city}</p>
                                </div>
                                <div>
                                    <p className='mb-1 text-sm font-medium text-gray-500'>Ano</p>
                                    <p className='font-semibold text-gray-200'>
                                        {advert.modelYear}
                                    </p>
                                </div>
                                <div>
                                    <p className='mb-1 text-sm font-medium text-gray-500'>KM</p>
                                    <p className='font-semibold text-gray-200'>
                                        {advert.kilometer}
                                    </p>
                                </div>
                                <div>
                                    <p className='mb-1 text-sm font-medium text-gray-500'>
                                        Combustível
                                    </p>
                                    <p className='font-semibold text-gray-200'>{advert.fuel}</p>
                                </div>
                                <div>
                                    <p className='mb-1 text-sm font-medium text-gray-500'>
                                        Final da Placa
                                    </p>
                                    <p className='font-semibold text-gray-200'>
                                        {advert.plate.at(-1)}
                                    </p>
                                </div>
                                <div>
                                    <p className='mb-1 text-sm font-medium text-gray-500'>Cor</p>
                                    <p className='font-semibold text-gray-200'>{advert.color}</p>
                                </div>
                            </div>
                            {advert.alert ? (
                                <div className='my-20 bg-[#FEF4F4] px-8 py-10'>
                                    <p className='flex items-center gap-3 text-sm font-medium text-secondary'>
                                        <RiErrorWarningLine className='text-2xl' />
                                        Detalhes do Veículo
                                    </p>
                                    <p className='mt-4 font-semibold text-secondary'>
                                        {advert.alert}
                                    </p>
                                </div>
                            ) : null}
                            <div className='mt-10 px-8'>
                                <p className='mb-4 text-sm font-medium text-gray-500'>
                                    Outras Informações
                                </p>
                                <p className='font-medium text-gray-200'>{advert.about}</p>
                            </div>
                        </div>
                        <div className='mt-5 rounded-xl bg-white p-8'>
                            <p className='mb-4 text-sm font-medium text-gray-500'>
                                Itens do veículo
                            </p>
                            <div className='mt-7 grid grid-cols-4 gap-4'>
                                {advert.highlight.map((item, index) => (
                                    <p
                                        key={index}
                                        className='flex items-center gap-1 font-semibold text-gray-200'
                                    >
                                        <IoCheckmark className='text-primary' /> {item}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='relative mt-10'>
                        <div className='sticky top-5 rounded-xl bg-white text-gray-100'>
                            <div className='px-12 py-8'>
                                <p className='text-xs font-medium'>
                                    Valor <span className='text-lg font-bold'>OfertaRepasse</span>
                                </p>
                                <p className='mt-2 mb-1 text-3xl'>{formatMoney(advert.value)}</p>
                                <p className='text-xs'>
                                    {formatMoney(advert.value - advert.fipeValue)} comparado a
                                    tabela fipe.
                                </p>
                            </div>
                            <CardValueFipe fipe={advert.fipeValue} />
                            <div className='flex flex-col gap-3 py-5 px-4 text-white'>
                                <Button className='!bg-primary !py-4 font-semibold'>
                                    Comprar Veículo
                                </Button>
                                <Button className='!bg-gray-100 !py-4 font-semibold'>
                                    Tenho Interesse
                                </Button>
                                <Button className='flex items-center justify-center gap-2 !bg-[#25D366] !py-4 font-semibold'>
                                    <IoLogoWhatsapp className='text-xl' />
                                    Conversar pelo WhatsApp
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Info
