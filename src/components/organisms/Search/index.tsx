/* eslint-disable @typescript-eslint/no-explicit-any */
import Filter from 'assets/icon/Filter'
import Card from 'components/atoms/Card'
import Input from 'components/atoms/Input'
import Checkbox from 'components/atoms/Input/Checkbox'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
    IoChevronForwardOutline,
    IoChevronUpOutline,
    IoChevronDownOutline,
    IoCloseOutline,
    IoLocationOutline,
} from 'react-icons/io5'
import { Link, useSearchParams, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from 'services/api'
import { IAdvert } from '../Dashboard/Adverts'
import InfiniteScroll from 'react-infinite-scroll-component'
import formatUrlDetails from 'utils/formatUrlDetails'
import CloseIcon from '@mui/icons-material/Close'
import GridViewIcon from '@mui/icons-material/GridView'
import Button from 'components/atoms/Button'
import CategroyGroup from './CategoryGroup'
import Radio from 'components/atoms/Input/Radio'

const gridCols = ['lg:grid-cols-3', 'lg:grid-cols-4', 'lg:grid-cols-5']

const checkboxFields = {
    marcas: [
        { title: 'Adamo', value: 'Adamo' },
        { title: 'Alfa Romeo', value: 'Alfa Romeo' },
        { title: 'Aston Martin', value: 'Aston Martin' },
        { title: 'Audi', value: 'Audi' },
        { title: 'Beach', value: 'Beach' },
        { title: 'Bentley', value: 'Bentley' },
        { title: 'Bianco', value: 'Bianco' },
    ],
    seller: [
        { title: 'Pessoa Física', value: 'physical' },
        { title: 'Pessoa Jurídica', value: 'legal' },
    ],
    options: [
        { title: 'Airbag', value: 'Airbag' },
        { title: 'Alarme', value: 'Alarme' },
        { title: 'Ar Concidionado', value: 'Ar Concidionado' },
        { title: 'Ar Quente', value: 'Ar Quente' },
        { title: 'Computador de Bordo', value: 'Computador de Bordo' },
        { title: 'Controle de Tração', value: 'Controle de Tração' },
        { title: 'Desembaçador traseiro', value: 'Desembaçador traseiro' },
        { title: 'Banco com regulagem de altura', value: 'Banco com regulagem de altura' },
        { title: 'Freio ABS', value: 'Freio ABS' },
        { title: 'Controle automático de velocidade', value: 'Controle automático de velocidade' },
    ],
    exchange: [
        { title: 'Automática', value: 'Automática' },
        { title: 'Automática Sequencial', value: 'Automática Sequencial' },
        { title: 'Automatizada', value: 'Automatizada' },
        { title: 'Automatizada dct', value: 'Automatizada dct' },
        { title: 'Manual', value: 'Manual' },
    ],
    fuel: [
        { title: 'Álcool', value: 'Álcool' },
        { title: 'Álcool e gás natural', value: 'Álcool e gás natural' },
        { title: 'Diesel', value: 'Diesel' },
        { title: 'Gás Natural', value: 'Gás Natural' },
    ],
    finalPlate: [
        { title: '1 e 2', value: '1 e 2' },
        { title: '3 e 4', value: '3 e 4' },
        { title: '5 e 6', value: '5 e 6' },
        { title: '7 e 8', value: '7 e 8' },
        { title: '9 e 0', value: '9 e 0' },
    ],
    armor: [
        { title: 'Sim', value: 'Sim' },
        { title: 'Não', value: 'Não' },
    ],
    colors: [
        { title: 'Amarelo', value: 'Amarelo' },
        { title: 'Azul', value: 'Azul' },
        { title: 'Bege', value: 'Bege' },
        { title: 'Branco', value: 'Branco' },
    ],
    bodywork: [
        { title: 'Sedã', value: 'Sedã' },
        { title: 'Utilitário Esportivo', value: 'Utilitário Esportivo' },
        { title: 'Cupê', value: 'Cupê' },
    ],
    highlight: [
        { title: 'Único Dono', value: 'Único Dono' },
        { title: 'IPVA Pago', value: 'IPVA Pago' },
        { title: 'Não Aceita Troca', value: 'Não Aceita Troca' },
        { title: 'Licenciado', value: 'Licenciado' },
        { title: 'Veículo Financiado', value: 'Veículo Financiado' },
        { title: 'Garantia de Fábrica', value: 'Garantia de Fábrica' },
        { title: 'Todas Revisões em concessionária', value: 'Todas Revisões em concessionária' },
        {
            title: 'Adaptado para pessoas com deficiência',
            value: 'Adaptado para pessoas com deficiência',
        },

        { title: 'Veículo de Colecionados', value: 'Veículo de Colecionados' },
    ],
}

const Search = () => {
    const [amountColumns, setAmountColumns] = React.useState(4)
    const [visibleFilter, setVisibleFilter] = React.useState(window.innerWidth >= 1024)
    const [adverts, setAdverts] = React.useState<Array<IAdvert>>([])
    const [total, setTotal] = React.useState<number>(0)
    const [currentLocation, setCurrentLocation] = React.useState<string | null>(null)
    const [timer, setTimer] = React.useState<any>(null)
    const [sortByViews, setSortByViews] = React.useState<boolean | null>(null)

    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation()
    const { register, getValues, setValue } = useForm()
    const [page, setPage] = React.useState(2)

    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 512)
    const [isIPad, setIPad] = React.useState(window.innerWidth < 1024)

    const getLocation = async () => {
        navigator.geolocation.getCurrentPosition(async (position: any) => {
            fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
            )
                .then(async (res: any) => {
                    const data = await res.json()

                    setCurrentLocation(`${data.address.town}/${data.address.state}`)
                })
                .catch(() => {
                    toast.error('Erro ao pegar a localização')
                })
        })
    }

    const getParamsFormated = () => {
        let urlParam = '?'
        for (const params of searchParams.entries()) {
            const [param, value] = params

            urlParam = urlParam + `&${param}=${value}`
        }

        return urlParam
    }

    const getFormValues = () => {
        clearTimeout(timer)

        const newTimer = setTimeout(() => {
            const vehicleType = searchParams.get('vehicleType')
            let newUrlParams = `?vehicleType=${vehicleType}`
            Object.entries(getValues()).map((item, index) => {
                if (item[1] !== null && item[1] !== 'null') {
                    newUrlParams = newUrlParams + `&${item[0]}=${item[1]}`
                }
            })

            setSearchParams(newUrlParams)
        }, 1000)

        setTimer(newTimer)
    }

    const handleMore = async () => {
        if (adverts.length > 0) {
            const { data } = await api.get(
                `/api/v1/adverts${getParamsFormated()}&limit=10&page=${page}`
            )

            if (data) {
                setAdverts([...adverts, ...data.items])
                setPage((prev) => prev + 1)
            }
        }
    }

    React.useEffect(() => {
        setValue('exchange', searchParams.get('exchange'))
        setValue('armor', searchParams.get('armor'))
        setValue('bodywork', searchParams.get('bodywork'))
        setValue('highlight', searchParams.get('highlight'))
        setValue('options', searchParams.get('options'))
        setValue('fuel', searchParams.get('fuel'))
        setValue('finalPlate', searchParams.get('finalPlate'))
        setValue('colors', searchParams.get('colors'))
        setValue('withPhoto', searchParams.get('withPhoto'))
        const resizeListener = () => {
            if (window.innerWidth < 512) {
                setIsMobile(true)
            } else {
                setIsMobile(false)
            }

            if (window.innerWidth < 1024) {
                setIPad(true)
            } else {
                setIPad(false)
            }
        }
        window.addEventListener('resize', resizeListener)
        return () => {
            window.removeEventListener('resize', resizeListener)
        }
    }, [])

    React.useEffect(() => {
        setVisibleFilter(!isIPad)
    }, [isIPad])

    React.useEffect(() => {
        const getAdverts = async () => {
            const { data } = await api.get(`/api/v1/adverts${getParamsFormated()}&limit=10`)
            if (data) {
                setAdverts(data.items)
                setTotal(data.count)
                setPage(2)
            }
        }

        getAdverts()
    }, [location])

    const {
        exchange,
        armor,
        bodywork,
        highlight,
        seller,
        options,
        fuel,
        finalPlate,
        colors,
        withPhoto,
    } = getValues()

    return (
        <div className='bg-gray-900'>
            <section className='container mx-auto mt-[180px] grid grid-cols-none grid-rows-[50px_1fr] items-center border-y border-gray-700 py-10 pt-[30px] lg:grid-cols-[300px_1fr] lg:grid-rows-none'>
                <button
                    className='flex items-center justify-center gap-2 text-gray-400 md:justify-start lg:justify-center'
                    onClick={getLocation}
                    disabled={true}
                >
                    <IoLocationOutline className='text-lg' />
                    <span className='underline underline-offset-2'>
                        {currentLocation
                            ? currentLocation.split('/')[0]
                            : 'Escolha uma Localização'}
                    </span>
                </button>
                <div className='flex flex-col items-center justify-between gap-y-4 text-center md:flex-row md:text-left'>
                    <div className='text-gray-200'>
                        <p className='text-xl'>
                            {searchParams.get('title')
                                ? searchParams.get('title')
                                : 'Acho que você vai gostar'}{' '}
                            {currentLocation ? `em ${currentLocation}` : ''}
                        </p>
                        <p className='text-sm'>{total} veículos encontrados</p>
                    </div>
                    <div className='flex items-center gap-6 pr-5'>
                        <button
                            className={`hidden gap-[2px] text-gray-500 lg:flex [&>div]:hover:border-primary ${
                                amountColumns === 3 ? '[&>div]:border-primary' : ''
                            }`}
                            onClick={() => setAmountColumns(3)}
                        >
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className='ease h-[15px] w-[15px] rounded border border-gray-500 duration-200'
                                />
                            ))}
                        </button>
                        <button
                            className={`hidden gap-[2px] text-gray-500 lg:flex [&>div]:hover:border-primary ${
                                amountColumns === 4 ? '[&>div]:border-primary' : ''
                            }`}
                            onClick={() => setAmountColumns(4)}
                        >
                            {[1, 2, 3, 4].map((item) => (
                                <div
                                    key={item}
                                    className='ease h-[15px] w-[15px] rounded border border-gray-500 duration-200'
                                />
                            ))}
                        </button>
                        <button
                            className={`hidden gap-[2px] text-gray-500 lg:flex [&>div]:hover:border-primary ${
                                amountColumns === 5 ? '[&>div]:border-primary' : ''
                            }`}
                            onClick={() => setAmountColumns(5)}
                        >
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div
                                    key={item}
                                    className='ease h-[15px] w-[15px] rounded border border-gray-500 duration-200'
                                />
                            ))}
                        </button>
                        <button
                            className={`hidden gap-[2px] xs:flex lg:hidden [&>div]:hover:border-primary ${
                                amountColumns === 3 || amountColumns === 4 || amountColumns === 5
                                    ? '[&>div]:border-primary'
                                    : ''
                            }`}
                            onClick={() => setAmountColumns(3)}
                        >
                            <div className='ease h-[15px] w-[7px] rounded border border-gray-500 duration-200' />
                            <div className='ease h-[15px] w-[7px] rounded border border-gray-500 duration-200' />
                        </button>
                        <button
                            className={`hidden flex-col gap-[2px] xs:flex [&>div]:hover:border-primary ${
                                amountColumns === 1 ? '[&>div]:border-primary' : ''
                            }`}
                            onClick={() => setAmountColumns(1)}
                        >
                            <div className='ease h-[7px] w-[15px] rounded border border-gray-500 duration-200' />
                            <div className='ease h-[7px] w-[15px] rounded border border-gray-500 duration-200' />
                        </button>
                    </div>

                    <div className='flex items-center gap-6'>
                        <button
                            onClick={() => {
                                setVisibleFilter(!visibleFilter)
                            }}
                        >
                            <Filter color={visibleFilter ? '#F3722C' : '#484854'} />
                        </button>
                        <button
                            className='ml-5 flex items-center gap-[2px] text-sm text-gray-200'
                            onClick={() => setSortByViews(!sortByViews)}
                        >
                            Mais Relevantes
                            {sortByViews ? (
                                <IoChevronDownOutline className='text-lg' />
                            ) : (
                                <IoChevronUpOutline className='text-lg' />
                            )}
                        </button>
                    </div>
                </div>
            </section>
            <section
                className={`container mx-auto grid grid-cols-1 gap-8 ${
                    visibleFilter ? ' lg:grid-cols-[325px_1fr]' : ''
                } relative`}
            >
                <form
                    className={`bg-white ${
                        visibleFilter ? 'w-full lg:block' : 'w-0 lg:hidden'
                    } absolute z-10 overflow-hidden transition-[width] duration-500 lg:static lg:w-auto`}
                    onChange={getFormValues}
                >
                    <div className='py-10 px-3'>
                        <div className='flex h-20 w-full items-center justify-end px-5 lg:hidden'>
                            <div className='mr-2'>
                                Clique aqui para recolher este painel de filtro.
                            </div>
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (window.innerWidth < 1024 && visibleFilter) {
                                        setVisibleFilter(false)
                                    }
                                }}
                            >
                                <CloseIcon sx={{ color: 'black' }} />
                            </button>
                        </div>
                        <Button className='my-5 w-full !bg-primary !px-10 font-semibold text-white'>
                            Buscar Veículos
                        </Button>
                        {/* <div className='border-b border-gray-700 pb-10'>
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
                    </div> */}
                        <div className='border-b border-gray-700 pb-10'>
                            <p className='mb-3 text-sm font-medium text-gray-200'>Pesquisa</p>
                            <label>
                                <Input
                                    placeholder='Pesquisa'
                                    className='!rounded border-2 !border-gray-700 !py-2 !px-3'
                                    classInput='placeholder:text-gray-600 !text-sm'
                                    defaultValue={searchParams.get('title') ?? ''}
                                    {...register('title')}
                                />
                                <span className='text-xs text-gray-500'>ex: Honda Civic</span>
                            </label>
                        </div>
                        <div className='border-b border-gray-700 py-10'>
                            <p className='mb-3 text-sm font-medium text-gray-200'>Ano</p>
                            <div className='grid grid-cols-2 gap-4'>
                                <label>
                                    <Input
                                        placeholder='de'
                                        className='!rounded border-2 !border-gray-700 !py-2 !px-3'
                                        classInput='placeholder:text-gray-600 !text-sm'
                                        {...register('minYear')}
                                    />
                                    <span className='text-xs text-gray-500'>ex: 2012</span>
                                </label>
                                <label>
                                    <Input
                                        placeholder='até'
                                        className='!rounded border-2 !border-gray-700 !py-2 !px-3'
                                        classInput='placeholder:text-gray-600 !text-sm'
                                        {...register('maxYear')}
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
                                        {...register('minPrice')}
                                    />
                                    <span className='text-xs text-gray-500'>ex: 15.000</span>
                                </label>
                                <label>
                                    <Input
                                        placeholder='até'
                                        className='!rounded border-2 !border-gray-700 !py-2 !px-3'
                                        classInput='placeholder:text-gray-600 !text-sm'
                                        {...register('maxPrice')}
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
                                        {...register('minKilometer')}
                                    />
                                    <span className='text-xs text-gray-500'>ex: 10.000</span>
                                </label>
                                <label>
                                    <Input
                                        placeholder='até'
                                        className='!rounded border-2 !border-gray-700 !py-2 !px-3'
                                        classInput='placeholder:text-gray-600 !text-sm'
                                        {...register('maxKilometer')}
                                    />
                                    <span className='text-xs text-gray-500'>ex: 50.000</span>
                                </label>
                            </div>
                        </div>
                        <div className='border-b border-gray-700 py-10'>
                            <CategroyGroup
                                items={checkboxFields.seller}
                                currentItem={seller}
                                title='Vendedor'
                                displayItems={3}
                                {...register('seller')}
                            />
                        </div>
                        <div className='border-b border-gray-700 py-10'>
                            <CategroyGroup
                                items={checkboxFields.options}
                                currentItem={options}
                                title='Opcionais'
                                displayItems={4}
                                {...register('options')}
                            />
                        </div>
                        <div className='border-b border-gray-700 py-10'>
                            <CategroyGroup
                                items={checkboxFields.exchange}
                                currentItem={exchange}
                                title='Câmbio'
                                displayItems={5}
                                {...register('exchange')}
                            />
                        </div>
                        <div className='border-b border-gray-700 py-10'>
                            <CategroyGroup
                                items={checkboxFields.fuel}
                                currentItem={fuel}
                                title='Combustível'
                                displayItems={4}
                                {...register('fuel')}
                            />
                        </div>
                        <div className='border-b border-gray-700 py-10'>
                            <CategroyGroup
                                items={checkboxFields.finalPlate}
                                currentItem={finalPlate}
                                title='Final da Placa'
                                displayItems={5}
                                {...register('finalPlate')}
                            />
                        </div>
                        <div className='border-b border-gray-700 py-10'>
                            <CategroyGroup
                                items={checkboxFields.armor}
                                currentItem={armor}
                                title='Blindagem'
                                inline={true}
                                {...register('armor')}
                            />
                        </div>
                        <div className='border-b border-gray-700 py-10'>
                            <CategroyGroup
                                items={checkboxFields.colors}
                                currentItem={colors}
                                title='Cores'
                                {...register('colors')}
                            />
                        </div>
                        <div className='border-b border-gray-700 py-10'>
                            <CategroyGroup
                                items={checkboxFields.bodywork}
                                currentItem={bodywork}
                                title='Carroceria'
                                displayItems={3}
                                {...register('bodywork')}
                            />
                        </div>
                        <div className='border-b border-gray-700 py-10'>
                            <CategroyGroup
                                items={checkboxFields.highlight}
                                currentItem={highlight}
                                title='Características'
                                displayItems={4}
                                {...register('highlight')}
                            />
                        </div>
                        <div className='border-b border-gray-700 py-10'>
                            <label role='button' className='text-sm font-medium text-gray-400'>
                                <Checkbox
                                    checked={withPhoto === 'true' || withPhoto === true}
                                    {...register('withPhoto')}
                                />
                                {'Apenas anúncios com foto'}
                            </label>
                        </div>
                        <button className='mt-8 flex items-center gap-2 text-gray-400'>
                            Limpar filtros
                            <IoCloseOutline />
                        </button>
                    </div>
                </form>
                <div className={`${!visibleFilter ? 'flex justify-center' : ''} mb-20`}>
                    <InfiniteScroll
                        dataLength={adverts.length}
                        hasMore={true}
                        loader={null}
                        next={handleMore}
                        className={`grid grid-cols-1 ${
                            amountColumns === 1
                                ? ''
                                : `grid-cols-1 xs:grid-cols-2 md:grid-cols-3 ${
                                      gridCols[amountColumns - 3]
                                  }`
                        } mt-10 h-max gap-x-4 gap-y-8 ${!visibleFilter ? 'max-w-[1200px]' : ''}`}
                    >
                        {adverts
                            .sort((a, b) => {
                                if (sortByViews === true) {
                                    return b.views - a.views
                                } else if (sortByViews === false) {
                                    return a.views - b.views
                                } else {
                                    return 0
                                }
                            })
                            .map((item) => (
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
                                    className='h-max'
                                >
                                    <Card
                                        data={{
                                            id: item.id,
                                            images: item.images,
                                            title: item.title,
                                            price: item.value,
                                            description: item.version,
                                            distance: item.kilometer,
                                            location: `${item.city} - ${item.state}`,
                                            year: item.modelYear,
                                        }}
                                        inline={isMobile || amountColumns === 1}
                                        inverseColors={true}
                                    />
                                </Link>
                            ))}
                    </InfiniteScroll>
                </div>
            </section>
        </div>
    )
}

export default Search
