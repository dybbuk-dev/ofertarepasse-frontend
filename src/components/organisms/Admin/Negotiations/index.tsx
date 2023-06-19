import Select from 'components/atoms/Select'
import * as React from 'react'
import InputMask from 'react-input-mask'
import { MdOutlineCloudDownload } from 'react-icons/md'
import InputSimple from 'components/atoms/Input/Simple'
import MenInCar from 'assets/images/men_in_car.png'
import Checkbox from 'components/atoms/Input/Checkbox'
import { IoPencil, IoTrashOutline } from 'react-icons/io5'
import api from 'services/api'
import { useAuth } from 'hooks/auth'

const Negotiations = () => {
    const { user } = useAuth()
    const [filter, setFilter] = React.useState({
        action: '',
    })

    const titlesTable = ['', 'Anunciante', 'Cliente', 'Status', 'Veículo', 'Valor', 'Criado em', '']

    const items = [
        {
            advertiser: {
                image: MenInCar,
                name: 'Italo Eduardo',
            },
            customer: {
                image: MenInCar,
                name: 'Ibisem Alves',
            },
            status: 'Processando',
            vehicle: 'Honda Civic',
            value: 89.9,
            createdAt: Date.now(),
        },
        {
            advertiser: {
                image: MenInCar,
                name: 'Italo Eduardo',
            },
            customer: {
                image: MenInCar,
                name: 'Ibisem Alves',
            },
            status: 'Finalizada',
            vehicle: 'Honda Civic',
            value: 89.9,
            createdAt: Date.now(),
        },
        {
            advertiser: {
                image: MenInCar,
                name: 'Italo Eduardo',
            },
            customer: {
                image: MenInCar,
                name: 'Ibisem Alves',
            },
            status: 'Em Análise',
            vehicle: 'Honda Civic',
            value: 89.9,
            createdAt: Date.now(),
        },
        {
            advertiser: {
                image: MenInCar,
                name: 'Italo Eduardo',
            },
            customer: {
                image: MenInCar,
                name: 'Ibisem Alves',
            },
            status: 'Cancelada',
            vehicle: 'Honda Civic',
            value: 89.9,
            createdAt: Date.now(),
        },
        {
            advertiser: {
                image: MenInCar,
                name: 'Italo Eduardo',
            },
            customer: {
                image: MenInCar,
                name: 'Ibisem Alves',
            },
            status: 'Finalizada',
            vehicle: 'Honda Civic',
            value: 89.9,
            createdAt: Date.now(),
        },
        {
            advertiser: {
                image: MenInCar,
                name: 'Italo Eduardo',
            },
            customer: {
                image: MenInCar,
                name: 'Ibisem Alves',
            },
            status: 'Cancelada',
            vehicle: 'Honda Civic',
            value: 89.9,
            createdAt: Date.now(),
        },
        {
            advertiser: {
                image: MenInCar,
                name: 'Italo Eduardo',
            },
            customer: {
                image: MenInCar,
                name: 'Ibisem Alves',
            },
            status: 'Cancelada',
            vehicle: 'Honda Civic',
            value: 89.9,
            createdAt: Date.now(),
        },
        {
            advertiser: {
                image: MenInCar,
                name: 'Italo Eduardo',
            },
            customer: {
                image: MenInCar,
                name: 'Ibisem Alves',
            },
            status: 'Cancelada',
            vehicle: 'Honda Civic',
            value: 89.9,
            createdAt: Date.now(),
        },
    ]

    React.useEffect(() => {
        // api.get('/api/v1/negociations', {
        //     params: {
        //         userId: user?.id,
        //     },
        // })
    }, [])

    return (
        <div>
            <div className='flex flex-col items-start justify-between sm:flex-row sm:items-center'>
                <div className='w-full text-center xs:text-left'>
                    {' '}
                    <span className='text-xl font-light text-gray-200 xs:text-2xl md:text-3xl'>
                        Negociações
                    </span>
                    <p className='mt-3 text-sm text-gray-200'>
                        Total de <span className='font-semibold'>5.693</span> registros entre{' '}
                        <span className='font-semibold'>05/12/2022</span> e{' '}
                        <span className='font-semibold'>04/01/2023</span>
                    </p>
                </div>
                <div className='mx-auto flex flex-col gap-x-2 xs:mx-0 xs:flex-row xs:items-center sm:flex-col sm:items-start'>
                    <span className='text-sm font-medium'>Período</span>
                    <div className='mt-2 flex gap-3'>
                        <div className='relative flex w-[125px] items-center overflow-hidden rounded border border-gray-100'>
                            <InputMask
                                mask='99/99/9999'
                                className='w-full py-2 pl-8 text-sm text-gray-100 outline-none'
                            />
                            <p className='absolute left-3 text-sm text-gray-100'>de</p>
                        </div>
                        <div className='relative flex w-[125px] items-center overflow-hidden rounded border border-gray-100'>
                            <InputMask
                                mask='99/99/9999'
                                className='w-full py-2 pl-8 text-sm text-gray-100 outline-none'
                            />
                            <p className='absolute left-2 text-sm text-gray-100'>até</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-2 mb-2 grid grid-cols-1 grid-rows-5 gap-3 xs:mt-4 xs:mb-3 xs:grid-cols-2 xs:grid-rows-3 md:mt-8 md:mb-5 md:grid-cols-4 md:grid-rows-2 2xl:grid-cols-[auto_1fr_auto_auto_auto] 2xl:grid-rows-none'>
                <div className='order-1 flex xs:order-2 2xl:order-1'>
                    <Select label='Ação' onChange={(e) => setFilter({ ...filter, action: e })} />
                </div>
                <InputSimple
                    className='cols-span-1 order-2 rounded-xl bg-white px-5 py-3 xs:order-1 xs:col-span-2 md:col-span-4 2xl:order-2 2xl:col-span-1'
                    placeholder='Faça uma busca por nome, local, telefone, e-mail'
                />
                <div className='order-3 flex'>
                    <Select
                        label='100 registros'
                        onChange={(e) => setFilter({ ...filter, action: e })}
                    />
                </div>
                <button className='order-4 flex h-full items-center justify-center gap-1 rounded-xl bg-white px-8 text-gray-200'>
                    <MdOutlineCloudDownload className='text-xl' />
                    Exportar
                </button>
                <div className='order-5 flex'>
                    <Select
                        label='Ordenar por'
                        onChange={(e) => setFilter({ ...filter, action: e })}
                    />
                </div>
            </div>
            <div className='mb-10 w-full overflow-x-scroll rounded-xl bg-white'>
                <table className='w-full min-w-[900px]'>
                    <tr className='border-b border-gray-900'>
                        {titlesTable.map((item, index) => (
                            <th
                                key={item}
                                className={`py-6 text-left text-sm font-medium capitalize text-black ${
                                    index === 0 ? 'w-[60px]' : 'w-max'
                                }`}
                            >
                                {item}
                            </th>
                        ))}
                    </tr>
                    {items.map((item, index) => {
                        const statusColor = {
                            text: '#484854',
                            background: '#F9F9F9',
                        }

                        switch (item.status.toLowerCase()) {
                            case 'finalizada':
                                statusColor.text = '#83BF6E'
                                statusColor.background = '#ECF5E9'
                                break
                            case 'em análise':
                                statusColor.text = '#F3BB2C'
                                statusColor.background = '#FEF9EE'
                                break
                            case 'cancelada':
                                statusColor.text = '#FF6A55'
                                statusColor.background = '#FEF8F4'
                                break

                            default:
                                break
                        }

                        return (
                            <tr
                                key={index}
                                className='border-b border-gray-900 text-smd text-gray-500 last:border-none'
                            >
                                <td className='pl-2'>
                                    <Checkbox />
                                </td>
                                <td className='flex w-max items-center justify-between py-6'>
                                    <div className='flex w-max items-center gap-2'>
                                        <img
                                            src={item.advertiser.image}
                                            alt={`Foto de ${item.advertiser}`}
                                            className='h-[35px] w-[35px] rounded-full object-cover'
                                        />
                                        <p className='text-black'>{item.advertiser.name}</p>
                                    </div>
                                </td>
                                <td>
                                    <div className='flex items-center gap-2 py-6'>
                                        <img
                                            src={item.customer.image}
                                            alt={`Foto de ${item.customer}`}
                                            className='h-[35px] w-[35px] rounded-full object-cover'
                                        />
                                        <p className='text-black'>{item.customer.name}</p>
                                    </div>
                                </td>
                                <td>
                                    <div
                                        className='flex w-max items-center gap-2 rounded-full px-4 py-1 text-sm'
                                        style={{
                                            background: statusColor.background,
                                            color: statusColor.text,
                                        }}
                                    >
                                        <div
                                            className={'h-[8px] w-[8px] rounded-full'}
                                            style={{
                                                background: statusColor.text,
                                            }}
                                        />
                                        <span>{item.status}</span>
                                        <IoPencil />
                                    </div>
                                </td>
                                <td>
                                    <span>{item.vehicle}</span>
                                </td>
                                <td>
                                    <span>R${item.value.toFixed(3)}</span>
                                </td>
                                <td>
                                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                                </td>
                                <td>
                                    <IoTrashOutline
                                        role='button'
                                        className='text-2xl hover:text-primary'
                                    />
                                </td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    )
}

export default Negotiations
