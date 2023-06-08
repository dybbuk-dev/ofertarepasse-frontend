/* eslint-disable tailwindcss/no-custom-classname */
import Button from 'components/atoms/Button'
import MenuDasboard from 'components/molecules/Menu/MenuDashboard'
import {
    IoAddOutline,
    IoChatboxOutline,
    IoHeartOutline,
    IoNotificationsOutline,
} from 'react-icons/io5'
import DefaultProfile from 'assets/images/defaultProfile.png'
import InputSimple from 'components/atoms/Input/Simple'
import Money from 'assets/icon/Money'
import Grid from 'assets/icon/Grid'
import PieChart from 'assets/icon/PieChart'
import GridSmall from 'assets/icon/GridSmall'
import { Link } from 'react-router-dom'
import { useAuth } from 'hooks/auth'
import getUrlAws from 'utils/getUrlAws'

import MenuIcon from '@mui/icons-material/Menu'

interface IDashboardTemplate {
    children: React.ReactNode
}

const DashboardTemplate = ({ children }: IDashboardTemplate) => {
    const { user } = useAuth()

    const buttonsMenu = [
        {
            icon: <Grid />,
            label: 'Dashboard',
            href: '/dashboard',
        },
        {
            icon: <PieChart />,
            label: 'Negociação',
            href: '/dashboard/negotiations',
        },
        {
            icon: <GridSmall />,
            label: 'Anúncios',
            href: '/dashboard/adverts',
        },
        {
            icon: <Money />,
            label: 'Vendidos',
            href: '/dashboard/sales',
        },
    ]

    return (
        <div className='w-full bg-gray-900'>
            <div className='fixed top-0 left-0 w-[50px] lg:w-[300px]'>
                <MenuDasboard buttons={buttonsMenu} />
            </div>
            <div className='ml-[70px] lg:ml-[350px]'>
                <main className='mx-auto min-h-screen w-full'>
                    <div className='menuSearch flex h-[100px] flex-col-reverse items-center rounded-b-2xl bg-white px-10 md:flex-row'>
                        <InputSimple
                            placeholder='Pesquise por usuários, anúncios, clientes, negociações...'
                            className='py-2 pr-2 md:pt-0'
                        />
                        <div className='flex items-center'>
                            <Link to='/dashboard/adverts/create'>
                                <Button className='flex w-max items-center justify-center whitespace-nowrap !bg-primary-opacity-100 text-sm font-medium text-primary'>
                                    <IoAddOutline className='text-2xl' />
                                    Criar anúncio
                                </Button>
                            </Link>
                            <div className='mx-7 flex items-center gap-3 text-xl'>
                                <IoChatboxOutline />
                                <IoHeartOutline />
                                <IoNotificationsOutline />
                            </div>
                            <div className='h-[50px] w-[50px]'>
                                <img
                                    src={
                                        user && user.image ? getUrlAws(user.image) : DefaultProfile
                                    }
                                    className='rounded-full object-cover'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='mt-10 px-2 pb-2 xs:px-4 xs:pb-4 md:px-10 md:pb-10'>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default DashboardTemplate
