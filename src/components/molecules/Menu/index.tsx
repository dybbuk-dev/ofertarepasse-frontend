import { Link } from 'react-router-dom'
import Logo from 'assets/images/logo.png'
import Person from 'assets/icon/Person'

const Menu = () => {
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
        <header className='container mx-auto'>
            <nav>
                <div className='flex items-center justify-between py-3 text-xs'>
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
                <div className='flex items-center justify-between py-8'>
                    <Link to='/'>
                        <img src={Logo} />
                    </Link>
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
                </div>
            </nav>
        </header>
    )
}

export default Menu
