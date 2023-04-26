import Select from 'components/atoms/Select'
import * as React from 'react'
import InputMask from 'react-input-mask'
import { MdOutlineCloudDownload } from 'react-icons/md'
import InputSimple from 'components/atoms/Input/Simple'
import MenInCar from 'assets/images/men_in_car.png'
import Checkbox from 'components/atoms/Input/Checkbox'
import { IoCloseCircleOutline, IoCreateOutline, IoTrashOutline } from 'react-icons/io5'

const Advertiser = () => {
    const [filter, setFilter] = React.useState({
        action: '',
    })

    const titlesTable = [
        '',
        'Nome',
        'Status',
        'Anúncios Ativos',
        'Negociações',
        'Telefone',
        'Criado em',
        'Gerenciar',
    ]

    const items = [
        {
            image: MenInCar,
            name: 'Miguel Henrique',
            active: true,
            amountAdverts: 18,
            negotiations: 10,
            phone: '(00) 00000-0000',
            createdAt: Date.now(),
        },
        {
            image: MenInCar,
            name: 'Miguel Henrique',
            active: false,
            amountAdverts: 18,
            negotiations: 10,
            phone: '(00) 00000-0000',
            createdAt: Date.now(),
        },
        {
            image: MenInCar,
            name: 'Miguel Henrique',
            active: true,
            amountAdverts: 18,
            negotiations: 10,
            phone: '(00) 00000-0000',
            createdAt: Date.now(),
        },
        {
            image: MenInCar,
            name: 'Miguel Henrique',
            active: true,
            amountAdverts: 18,
            negotiations: 10,
            phone: '(00) 00000-0000',
            createdAt: Date.now(),
        },
        {
            image: MenInCar,
            name: 'Miguel Henrique',
            active: true,
            amountAdverts: 18,
            negotiations: 10,
            phone: '(00) 00000-0000',
            createdAt: Date.now(),
        },
        {
            image: MenInCar,
            name: 'Miguel Henrique',
            active: true,
            amountAdverts: 18,
            negotiations: 10,
            phone: '(00) 00000-0000',
            createdAt: Date.now(),
        },
        {
            image: MenInCar,
            name: 'Miguel Henrique',
            active: true,
            amountAdverts: 18,
            negotiations: 10,
            phone: '(00) 00000-0000',
            createdAt: Date.now(),
        },
        {
            image: MenInCar,
            name: 'Miguel Henrique',
            active: false,
            amountAdverts: 18,
            negotiations: 10,
            phone: '(00) 00000-0000',
            createdAt: Date.now(),
        },
        {
            image: MenInCar,
            name: 'Miguel Henrique',
            active: false,
            amountAdverts: 18,
            negotiations: 10,
            phone: '(00) 00000-0000',
            createdAt: Date.now(),
        },
        {
            image: MenInCar,
            name: 'Miguel Henrique',
            active: false,
            amountAdverts: 18,
            negotiations: 10,
            phone: '(00) 00000-0000',
            createdAt: Date.now(),
        },
        {
            image: MenInCar,
            name: 'Miguel Henrique',
            active: true,
            amountAdverts: 18,
            negotiations: 10,
            phone: '(00) 00000-0000',
            createdAt: Date.now(),
        },
        {
            image: MenInCar,
            name: 'Miguel Henrique',
            active: false,
            amountAdverts: 18,
            negotiations: 10,
            phone: '(00) 00000-0000',
            createdAt: Date.now(),
        },
    ]

    return (
        <div>
            <div className='flex items-center justify-between'>
                <div>
                    <span className='text-3xl font-light text-gray-200'>Anunciantes</span>
                    <p className='mt-3 text-sm text-gray-200'>
                        Total de <span className='font-semibold'>5.693</span> registros entre{' '}
                        <span className='font-semibold'>05/12/2022</span> e{' '}
                        <span className='font-semibold'>04/01/2023</span>
                    </p>
                </div>
                <div>
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
            <div className='mt-8 mb-5 grid grid-cols-[auto_1fr_auto_auto_auto] gap-3'>
                <Select label='Ação' onChange={(e) => setFilter({ ...filter, action: e })} />
                <InputSimple
                    className='rounded-xl bg-white px-5 py-3'
                    placeholder='Faça uma busca por nome, local, telefone, e-mail'
                />
                <Select
                    label='100 registros'
                    onChange={(e) => setFilter({ ...filter, action: e })}
                />
                <button className='flex h-full items-center gap-1 rounded-xl bg-white px-8 text-gray-200'>
                    <MdOutlineCloudDownload className='text-xl' />
                    Exportar
                </button>
                <Select label='Ordenar por' onChange={(e) => setFilter({ ...filter, action: e })} />
            </div>
            <div className='mb-10 rounded-xl bg-white'>
                <table className='w-full'>
                    <tr className='border-b border-gray-900'>
                        {titlesTable.map((item) => (
                            <th
                                key={item}
                                className={`py-6 text-left text-sm font-medium capitalize text-black ${
                                    item === '' ? 'w-[60px]' : 'w-auto'
                                }`}
                            >
                                {item}
                            </th>
                        ))}
                    </tr>
                    {items.map((item, index) => (
                        <tr
                            key={index}
                            className='border-b border-gray-900 text-smd text-gray-500 last:border-none'
                        >
                            <td className='pl-2'>
                                <Checkbox />
                            </td>
                            <td className='flex items-center gap-2 py-6'>
                                <img
                                    src={item.image}
                                    alt={`Foto de ${item.name}`}
                                    className='h-[35px] w-[35px] rounded-full object-cover'
                                />
                                <p className='text-black'>{item.name}</p>
                            </td>
                            <td>
                                <div
                                    className={`flex w-max items-center gap-2 rounded-full ${
                                        item.active ? 'bg-green-100' : 'bg-gray-900'
                                    } px-4 py-1`}
                                >
                                    <div
                                        className={`h-[8px] w-[8px] rounded-full ${
                                            item.active ? 'bg-green' : 'bg-gray-600'
                                        }`}
                                    />
                                    <span
                                        className={` ${
                                            item.active ? 'text-green' : 'text-gray-600'
                                        }`}
                                    >
                                        {item.active ? 'Online' : 'Offline'}
                                    </span>
                                </div>
                            </td>
                            <td>
                                <span>
                                    {item.amountAdverts}{' '}
                                    {item.amountAdverts > 1 ? 'anúncios' : 'anúncio'}
                                </span>
                            </td>
                            <td>
                                <span>
                                    {item.negotiations}{' '}
                                    {item.negotiations > 1 ? 'negociações' : 'negociação'}
                                </span>
                            </td>
                            <td>
                                <span>{item.phone}</span>
                            </td>
                            <td>
                                <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                            </td>
                            <td>
                                <div className='flex gap-3 text-lg '>
                                    <IoCloseCircleOutline
                                        role='button'
                                        className='hover:text-primary'
                                    />
                                    <IoTrashOutline role='button' className='hover:text-primary' />
                                    <IoCreateOutline role='button' className='hover:text-primary' />
                                </div>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default Advertiser
