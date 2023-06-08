import DefaultTemplate from 'components/templates/DefaultTemplate'
import * as React from 'react'
import MenOferta from 'assets/images/men_oferta_repasse.png'
import SearchInput from 'components/atoms/Input/Search'
import Button from 'components/atoms/Button'
import { Link } from 'react-router-dom'
import Card from 'components/atoms/Card'
import Fiat from 'assets/images/fiat.png'
import Bmw from 'assets/images/bmw.png'
import Ford from 'assets/images/ford.png'
import Hyundai from 'assets/images/hyundai.png'
import Nissan from 'assets/images/nissan.png'
import Volks from 'assets/images/volks.png'
import Toyota from 'assets/images/toyota.png'
import MenWithWoman from 'assets/images/men_with_woman.png'
import api from 'services/api'
import { IAdvert } from 'components/organisms/Dashboard/Adverts'
import { useAuth } from 'hooks/auth'
import formatUrlDetails from 'utils/formatUrlDetails'

const Home = () => {
    const [optionBuy, setOptionBuy] = React.useState('car')
    const [adverts, setAdverts] = React.useState<Array<IAdvert>>([])
    const [search, setSearch] = React.useState('')

    const { isAuthenticated } = useAuth()

    React.useEffect(() => {
        const getAdverts = async () => {
            const { data } = await api.get('/api/v1/adverts?limit=5')

            if (data) {
                setAdverts(data.items)
            }
        }

        getAdverts()
    }, [])

    const brands: Array<string> = [Fiat, Bmw, Ford, Hyundai, Nissan, Volks, Toyota]

    return (
        <DefaultTemplate>
            <section className='w-full bg-gray-900 pt-[180px]'>
                <div className='container mx-auto'>
                    <p className='text-[1.5rem] font-bold sm:text-[2rem] md:text-[2.7rem]'>
                        Veículos com valores abaixo da FIPE é só na{' '}
                        <span className='text-primary'>ofertarepasse.</span>
                    </p>
                    <p className='text-[1rem] text-primary sm:text-[1.5rem] md:text-[2.3rem]'>
                        Bom pra quem vende, ótimo pra quem compra.
                    </p>
                    <div className='my-8 grid grid-rows-[1fr_auto] items-center gap-2 xs:gap-8 sm:my-0 sm:grid-cols-[1fr_auto] md:gap-16'>
                        <div className='rounded-2xl bg-white py-2 xs:py-3 md:py-8'>
                            <div className='mx-8 flex items-center gap-5 border-b border-gray-700 pb-4'>
                                <button
                                    onClick={() => setOptionBuy('car')}
                                    className={`ease font-medium duration-200 ${
                                        optionBuy === 'car' ? 'text-primary' : 'text-gray-500'
                                    }`}
                                >
                                    Comprar Carro
                                </button>
                                <Link to={isAuthenticated ? '/dashboard/adverts/create' : '/login'}>
                                    <p
                                        className={
                                            'ease cursor-pointer font-medium text-gray-500 duration-200'
                                        }
                                    >
                                        Quero Anunciar
                                    </p>
                                </Link>
                            </div>
                            <div className='my-4 flex flex-col-reverse items-end md:mb-0 xl:flex-row xl:items-center'>
                                <SearchInput
                                    className='py-4'
                                    placeholder='Digite marca ou modelo do carro'
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Link
                                    to={`/estoque?title=${search}`}
                                    className='w-full px-5 xl:w-auto'
                                >
                                    <Button className='my-4 w-full !bg-primary !px-10 font-semibold text-white xl:my-0 xl:!w-max'>
                                        Buscar Veículos
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <img src={MenOferta} className='h-[400px] w-[400px] object-contain' />
                    </div>
                </div>
            </section>
            <section className='container mx-auto'>
                <section
                    className={`mt-4 xs:mt-12 md:mt-24 ${adverts.length === 0 ? 'hidden' : ''}`}
                >
                    <div className='mb-10 flex items-center justify-between font-medium'>
                        <p>Anúncios em Destaque</p>
                        <Link to='/estoque'>
                            <span className='text-primary'>Ver todos veículos disponíveis</span>
                        </Link>
                    </div>
                    <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                        {adverts.map((item) => (
                            <Link
                                to={formatUrlDetails(
                                    `/comprar/${item.brand}/${item.model.replaceAll(
                                        '/',
                                        ''
                                    )}/${item.version.replaceAll('/', '')}/${item.modelYear}/${
                                        item.id
                                    }`
                                )}
                                key={item.id}
                            >
                                <Card
                                    data={{
                                        id: item.id,
                                        images: item.images,
                                        title: item.title,
                                        description: item.version,
                                        distance: item.kilometer,
                                        location: `${item.city} - ${item.state}`,
                                        price: item.value,
                                        year: item.modelYear,
                                    }}
                                />
                            </Link>
                        ))}
                    </div>
                </section>
                <section className='mt-4 xs:mt-12 md:mt-24'>
                    <div className='flex flex-col items-center justify-between rounded-2xl border-[3px] border-gray-900 py-3 px-4 xs:py-5 xs:px-7 md:px-10 md:py-8 xl:flex-row'>
                        <p className='mb-4 text-lg font-medium text-gray-200 xl:mb-0'>
                            A Marca do seu novo veículo
                        </p>
                        <div className='grid grid-cols-2 items-center justify-items-center gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7'>
                            {brands.map((brand, index) => (
                                <img key={index} src={brand} className='w-[70%] object-contain' />
                            ))}
                        </div>
                    </div>
                </section>
                <section className='mt-4 xs:mt-12 md:mt-36'>
                    <div className='flex flex-col rounded-xl bg-gradient-to-r from-secondary to-[#ff9d57] lg:flex-row'>
                        <div className='grow p-2 xs:p-6 md:p-14'>
                            <p className='text-center text-xl font-semibold text-white md:text-left md:text-2xl lg:text-3xl'>
                                Bom pra quem vende. <br />
                                Ótimo pra quem compra.
                            </p>
                            <p className='mt-4 mb-10 text-center text-xs font-medium text-white md:text-left md:text-sm lg:text-base'>
                                Encontre motos e carros com valores abaixo da tabela fipe.
                            </p>
                            <div className='flex flex-col items-center gap-4 md:flex-row'>
                                <Button className='!bg-white !py-5 text-sm font-semibold text-primary md:text-base'>
                                    Encontrar meu veículo
                                </Button>
                                <Button className='!bg-secondary !py-5 text-sm font-semibold text-white md:text-base'>
                                    Vender meu veículo
                                </Button>
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <img src={MenWithWoman} className='w-[345px] object-contain' />
                        </div>
                    </div>
                </section>
            </section>
        </DefaultTemplate>
    )
}

export default Home
