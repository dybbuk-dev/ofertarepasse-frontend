import LogoAdm from 'assets/images/logoDashboardAdm.png'
import LogoPro from 'assets/images/logoDashboardPro.png'

import { Link, useLocation } from 'react-router-dom'
import React from 'react'
import { useAuth } from 'hooks/auth'
import SettingsIcon from '@mui/icons-material/Settings'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'
import LogoutIcon from '@mui/icons-material/Logout'
import { IconButton } from '@mui/material'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'

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
        <nav className='flex min-h-screen w-full flex-col items-center overflow-hidden transition-[width] duration-500'>
            <div className='hidden h-[100px] w-full items-center px-5 lg:flex'>
                <Link to='/'>
                    <img
                        src={location.pathname.search('/admin') !== -1 ? LogoAdm : LogoPro}
                        alt='Oferta Repasse ADM'
                    />
                </Link>
            </div>
            <div className='flex min-h-[calc(100vh-100px)] w-full flex-col divide-y divide-solid rounded-r-2xl bg-white px-0 py-5 lg:justify-between lg:divide-none lg:px-5'>
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
                <div className='flex flex-col gap-3 px-5 pt-5 lg:pt-0'>
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
                            Configuraçõesb
                        </button>
                    </Link>
                    <button className='text-left text-sm text-gray-100'>Suporte</button>
                    <button className='text-left text-sm text-gray-100' onClick={() => signOut()}>
                        Sair
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default MenuDasboard
