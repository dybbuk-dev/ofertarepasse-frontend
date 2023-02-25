import { Link } from 'react-router-dom'
import Logo from 'assets/images/logo.png'
import Person from 'assets/icon/Person'
import { useAuth } from 'hooks/auth'

const Menu = () => {
    const { user } = useAuth()
    const items = [
        {
            label: 'Comprar',
            href: '/',
        },
        {
            label: 'Vender',
            href: '/',
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
                    <div className='container mx-auto flex items-center justify-between'>
                        <p className='font-medium'>
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
                    <div className='container mx-auto flex items-center justify-between bg-transparent py-8'>
                        <Link to='/'>
                            <img src={Logo} />
                        </Link>
                        {user ? (
                            <div className='flex items-center gap-2'>
                                <p className='text-sm font-medium text-gray-400'>{user.name}</p>
                                <Link to='/dashboard'>
                                    <img
                                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4rsSzLimlQyniEtUV4-1raljzFhS45QBeAw&usqp=CAU'
                                        className='h-[50px] w-[50px] rounded-full object-cover'
                                    />
                                </Link>
                            </div>
                        ) : (
                            <div className='flex items-center gap-8'>
                                <Link to='/signup'>
                                    <span className='text-sm font-medium text-gray-100'>
                                        Criar Conta Grátis
                                    </span>
                                </Link>
                                <Link to='/signin'>
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
