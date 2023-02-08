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

const Home = () => {
    const [optionBuy, setOptionBuy] = React.useState('carro')

    const itemsBuy = [
        {
            label: 'Comprar carro',
            value: 'carro',
        },
        {
            label: 'Comprar moto',
            value: 'moto',
        },
        {
            label: 'Quero anunciar',
            value: 'anunciar',
        },
    ]

    const items = [
        {
            id: 'pasjbdpasjbdpasjd',
            title: 'Honda Civic',
            description: '1.5 16V TURBO GASOLINA TOURING 4P CVT',
            price: 'R$119.500',
            year: '2016/2017',
            distance: '72000 km',
            location: 'Catanduva - SP',
        },
        {
            id: 'ijsdbfpaijsbdfasdf',
            title: 'Honda Civic',
            description: '1.5 16V TURBO GASOLINA TOURING 4P CVT',
            price: 'R$119.500',
            year: '2016/2017',
            distance: '72000 km',
            location: 'Catanduva - SP',
        },
        {
            id: 'ijsdbfiajbdsfpiasjdf',
            title: 'Honda Civic',
            description: '1.5 16V TURBO GASOLINA TOURING 4P CVT',
            price: 'R$119.500',
            year: '2016/2017',
            distance: '72000 km',
            location: 'Catanduva - SP',
        },
        {
            id: 'ijbdfijbasdif',
            title: 'Honda Civic',
            description: '1.5 16V TURBO GASOLINA TOURING 4P CVT',
            price: 'R$119.500',
            year: '2016/2017',
            distance: '72000 km',
            location: 'Catanduva - SP',
        },
        {
            id: 'ijpbsdfpijabsdp',
            title: 'Honda Civic',
            description: '1.5 16V TURBO GASOLINA TOURING 4P CVT',
            price: 'R$119.500',
            year: '2016/2017',
            distance: '72000 km',
            location: 'Catanduva - SP',
        },
    ]

    const brands: Array<string> = [Fiat, Bmw, Ford, Hyundai, Nissan, Volks, Toyota]

    return (
        <DefaultTemplate>
            <section className='mt-24'>
                <p className='text-[2.7rem] font-bold'>
                    Veículos com valores abaixo da FIPE é só na{' '}
                    <span className='text-primary'>ofertarepasse.</span>
                </p>
                <p className='text-[2.3rem] text-primary'>
                    Bom pra quem vende, ótimo pra quem compra.
                </p>
                <div className='grid grid-cols-[1fr_auto] items-center gap-16 px-[3vw]'>
                    <div>
                        <div className='flex items-center gap-5 border-b border-gray-700 py-4'>
                            {itemsBuy.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setOptionBuy(item.value)}
                                    className={`ease font-medium capitalize duration-200 ${
                                        item.value === optionBuy ? 'text-primary' : 'text-gray-500'
                                    }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                        <div className='relative flex items-center py-8'>
                            <SearchInput placeholder='Digite marca ou modelo do carro' />
                            <Link to='/search'>
                                <Button className='absolute right-0 top-5 !w-max !bg-primary !px-10 font-semibold text-white'>
                                    Buscar Veículos
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <img src={MenOferta} className='h-[400px] w-[400px] object-contain' />
                </div>
            </section>
            <section className='mt-24'>
                <div className='mb-10 flex items-center justify-between font-medium'>
                    <p>Anúncios em Destaque</p>
                    <Link to='/'>
                        <span className='text-primary'>Ver todos veículos disponíveis</span>
                    </Link>
                </div>
                <div className='grid grid-cols-5 gap-5'>
                    {items.map((item) => (
                        <Link to={`/info/${item.id}`} key={item.id}>
                            <Card data={item} />
                        </Link>
                    ))}
                </div>
            </section>
            <section className='mt-24'>
                <div className='flex items-center justify-between'>
                    <p className='text-lg font-medium text-gray-200'>A Marca do seu novo veículo</p>
                    <div className='grid grid-cols-7 items-center justify-items-end'>
                        {brands.map((brand, index) => (
                            <img key={index} src={brand} className='w-[70%] object-contain' />
                        ))}
                    </div>
                </div>
            </section>
            <section className='mt-24'>
                <div className='grid grid-cols-2 rounded-xl bg-gradient-to-r from-secondary to-primary'>
                    <div className='p-10'>
                        <p className='text-3xl font-semibold text-white'>
                            Bom pra quem vende. <br />
                            Ótimo pra quem compra.
                        </p>
                        <p className='mt-4 mb-10 font-medium text-white'>
                            Encontre motos e carros com valores abaixo da tabela fipe.
                        </p>
                        <div className='flex items-center gap-4'>
                            <Button className='!bg-white py-5 font-semibold text-primary'>
                                Encontrar meu veículo
                            </Button>
                            <Button className='!bg-secondary py-5 font-semibold text-white'>
                                Vender meu veículo
                            </Button>
                        </div>
                    </div>
                    <div className='relative flex items-center justify-center'>
                        <img
                            src={MenWithWoman}
                            className='absolute bottom-0 w-[345px] object-contain'
                        />
                    </div>
                </div>
            </section>
        </DefaultTemplate>
    )
}

export default Home
