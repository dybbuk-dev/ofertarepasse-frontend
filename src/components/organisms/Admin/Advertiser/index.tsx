/* eslint-disable @typescript-eslint/no-explicit-any */
// import Select from 'components/atoms/Select'
import * as React from 'react'
// import InputMask from 'react-input-mask'
import { MdOutlineCloudDownload } from 'react-icons/md'
import InputSimple from 'components/atoms/Input/Simple'
import Checkbox from 'components/atoms/Input/Checkbox'
import {
    // IoCloseCircleOutline,
    // IoCreateOutline,
    IoTrashOutline,
} from 'react-icons/io5'
import InfiniteScroll from 'react-infinite-scroll-component'
import { IUser } from 'contexts/auth'
import { INegociations } from 'components/organisms/Dashboard/Sold'
import { IAdvert } from 'components/organisms/Dashboard/Adverts'
import api from 'services/api'
import { toast } from 'react-toastify'
import getUrlAws from 'utils/getUrlAws'
import DefaultProfile from 'assets/images/defaultProfile.png'
import Modal from 'components/atoms/Modal'
import Button from 'components/atoms/Button'

interface IAdvertisers extends IUser {
    negociations: Array<INegociations>
    adverts: Array<IAdvert>
}

const Advertiser = () => {
    const [advertisers, setAdvertisers] = React.useState<Array<IAdvertisers>>([])
    const [amount, setAmount] = React.useState<number>(0)
    const [page, setPage] = React.useState(2)
    const [filter, setFilter] = React.useState({
        action: '',
        search: '',
    })
    const [advertiserSelected, setAdvertiserSelected] = React.useState<string | null>(null)

    const titlesTable = [
        '',
        'Nome',
        'Anúncios Ativos',
        'Negociações',
        'Telefone',
        'Criado em',
        'Gerenciar',
    ]

    const getAdvertisers = async () => {
        try {
            const { data } = await api.get('/api/v1/advertisers?page=1&limit=10')

            setAdvertisers(data.items)
            setAmount(data.meta.itemCount)
        } catch (_) {
            toast.error('Erro ao trazer os anúnciantes')
        }
    }

    const handleMore = async () => {
        if (advertisers) {
            const { data } = await api.get(`/api/v1/advertisers?page=${page}&limit=10`)

            if (data) {
                setAdvertisers([...advertisers, ...data.data])
                setPage((prev) => prev + 1)
            }
        }
    }

    const handleRemove = async () => {
        try {
            await api.delete(`/api/v1/advertisers/${advertiserSelected}`)

            setAdvertisers(advertisers.filter((item) => item.id !== advertiserSelected))
            setAmount((prev) => prev - 1)

            toast.success('Anúnciante excluido')
            setAdvertiserSelected(null)
        } catch (err: any) {
            toast.error(err.response.data.message)
        }
    }

    React.useEffect(() => {
        getAdvertisers()
    }, [])

    React.useEffect(() => {
        const getAdvertsSearch = async () => {
            try {
                const { data } = await api.get(
                    `/api/v1/advertisers?search=${filter.search}&limit=30`
                )

                setAdvertisers(data.items)
                setAmount(data.meta.itemCount)
            } catch (_) {
                toast.error('Erro ao trazer os anúncios pesquisados')
            }
        }

        if (filter.search !== '') {
            getAdvertsSearch()
        } else {
            setPage(2)
            getAdvertisers()
        }
    }, [filter.search])

    return (
        <div>
            {advertiserSelected && (
                <Modal title='Excluir Anunciante' onClose={() => setAdvertiserSelected(null)}>
                    <div className='w-[400px]'>
                        <p className='text-gray-500'>
                            Ao excluir um anúnciante todos os anúncios e negociações serão
                            excluidas. <br />
                            Tem certeza que deseja continuar?
                        </p>
                        <div className='mt-8 flex flex-row gap-x-2'>
                            <Button
                                className='bg-gray-500 text-white'
                                onClick={() => setAdvertiserSelected(null)}
                            >
                                <span>Não</span>
                            </Button>
                            <Button className='bg-primary text-white' onClick={handleRemove}>
                                <span>Sim</span>
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
            <div className='flex items-center justify-between'>
                <div>
                    <span className='text-3xl font-light text-gray-200'>Anunciantes</span>
                    <p className='mt-3 text-sm text-gray-200'>
                        Total de <span className='font-semibold'>{amount}</span> registros
                        {/* entre{' '}
                        <span className='font-semibold'>05/12/2022</span> e{' '}
                        <span className='font-semibold'>04/01/2023</span> */}
                    </p>
                </div>
                {/* <div>
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
                </div> */}
            </div>
            <div className='mt-8 mb-5 grid grid-cols-[1fr_auto] gap-x-3'>
                {/* <Select label='Ação' onChange={(e) => setFilter({ ...filter, action: e })} /> */}
                <InputSimple
                    className='rounded-xl bg-white px-5 py-3'
                    placeholder='Faça uma busca por nome, local, telefone, e-mail'
                    value={filter.search}
                    onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                />
                <button className='flex h-full items-center gap-1 rounded-xl bg-white px-8 text-gray-200'>
                    <MdOutlineCloudDownload className='text-xl' />
                    Exportar
                </button>
            </div>
            <div className='mb-10 rounded-xl bg-white'>
                <InfiniteScroll
                    dataLength={advertisers.length}
                    next={handleMore}
                    hasMore={true}
                    loader={null}
                >
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
                        {advertisers.map((item, index) => (
                            <tr
                                key={index}
                                className='border-b border-gray-900 text-smd text-gray-500 last:border-none'
                            >
                                <td className='pl-2'>
                                    <Checkbox />
                                </td>
                                <td className='flex items-center gap-2 py-6'>
                                    <img
                                        src={item.image ? getUrlAws(item.image) : DefaultProfile}
                                        alt={`Foto de ${item.name}`}
                                        className='h-[35px] w-[35px] rounded-full object-cover'
                                    />
                                    <p className='text-black'>{item.name}</p>
                                </td>
                                <td>
                                    <span>
                                        {item.adverts.length}{' '}
                                        {item.adverts.length > 1 ? 'anúncios' : 'anúncio'}
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        {item.negociations.length}{' '}
                                        {item.negociations.length > 1
                                            ? 'negociações'
                                            : 'negociação'}
                                    </span>
                                </td>
                                <td>
                                    <span>{item.phone ?? '--------'}</span>
                                </td>
                                <td>
                                    <span>{new Date(item.created_at).toLocaleDateString()}</span>
                                </td>
                                <td>
                                    <div className='flex gap-3 text-lg'>
                                        {/* <IoCloseCircleOutline
                                            role='button'
                                            className='hover:text-primary'
                                        /> */}
                                        <IoTrashOutline
                                            role='button'
                                            className='hover:text-primary'
                                            onClick={() => setAdvertiserSelected(item.id)}
                                        />
                                        {/* <IoCreateOutline
                                            role='button'
                                            className='hover:text-primary'
                                        /> */}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </table>
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default Advertiser
