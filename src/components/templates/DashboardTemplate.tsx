import Button from 'components/atoms/Button'
import MenuDasboard from 'components/molecules/Menu/MenuDashboard'
import {
    IoAddOutline,
    IoChatboxOutline,
    IoHeartOutline,
    IoNotificationsOutline,
    IoSearchOutline,
} from 'react-icons/io5'
import MenInCar from 'assets/images/men_in_car.png'

interface IDashboardTemplate {
    children: React.ReactNode
}

const InputSearch = () => {
    return (
        <div className='relative flex w-full items-center'>
            <input
                placeholder='Pesquise por usuários, anúncios, clientes, negociações...'
                className='w-full bg-transparent pl-9 text-gray-200 outline-none'
            />
            <IoSearchOutline className='absolute left-0 text-xl text-gray-500' />
        </div>
    )
}

const DashboardTemplate = ({ children }: IDashboardTemplate) => {
    return (
        <div className='grid grid-cols-[300px_1fr] gap-4 bg-gray-900'>
            <div className='fixed top-0 left-0 w-[300px]'>
                <MenuDasboard />
            </div>
            <div />
            <main className='container mx-auto min-h-screen'>
                <div className='flex h-[100px] items-center rounded-b-2xl bg-white px-10'>
                    <InputSearch />
                    <div className='flex items-center justify-end'>
                        <Button className='flex w-[220px] items-center justify-center !bg-primary-opacity-100 text-sm font-medium text-primary'>
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
                <div className='mt-10 px-10'>{children}</div>
            </main>
        </div>
    )
}

export default DashboardTemplate
