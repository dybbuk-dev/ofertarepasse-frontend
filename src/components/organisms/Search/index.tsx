import Filter from 'assets/icon/Filter'
import Card from 'components/atoms/Card'
import Input from 'components/atoms/Input'
import Checkbox from 'components/atoms/Input/Checkbox'
import React from 'react'
import {
    IoChevronForwardOutline,
    IoChevronUpOutline,
    IoCloseOutline,
    IoLocationOutline,
} from 'react-icons/io5'
import { Link } from 'react-router-dom'

const Search = () => {
    const [amountColums, setAmountColums] = React.useState(5)
    const [visibleFilter, setVisibleFilter] = React.useState(true)

    const checkboxFields = {
        marcas: ['Adamo', 'Alfa Romeo', 'Aston Martin', 'Audi', 'Beach', 'Bentley', 'Bianco'],
        vendedor: ['Concessionária', 'Loja', 'Pessoa Física'],
        opcionais: ['Airbag', 'Alarme', 'Ar Condicionado', 'Ar Quente'],
        cambio: [
            'Automática',
            'Automática Sequencial',
            'Automatizada',
            'Automatizada dct',
            'Manual',
        ],
        combustivel: ['Álcool', 'Álcool e gás natural', 'Diesel', 'Gás Natural'],
        finalPlaca: ['1 e 2', '3 e 4', '5 e 6', '7 e 8', '9 e 0'],
        blindagem: ['Sim', 'Não'],
        cores: ['Amarelo', 'Azul', 'Bege', 'Branco'],
        carroceria: ['Sedã', 'Utilitário Esportivo', 'Cupê'],
        caracteristicas: ['Alienado', 'Garantia de Fábrica', 'IPVA Pago'],
    }

    const items = [
        {
            id: 'pasjbdpasjbdpasjd',
            title: 'Honda Civic',
            description: '1.5 16V TURBO GASOLINA TOURING 4P CVT',
            price: 119000,
            year: '2016/2017',
            distance: '72000 km',
            location: 'Catanduva - SP',
        },
        {
            id: 'ijsdbfpaijsbdfasdf',
            title: 'Honda Civic',
            description: '1.5 16V TURBO GASOLINA TOURING 4P CVT',
            price: 119000,
            year: '2016/2017',
            distance: '72000 km',
            location: 'Catanduva - SP',
        },
        {
            id: 'ijsdbfiajbdsfpiasjdf',
            title: 'Honda Civic',
            description: '1.5 16V TURBO GASOLINA TOURING 4P CVT',
            price: 119000,
            year: '2016/2017',
            distance: '72000 km',
            location: 'Catanduva - SP',
        },
        {
            id: 'ijbdfijbasdif',
            title: 'Honda Civic',
            description: '1.5 16V TURBO GASOLINA TOURING 4P CVT',
            price: 119000,
            year: '2016/2017',
            distance: '72000 km',
            location: 'Catanduva - SP',
        },
        {
            id: 'ijpbsdfpijabsdp',
            title: 'Honda Civic',
            description: '1.5 16V TURBO GASOLINA TOURING 4P CVT',
            price: 119000,
            year: '2016/2017',
            distance: '72000 km',
            location: 'Catanduva - SP',
        },
        {
            id: 'asdsdfgdfghfrjyuktyik',
            title: 'Honda Civic',
            description: '1.5 16V TURBO GASOLINA TOURING 4P CVT',
            price: 119000,
            year: '2016/2017',
            distance: '72000 km',
            location: 'Catanduva - SP',
        },
        {
            id: '5sad14f65asd1f965',
            title: 'Honda Civic',
            description: '1.5 16V TURBO GASOLINA TOURING 4P CVT',
            price: 119000,
            year: '2016/2017',
            distance: '72000 km',
            location: 'Catanduva - SP',
        },
        {
            id: '87xcv19a819sd81fsd',
            title: 'Honda Civic',
            description: '1.5 16V TURBO GASOLINA TOURING 4P CVT',
            price: 119000,
            year: '2016/2017',
            distance: '72000 km',
            location: 'Catanduva - SP',
        },
    ]

    return (
        <div className='bg-gray-900'>
            <section className='container mx-auto mt-[150px] grid grid-cols-[300px_1fr] items-center border-y border-gray-700 py-10'>
                <button className='flex items-center gap-2 text-gray-400'>
                    <IoLocationOutline className='text-lg' />
                    <span className='underline underline-offset-2'>Escolha uma Localização</span>
                </button>
                <div className='flex items-center justify-between'>
                    <div className='text-gray-200'>
                        <p className='text-xl'>Carros Volkswagen em Londrina/PR</p>
                        <p className='text-sm'>48 carros encontrados</p>
                    </div>
                    <div className='flex items-center gap-6'>
                        <button
                            className={`flex gap-[2px] text-gray-500 [&>div]:hover:border-primary ${
                                amountColums === 3 ? '[&>div]:border-primary' : ''
                            }`}
                            onClick={() => setAmountColums(3)}
                        >
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className='ease h-[15px] w-[15px] rounded border border-gray-500 duration-200'
                                />
                            ))}
                        </button>
                        <button
                            className={`flex gap-[2px] text-gray-500 [&>div]:hover:border-primary ${
                                amountColums === 4 ? '[&>div]:border-primary' : ''
                            }`}
                            onClick={() => setAmountColums(4)}
                        >
                            {[1, 2, 3, 4].map((item) => (
                                <div
                                    key={item}
                                    className='ease h-[15px] w-[15px] rounded border border-gray-500 duration-200'
                                />
                            ))}
                        </button>
                        <button
                            className={`flex gap-[2px] text-gray-500 [&>div]:hover:border-primary ${
                                amountColums === 5 ? '[&>div]:border-primary' : ''
                            }`}
                            onClick={() => setAmountColums(5)}
                        >
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div
                                    key={item}
                                    className='ease h-[15px] w-[15px] rounded border border-gray-500 duration-200'
                                />
                            ))}
                        </button>
                        <button
                            className={`flex flex-col gap-[2px] [&>div]:hover:border-primary ${
                                amountColums === 1 ? '[&>div]:border-primary' : ''
                            }`}
                            onClick={() => setAmountColums(1)}
                        >
                            <div className='ease h-[7px] w-[15px] rounded border border-gray-500 duration-200' />
                            <div className='ease h-[7px] w-[15px] rounded border border-gray-500 duration-200' />
                        </button>
                        <button onClick={() => setVisibleFilter(!visibleFilter)}>
                            <Filter color={visibleFilter ? '#484854' : '#F3722C'} />
                        </button>
                        <button className='ml-5 flex items-center gap-[2px] text-sm text-gray-200'>
                            Mais Relevantes
                            <IoChevronUpOutline className='text-lg' />
                        </button>
                    </div>
                </div>
            </section>
            <section
                className={`container mx-auto grid gap-8 ${
                    visibleFilter ? 'grid-cols-[325px_1fr]' : 'grid-cols-1'
                }`}
            >
                <div className={visibleFilter ? 'block bg-white py-10 px-3' : 'hidden'}>
                    <div className='border-b border-gray-700 pb-10'>
                        <p className='text-sm font-medium text-gray-200'>Marcas</p>
                        <div className='my-3 flex flex-col'>
                            {checkboxFields.marcas.map((item) => (
                                <label
                                    key={item}
                                    role='button'
                                    className='text-sm font-medium text-gray-400'
                                >
                                    <Checkbox />
                                    {item}
                                </label>
                            ))}
                        </div>
                        <button className='flex items-center gap-1 text-sm font-semibold text-gray-400'>
                            Ver todas as marcas
                            <IoChevronForwardOutline />
                        </button>
                    </div>
                    <div className='border-b border-gray-700 py-10'>
                        <p className='mb-3 text-sm font-medium text-gray-200'>Ano</p>
                        <div className='grid grid-cols-2 gap-4'>
                            <label>
                                <Input
                                    placeholder='de'
                                    className='!rounded border-2 !border-gray-700 !py-2 !px-3'
                                    classInput='placeholder:text-gray-600 !text-sm'
                                />
                                <span className='text-xs text-gray-500'>ex: 2012</span>
                            </label>
                            <label>
                                <Input
                                    placeholder='até'
                                    className='!rounded border-2 !border-gray-700 !py-2 !px-3'
                                    classInput='placeholder:text-gray-600 !text-sm'
                                />
                                <span className='text-xs text-gray-500'>ex: 2022</span>
                            </label>
                        </div>
                    </div>
                    <div className='border-b border-gray-700 py-10'>
                        <p className='mb-3 text-sm font-medium text-gray-200'>Preço</p>
                        <div className='grid grid-cols-2 gap-4'>
                            <label>
                                <Input
                                    placeholder='de'
                                    className='!rounded border-2 !border-gray-700 !py-2 !px-3'
                                    classInput='placeholder:text-gray-600 !text-sm'
                                />
                                <span className='text-xs text-gray-500'>ex: 15.000</span>
                            </label>
                            <label>
                                <Input
                                    placeholder='até'
                                    className='!rounded border-2 !border-gray-700 !py-2 !px-3'
                                    classInput='placeholder:text-gray-600 !text-sm'
                                />
                                <span className='text-xs text-gray-500'>ex: 50.000</span>
                            </label>
                        </div>
                    </div>
                    <div className='border-b border-gray-700 py-10'>
                        <p className='mb-3 text-sm font-medium text-gray-200'>Quilometragem</p>
                        <div className='grid grid-cols-2 gap-4'>
                            <label>
                                <Input
                                    placeholder='de'
                                    className='!rounded border-2 !border-gray-700 !py-2 !px-3'
                                    classInput='placeholder:text-gray-600 !text-sm'
                                />
                                <span className='text-xs text-gray-500'>ex: 10.000</span>
                            </label>
                            <label>
                                <Input
                                    placeholder='até'
                                    className='!rounded border-2 !border-gray-700 !py-2 !px-3'
                                    classInput='placeholder:text-gray-600 !text-sm'
                                />
                                <span className='text-xs text-gray-500'>ex: 50.000</span>
                            </label>
                        </div>
                    </div>
                    <div className='border-b border-gray-700 py-10'>
                        <p className='text-sm font-medium text-gray-200'>Câmbio</p>
                        <div className='my-3 flex flex-col'>
                            {checkboxFields.cambio.map((item) => (
                                <label
                                    key={item}
                                    role='button'
                                    className='text-sm font-medium text-gray-400'
                                >
                                    <Checkbox />
                                    {item}
                                </label>
                            ))}
                        </div>
                        <button className='flex items-center gap-1 text-sm font-semibold text-gray-400'>
                            Ver todos os câmbios
                            <IoChevronForwardOutline />
                        </button>
                    </div>
                    <div className='border-b border-gray-700 py-10'>
                        <p className='text-sm font-medium text-gray-200'>Blindagem</p>
                        <div className='my-3 flex items-center gap-4'>
                            {checkboxFields.blindagem.map((item) => (
                                <label
                                    key={item}
                                    role='button'
                                    className='text-sm font-medium text-gray-400'
                                >
                                    <Checkbox />
                                    {item}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className='border-b border-gray-700 py-10'>
                        <p className='text-sm font-medium text-gray-200'>Carroceria</p>
                        <div className='my-3 flex flex-col'>
                            {checkboxFields.carroceria.map((item) => (
                                <label
                                    key={item}
                                    role='button'
                                    className='text-sm font-medium text-gray-400'
                                >
                                    <Checkbox />
                                    {item}
                                </label>
                            ))}
                        </div>
                        <button className='flex items-center gap-1 text-sm font-semibold text-gray-400'>
                            Ver todas carrocerias
                            <IoChevronForwardOutline />
                        </button>
                    </div>
                    <div className='border-b border-gray-700 py-10'>
                        <p className='text-sm font-medium text-gray-200'>Características</p>
                        <div className='my-3 flex flex-col'>
                            {checkboxFields.caracteristicas.map((item) => (
                                <label
                                    key={item}
                                    role='button'
                                    className='text-sm font-medium text-gray-400'
                                >
                                    <Checkbox />
                                    {item}
                                </label>
                            ))}
                        </div>
                        <button className='flex items-center gap-1 text-sm font-semibold text-gray-400'>
                            Ver todas as características
                            <IoChevronForwardOutline />
                        </button>
                    </div>
                    <button className='mt-8 flex items-center gap-2 text-gray-400'>
                        Limpar filtros
                        <IoCloseOutline />
                    </button>
                </div>
                <div className={`${!visibleFilter ? 'flex justify-center' : ''}`}>
                    <div
                        className={`${
                            'grid-cols-' + amountColums
                        } mt-10 grid h-max gap-x-4 gap-y-8 ${
                            !visibleFilter ? 'max-w-[1200px]' : ''
                        }`}
                    >
                        {items.map((item) => (
                            <Link to={`/info/${item.id}`} key={item.id} className='h-max'>
                                <Card
                                    data={item}
                                    inline={amountColums === 1}
                                    inverseColors={true}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Search
