import { IoArrowDownOutline, IoArrowUpOutline, IoPencil, IoTrashOutline } from 'react-icons/io5'
import CountUp from 'react-countup'
import MenInCar from 'assets/images/men_in_car.png'
import Target from 'assets/icon/Target'
import Eye from 'assets/icon/Eye'

const HomeDashboard = () => {
    const titlesTableNegotiations = [
        'Veículo',
        'Proposta',
        'Vizualizações',
        'Valor',
        'Status',
        'Criado em',
        'Gerenciar',
    ]

    const itemsNegotiations = [
        {
            vehicle: {
                image: 'https://www.autoo.com.br/fotos/2022/2/960_720/kia1_11022022_70604_960_720.jpg',
                title: 'Honda Civic',
                description: '1.5 16V TURBO GASOLINA TOURING 4P CVT',
            },
            proposals: 868,
            views: 12.569,
            value: 89.9,
            active: true,
            createdAt: new Date(),
        },
        {
            vehicle: {
                image: 'https://www.autoo.com.br/fotos/2022/2/960_720/kia1_11022022_70604_960_720.jpg',
                title: 'Honda Civic',
                description: '1.5 16V TURBO GASOLINA TOURING 4P CVT',
            },
            proposals: 868,
            views: 12.569,
            value: 89.9,
            active: false,
            createdAt: new Date(),
        },
        {
            vehicle: {
                image: 'https://www.autoo.com.br/fotos/2022/2/960_720/kia1_11022022_70604_960_720.jpg',
                title: 'Honda Civic',
                description: '1.5 16V TURBO GASOLINA TOURING 4P CVT',
            },
            proposals: 868,
            views: 12.569,
            value: 89.9,
            active: true,
            createdAt: new Date(),
        },
    ]

    const titlesTable = ['Veículo', 'Valor', 'Anunciante', 'Cliente', 'Status', 'Criado em']

    const items = [
        {
            vehicle: {
                image: 'https://www.autoo.com.br/fotos/2022/2/960_720/kia1_11022022_70604_960_720.jpg',
                title: 'Honda Civic',
                description: '1.5 16V TURBO GASOLINA TOURING 4P CVT',
            },
            value: 89.9,
            advertiser: {
                image: MenInCar,
                name: 'Italo Eduardo',
            },
            customer: {
                image: MenInCar,
                name: 'Ibisem Alves',
            },
            status: 'Finalizada',
            createdAt: new Date(),
        },
        {
            vehicle: {
                image: 'https://www.autoo.com.br/fotos/2022/2/960_720/kia1_11022022_70604_960_720.jpg',
                title: 'Honda Civic',
                description: '1.5 16V TURBO GASOLINA TOURING 4P CVT',
            },
            value: 89.9,
            advertiser: {
                image: MenInCar,
                name: 'Italo Eduardo',
            },
            customer: {
                image: MenInCar,
                name: 'Ibisem Alves',
            },
            status: 'Processando',
            createdAt: new Date(),
        },
        {
            vehicle: {
                image: 'https://www.autoo.com.br/fotos/2022/2/960_720/kia1_11022022_70604_960_720.jpg',
                title: 'Honda Civic',
                description: '1.5 16V TURBO GASOLINA TOURING 4P CVT',
            },
            value: 89.9,
            advertiser: {
                image: MenInCar,
                name: 'Italo Eduardo',
            },
            customer: {
                image: MenInCar,
                name: 'Ibisem Alves',
            },
            status: 'Em análise',
            createdAt: new Date(),
        },
        {
            vehicle: {
                image: 'https://www.autoo.com.br/fotos/2022/2/960_720/kia1_11022022_70604_960_720.jpg',
                title: 'Honda Civic',
                description: '1.5 16V TURBO GASOLINA TOURING 4P CVT',
            },
            value: 89.9,
            advertiser: {
                image: MenInCar,
                name: 'Italo Eduardo',
            },
            customer: {
                image: MenInCar,
                name: 'Ibisem Alves',
            },
            status: 'Sinal Pago',
            createdAt: new Date(),
        },
        {
            vehicle: {
                image: 'https://www.autoo.com.br/fotos/2022/2/960_720/kia1_11022022_70604_960_720.jpg',
                title: 'Honda Civic',
                description: '1.5 16V TURBO GASOLINA TOURING 4P CVT',
            },
            value: 89.9,
            advertiser: {
                image: MenInCar,
                name: 'Italo Eduardo',
            },
            customer: {
                image: MenInCar,
                name: 'Ibisem Alves',
            },
            status: 'Cancelada',
            createdAt: new Date(),
        },
    ]

    return (
        <div>
            <section className='text-gray-200'>
                <span className='mr-4 text-3xl font-light'>Dashboard</span>
                <span className='text-lg font-light'>Seja bem-vindo, Ibisem!</span>
                <div className='mt-10 grid grid-cols-3 rounded-2xl bg-white py-10 px-16'>
                    <div>
                        <div className='flex items-center gap-1'>
                            <CountUp start={0} end={968} duration={1}>
                                {({ countUpRef }) => (
                                    <span className='text-6xl font-medium' ref={countUpRef} />
                                )}
                            </CountUp>
                            <div className='flex w-max items-center rounded-full bg-gray-900 px-3 py-1 text-sm text-green'>
                                <IoArrowUpOutline />
                                28%
                            </div>
                        </div>
                        <p className='mt-4 text-sm font-medium'>novos anúncios este mês</p>
                    </div>
                    <div className='justify-self-center'>
                        <div className='flex items-center gap-1'>
                            <CountUp start={0} end={1268} duration={1}>
                                {({ countUpRef }) => (
                                    <span className='text-6xl font-medium' ref={countUpRef} />
                                )}
                            </CountUp>
                            <div className='flex w-max items-center rounded-full bg-gray-900 px-3 py-1 text-sm text-green'>
                                <IoArrowUpOutline />
                                15%
                            </div>
                        </div>
                        <p className='mt-4 text-sm font-medium'>novos usuários este mês</p>
                    </div>
                    <div className='justify-self-end'>
                        <div className='flex items-center gap-1'>
                            <CountUp start={0} end={688} duration={1}>
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
            <section className='mt-20'>
                <span className='text-2xl font-light'>Meus Anúncios Ativos</span>
                <div className='my-10 rounded-xl bg-white'>
                    <table className='w-full'>
                        <tr className='border-b border-gray-900'>
                            {titlesTableNegotiations.map((item, index) => (
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
                        {itemsNegotiations.map((item, index) => (
                            <tr
                                key={index}
                                className='border-b border-gray-900 text-smd text-gray-500 last:border-none'
                            >
                                <td className='py-6 pl-6'>
                                    <div className='flex items-center gap-2'>
                                        <img
                                            src={item.vehicle.image}
                                            className='h-[40px] w-[60px] rounded-lg object-cover'
                                        />
                                        <div>
                                            <p className='text-smd text-gray-400'>
                                                {item.vehicle.title}
                                            </p>
                                            <p className='text-xs text-gray-500 line-clamp-1'>
                                                {item.vehicle.description}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className='flex items-center gap-1'>
                                        <Target />
                                        <span>{item.proposals}</span>
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
                                        R${item.value.toFixed(3)}
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
                                    <span>{item.createdAt.toLocaleDateString()}</span>
                                </td>
                                <td>
                                    <div className='flex items-center gap-2'>
                                        <IoTrashOutline
                                            role='button'
                                            className='text-xl hover:text-primary'
                                        />
                                        <IoPencil
                                            role='button'
                                            className='text-xl hover:text-primary'
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </section>
            <section className='mt-20'>
                <span className='text-2xl font-light'>Minhas Negociações</span>
                <div className='mt-10 rounded-xl bg-white'>
                    <table className='w-full'>
                        <tr className='border-b border-gray-900'>
                            {titlesTable.map((item, index) => (
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

                                case 'sinal pago':
                                    statusColor.text = '#6E8ABF'
                                    statusColor.background = '#ECF2FF'
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
                                                src={item.vehicle.image}
                                                className='h-[40px] w-[60px] rounded-lg object-cover'
                                            />
                                            <div>
                                                <p className='text-smd text-gray-400'>
                                                    {item.vehicle.title}
                                                </p>
                                                <p className='text-xs text-gray-500 line-clamp-1'>
                                                    {item.vehicle.description}
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
                                        <span>{item.createdAt.toLocaleDateString()}</span>
                                    </td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            </section>
        </div>
    )
}

export default HomeDashboard
