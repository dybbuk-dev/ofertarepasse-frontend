import LogoAdm from 'assets/images/logoDashboardAdm.png'
import Money from 'assets/icon/Money'
import Grid from 'assets/icon/Grid'
import User from 'assets/icon/User'
import PieChart from 'assets/icon/PieChart'
import GridSmall from 'assets/icon/GridSmall'
import UserCircle from 'assets/icon/UserCircle'
import { Link, useLocation } from 'react-router-dom'

const MenuDasboard = () => {
    const location = useLocation()

    const buttons = [
        {
            icon: <Grid />,
            label: 'Dashboard',
            href: '/dashboard',
        },
        {
            icon: <UserCircle />,
            label: 'Anunciantes',
            href: '/dashboard/advertiser',
        },
        {
            icon: <User />,
            label: 'Clientes',
            href: '/dashboard/customers',
        },
        {
            icon: <PieChart />,
            label: 'Negociação',
            href: '/dashboard/negotiations',
        },
        {
            icon: <Money />,
            label: 'Vendidos',
            href: '/dashboard/sold',
        },
        {
            icon: <GridSmall />,
            label: 'Anúncios',
            href: '/dashboard/adverts',
        },
    ]

    return (
        <nav className='flex min-h-screen w-full flex-col items-center'>
            <div className='flex h-[100px] w-full items-center px-5'>
                <img src={LogoAdm} alt='Oferta Repasse ADM' />
            </div>
            <div className='flex min-h-[calc(100vh-100px)] w-full flex-col justify-between rounded-r-2xl bg-white py-7 px-5'>
                <div>
                    {buttons.map((item, index) => (
                        <Link key={index} to={item.href}>
                            <button
                                className={`mb-4 grid w-full grid-cols-[20px_1fr] items-center gap-3 rounded-lg px-5 py-4 ${
                                    location.pathname === item.href
                                        ? 'bg-primary-opacity-100 text-primary'
                                        : 'text-gray-200'
                                }`}
                            >
                                <div
                                    className={`flex items-center justify-center text-xl ${
                                        location.pathname === item.href
                                            ? '[&>svg>path]:fill-primary'
                                            : '[&>svg>path]:fill-gray-200'
                                    }`}
                                >
                                    {item.icon}
                                </div>
                                <p className='text-left text-sm'>{item.label}</p>
                            </button>
                        </Link>
                    ))}
                </div>
                <div className='flex flex-col gap-3 px-5'>
                    <Link to='/dashboard/configations'>
                        <button className='text-left text-sm text-gray-100'>Configurações</button>
                    </Link>
                    <button className='text-left text-sm text-gray-100'>Suporte</button>
                    <button className='text-left text-sm text-gray-100'>Sair</button>
                </div>
            </div>
        </nav>
    )
}

export default MenuDasboard
