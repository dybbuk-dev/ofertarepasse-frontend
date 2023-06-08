import LogoAdm from 'assets/images/logoDashboardAdm.png'
import LogoPro from 'assets/images/logoDashboardPro.png'

import { Link, useLocation } from 'react-router-dom'
import React from 'react'
import { useAuth } from 'hooks/auth'
import SettingsIcon from '@mui/icons-material/Settings'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'
import LogoutIcon from '@mui/icons-material/Logout'

interface IMenuDashboard {
    buttons: Array<{
        icon: React.ReactNode
        label: string
        href: string
    }>
}

const MenuDasboard = ({ buttons }: IMenuDashboard) => {
    const location = useLocation()
    const { signOut } = useAuth()

    return (
        <nav className='flex min-h-screen w-full flex-col items-center'>
            <div className='hidden h-[100px] w-full items-center px-5 lg:flex'>
                <Link to='/'>
                    <img
                        src={location.pathname.search('/admin') !== -1 ? LogoAdm : LogoPro}
                        alt='Oferta Repasse ADM'
                    />
                </Link>
            </div>
            <div className='flex min-h-[calc(100vh-100px)] w-full flex-col justify-between rounded-r-2xl bg-white py-7 px-0 lg:px-5'>
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
                                <p className='hidden text-left text-sm lg:block'>{item.label}</p>
                            </button>
                        </Link>
                    ))}
                </div>
                <div className='flex flex-col gap-3 px-5'>
                    <Link
                        to={
                            location.pathname.search('/admin') !== -1
                                ? '/admin/configurations'
                                : '/dashboard/configurations'
                        }
                    >
                        <button
                            className={`text-left text-sm ${
                                location.pathname.search('/configurations') !== -1
                                    ? 'text-primary'
                                    : 'text-gray-100'
                            }`}
                        >
                            <div className='hidden lg:block'>Configuraçõesb</div>
                            <div className='block lg:hidden'>
                                <SettingsIcon />
                            </div>
                        </button>
                    </Link>
                    <button className='text-left text-sm text-gray-100'>
                        <div className='hidden lg:block'>Suporte</div>
                        <div className='block lg:hidden'>
                            <ContactSupportIcon />
                        </div>
                    </button>
                    <button className='text-left text-sm text-gray-100' onClick={() => signOut()}>
                        <div className='hidden lg:block'>Sair</div>
                        <div className='block lg:hidden'>
                            <LogoutIcon />
                        </div>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default MenuDasboard
