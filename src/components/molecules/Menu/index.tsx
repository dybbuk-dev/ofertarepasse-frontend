import { Link } from 'react-router-dom'
import Logo from 'assets/images/logo.png'
import Person from 'assets/icon/Person'
import { useAuth } from 'hooks/auth'
import DefaultProfile from 'assets/images/defaultProfile.png'
import getUrlAws from 'utils/getUrlAws'

const Menu = () => {
    const { user } = useAuth()
    const items = [
        {
            label: 'Comprar',
            href: '/estoque',
        },
        {
            label: 'Vender',
            href: '/dashboard/adverts/create',
        },
        {
            label: 'Suporte',
            href: '/',
        },
        {
            label: 'Favoritos',
            href: '/',
        },
    ]

    return (
        <header className='absolute top-0 left-0 w-full'>
            <nav>
                <div className='bg-white py-3 text-xs'>
                    <div className='container mx-auto flex flex-col items-center justify-center md:flex-row md:divide-y-0 lg:justify-between'>
                        <p className='hidden font-medium lg:block'>
                            <span className='underline underline-offset-2'>
                                Encontre milhares de veículos
                            </span>{' '}
                            em todo Brasil com valores abaixo da tabela FIPE ou{' '}
                            <span className='font-semibold text-primary'>anuncie seu veículo.</span>
                        </p>
                        <div className='flex items-center gap-6'>
                            {items.map((item, index) => (
                                <Link to={item.href} key={index}>
                                    <p className='font-medium text-gray-400'>{item.label}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <div className='container mx-auto flex flex-col items-end justify-between bg-transparent pt-6 md:flex-row md:items-center lg:pt-8'>
                        <div className='w-full md:w-auto'>
                            <Link to='/'>
                                <img src={Logo} />
                            </Link>
                        </div>
                        {user ? (
                            <div className='flex items-center gap-2'>
                                <p className='text-sm font-medium text-gray-400'>{user.name}</p>
                                <Link to={user.roles === 'admin' ? '/admin' : '/dashboard'}>
                                    <img
                                        src={user.image ? getUrlAws(user.image) : DefaultProfile}
                                        className='h-[50px] w-[50px] rounded-full object-cover'
                                    />
                                </Link>
                            </div>
                        ) : (
                            <div className='flex items-center gap-8'>
                                <Link to='/cadastro'>
                                    <span className='text-sm font-medium text-gray-100'>
                                        Criar Conta Grátis
                                    </span>
                                </Link>
                                <Link to='/login'>
                                    <span className='flex items-center gap-1 text-sm font-medium text-gray-100'>
                                        <Person />
                                        Entrar
                                    </span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Menu
