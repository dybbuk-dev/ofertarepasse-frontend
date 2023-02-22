import Button from 'components/atoms/Button'
import MenuDasboard from 'components/molecules/Menu/MenuDashboard'
import {
    IoAddOutline,
    IoChatboxOutline,
    IoHeartOutline,
    IoNotificationsOutline,
} from 'react-icons/io5'
import MenInCar from 'assets/images/men_in_car.png'
import InputSimple from 'components/atoms/Input/Simple'
import Money from 'assets/icon/Money'
import Grid from 'assets/icon/Grid'
import PieChart from 'assets/icon/PieChart'
import GridSmall from 'assets/icon/GridSmall'

interface IDashboardTemplate {
    children: React.ReactNode
}

const DashboardTemplate = ({ children }: IDashboardTemplate) => {
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
        <div className='grid grid-cols-[300px_1fr] gap-4 bg-gray-900'>
            <div className='fixed top-0 left-0 w-[300px]'>
                <MenuDasboard buttons={buttonsMenu} />
            </div>
            <div />
            <main className='container mx-auto min-h-screen'>
                <div className='flex h-[100px] items-center rounded-b-2xl bg-white px-10'>
                    <InputSimple placeholder='Pesquise por usuários, anúncios, clientes, negociações...' />
                    <div className='flex items-center justify-end'>
                        <Button className='flex w-max items-center justify-center whitespace-nowrap !bg-primary-opacity-100 text-sm font-medium text-primary'>
                            <IoAddOutline className='text-2xl' />
                            Criar anúncio
                        </Button>
                        <div className='mx-7 flex items-center gap-3 text-xl'>
                            <IoChatboxOutline />
                            <IoHeartOutline />
                            <IoNotificationsOutline />
                        </div>
                        <img
                            src={MenInCar}
                            alt='Image profile'
                            className='h-[50px] w-[50px] rounded-full object-cover'
                        />
                    </div>
                </div>
                <div className='mt-10 px-10 pb-10'>{children}</div>
            </main>
        </div>
    )
}

export default DashboardTemplate
