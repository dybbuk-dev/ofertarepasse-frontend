import { IoArrowDownOutline, IoArrowUpOutline, IoPencil, IoTrashOutline } from 'react-icons/io5'
import CountUp from 'react-countup'
import DefaultProfile from 'assets/images/defaultProfile.png'
import Target from 'assets/icon/Target'
import Eye from 'assets/icon/Eye'
import * as React from 'react'
import api from 'services/api'
import { IAdvert } from '../Adverts'
import { useAuth } from 'hooks/auth'
import formatMoney from 'utils/formatMoney'
import { Link } from 'react-router-dom'
import WithoutImage from 'assets/images/withoutImage.png'
import getUrlAws from 'utils/getUrlAws'
import { IUser } from 'contexts/auth'

interface IAdvertsData {
    count: number
    items: Array<IAdvert>
}

interface IAdvertNegociation extends IAdvert {
    user: IUser
}

interface INegociations {
    advert: IAdvertNegociation
    createdAt: string
    id: string
    status: string
    updateAt: string
    value: number
    user: IUser
}

const HomeDashboard = () => {
    const [adverts, setAdverts] = React.useState<IAdvertsData | null>(null)
    const [totalView, setTotalView] = React.useState(0)
    const [negotiations, setNegotiations] = React.useState<Array<INegociations> | null>(null)

    const { user } = useAuth()

    React.useEffect(() => {
        const getAdverts = async () => {
            const { data } = await api.get(`/api/v1/adverts?limit=5&userId=${user?.id}`)

            if (data) {
                setAdverts({
                    count: data.count,
                    items: data.items,
                })
            }
        }

        const getNegociations = async () => {
            const { data } = await api.get(`/api/v1/negociations?limit=5&userId=${user?.id}`)

            if (data) {
                setNegotiations(data)
            }
        }

        const getViews = async () => {
            const { data } = await api.post(`/api/v1/adverts/views?id=${user?.id}`)

            if (data && !data.error) {
                setTotalView(data.count)
            }
        }

        if (user) {
            getAdverts()
            getNegociations()
            getViews()
        }
    }, [user])

    const titlesTable = [
        'Veículo',
        'Proposta',
        'Vizualizações',
        'Valor',
        'Status',
        'Criado em',
        'Gerenciar',
    ]

    const titlesTableNegotiations = [
        'Veículo',
        'Valor',
        'Anunciante',
        'Cliente',
        'Status',
        'Criado em',
    ]

    return (
        <div>
            <section className='text-gray-200'>
                <span className='mr-4 text-3xl font-light'>Dashboard</span>
                <span className='text-lg font-light'>
                    Seja bem-vindo, {user?.name.split(' ')[0]}!
                </span>
                <div className='mt-10 grid grid-cols-3 rounded-2xl bg-white py-10 px-16'>
                    <div>
                        <div className='flex items-center gap-1'>
                            <CountUp start={0} end={adverts?.count ?? 0} duration={1}>
                                {({ countUpRef }) => (
                                    <span className='text-6xl font-medium' ref={countUpRef} />
                                )}
                            </CountUp>
                            <div className='flex w-max items-center rounded-full bg-gray-900 px-3 py-1 text-sm text-green'>
                                <IoArrowUpOutline />
                                28%
                            </div>
                        </div>
                        <p className='mt-4 text-sm font-medium'>anúncios ativos</p>
                    </div>
                    <div className='justify-self-center'>
                        <div className='flex items-center gap-1'>
                            <CountUp start={0} end={totalView} duration={1}>
                                {({ countUpRef }) => (
                                    <span className='text-6xl font-medium' ref={countUpRef} />
                                )}
                            </CountUp>
                            <div className='flex w-max items-center rounded-full bg-gray-900 px-3 py-1 text-sm text-green'>
                                <IoArrowUpOutline />
                                15%
                            </div>
                        </div>
                        <p className='mt-4 text-sm font-medium'>visualizações em anúncios</p>
                    </div>
                    <div className='justify-self-end'>
                        <div className='flex items-center gap-1'>
                            <CountUp start={0} end={0} duration={1}>
                                {({ countUpRef }) => (
                                    <span className='text-6xl font-medium' ref={countUpRef} />
                                )}
                            </CountUp>
                            <div className='flex w-max items-center rounded-full bg-gray-900 px-3 py-1 text-sm text-red-500'>
                                <IoArrowDownOutline />
                                10%
                            </div>
                        </div>
                        <p className='mt-4 text-sm font-medium'>negociações este mês</p>
                    </div>
                </div>
            </section>
            {adverts && adverts?.count > 0 ? (
                <section className='mt-20'>
                    <span className='text-2xl font-light'>Meus Anúncios</span>
                    <div className='my-10 rounded-xl bg-white'>
                        <table className='w-full'>
                            <thead>
                                <tr className='border-b border-gray-900'>
                                    {titlesTable.map((item, index) => (
                                        <th
                                            key={item}
                                            className={`py-6 text-left text-sm font-medium capitalize text-black ${
                                                index === 0 ? 'pl-6' : ''
                                            }`}
                                        >
                                            {item}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {adverts?.items.map((item, index) => (
                                    <tr
                                        key={index}
                                        className='border-b border-gray-900 text-smd text-gray-500 last:border-none'
                                    >
                                        <td className='py-6 pl-6'>
                                            <div className='flex items-center gap-2'>
                                                <img
                                                    src={
                                                        item.images
                                                            ? getUrlAws(item.images[0])
                                                            : WithoutImage
                                                    }
                                                    className='h-[40px] w-[60px] rounded-lg object-cover'
                                                />
                                                <div>
                                                    <p className='text-smd text-gray-400'>
                                                        {item.title}
                                                    </p>
                                                    <p className='text-xs text-gray-500 line-clamp-1'>
                                                        {item.model}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='flex items-center gap-1'>
                                                <Target />
                                                <span>0</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='flex items-center gap-1'>
                                                <Eye />
                                                <span>{item.views}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className='font-bold text-gray-400'>
                                                {formatMoney(item.value)}
                                            </span>
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
                                                    {item.active ? 'Ativo' : 'Inativo'}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <span>
                                                {new Date(item.createdAt).toLocaleDateString()}
                                            </span>
                                        </td>
                                        <td>
                                            <div className='flex items-center gap-2'>
                                                <IoTrashOutline
                                                    role='button'
                                                    className='text-xl hover:text-primary'
                                                />
                                                <Link
                                                    to={`/dashboard/adverts/create?id=${item.id}`}
                                                >
                                                    <IoPencil
                                                        role='button'
                                                        className='text-xl hover:text-primary'
                                                    />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            ) : null}
            {negotiations && negotiations.length > 0 ? (
                <section className='mt-20'>
                    <span className='text-2xl font-light'>Minhas Negociações</span>
                    <div className='mt-10 rounded-xl bg-white'>
                        <table className='w-full'>
                            <thead>
                                <tr className='border-b border-gray-900'>
                                    {titlesTableNegotiations.map((item, index) => (
                                        <th
                                            key={item}
                                            className={`py-6 text-left text-sm font-medium capitalize text-black ${
                                                index === 0 ? 'pl-6' : 'w-max'
                                            }`}
                                        >
                                            {item}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {negotiations.map((item, index) => {
                                    const statusColor = {
                                        text: '#484854',
                                        background: '#F9F9F9',
                                    }

                                    switch (item.status.toLowerCase()) {
                                        case 'finalized':
                                            statusColor.text = '#83BF6E'
                                            statusColor.background = '#ECF5E9'
                                            break
                                        case 'in progress':
                                            statusColor.text = '#F3BB2C'
                                            statusColor.background = '#FEF9EE'
                                            break
                                        case 'canceled':
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
                                            <td className='py-6 pl-6'>
                                                <div className='flex items-center gap-2'>
                                                    <img
                                                        src={
                                                            item.advert.images
                                                                ? getUrlAws(item.advert.images[0])
                                                                : ''
                                                        }
                                                        className='h-[40px] w-[60px] rounded-lg object-cover'
                                                    />
                                                    <div>
                                                        <p className='text-smd text-gray-400'>
                                                            {item.advert.title}
                                                        </p>
                                                        <p className='text-xs text-gray-500 line-clamp-1'>
                                                            {item.advert.about}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className='font-bold text-gray-400'>
                                                    R${item.value.toFixed(3)}
                                                </span>
                                            </td>
                                            <td className='flex w-max items-center justify-between py-6'>
                                                <div className='flex w-max items-center gap-2'>
                                                    <img
                                                        src={
                                                            item.advert.user.image
                                                                ? getUrlAws(item.advert.user.image)
                                                                : ''
                                                        }
                                                        alt={`Foto de ${item.advert.user.name}`}
                                                        className='h-[35px] w-[35px] rounded-full object-cover'
                                                    />
                                                    <p className='text-black'>
                                                        {item.advert.user.name}
                                                    </p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='flex items-center gap-2 py-6'>
                                                    <img
                                                        src={
                                                            item.user.image
                                                                ? getUrlAws(item.user.image)
                                                                : DefaultProfile
                                                        }
                                                        alt={`Foto de ${item.user.name}`}
                                                        className='h-[35px] w-[35px] rounded-full object-cover'
                                                    />
                                                    <p className='text-black'>{item.user.name}</p>
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
                                                    <span className='capitalize'>
                                                        {item.status === 'finalized'
                                                            ? 'Finalizado'
                                                            : item.status === 'in progress'
                                                            ? 'Em Progresso'
                                                            : 'Cancelado'}
                                                    </span>
                                                    <IoPencil />
                                                </div>
                                            </td>
                                            <td>
                                                <span>
                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
            ) : null}
        </div>
    )
}

export default HomeDashboard
