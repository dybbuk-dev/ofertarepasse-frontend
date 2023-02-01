import Button from 'components/atoms/Button'
import Card from 'components/atoms/Card'
import { Link } from 'react-router-dom'
import MenWithPhone from 'assets/images/men_with_phone.png'

const Footer = () => {
    const items = [
        {
            title: 'Comprar',
            items: ['Carros Usados', 'Motos Usadas'],
        },
        {
            title: 'Minha Conta',
            items: ['Meu Perfil', 'Favoritos', 'Meus Veículos', 'Suporte'],
        },
        {
            title: 'Links Úteis',
            items: ['Tabela Fipe 2023', 'Financiamento', 'Politicas', 'Termos de Uso', 'LGPD'],
        },
        {
            title: 'OfertaRepasse',
            items: [
                'Quem Somos',
                'Estoque de Carros',
                'Estoque de Motos',
                'Blog Oficial',
                'Suporte',
            ],
        },
        {
            title: 'Suporte',
            items: ['Chat Online', 'WhatsApp', 'E-mail'],
        },
        {
            title: 'Conecte-se',
            items: ['Facebook', 'Instagram', 'WhatsApp'],
        },
        {
            title: 'Vender',
            items: ['Carros Usados', 'Motos Usadas'],
        },
    ]

    const forYou = [
        {
            id: 'pasjbdpasjbdpasjd',
            title: 'Honda Civic',
            description: '1.5 16V TURBO GASOLINA TOURING 4P CVT',
            price: 'R$119.500',
            year: '2016/2017',
            distance: '72000 km',
            location: 'Catanduva - SP',
        },
        {
            id: 'ijsdbfpaijsbdfasdf',
            title: 'Honda Civic',
            description: '1.5 16V TURBO GASOLINA TOURING 4P CVT',
            price: 'R$119.500',
            year: '2016/2017',
            distance: '72000 km',
            location: 'Catanduva - SP',
        },
        {
            id: 'ijsdbfiajbdsfpiasjdf',
            title: 'Honda Civic',
            description: '1.5 16V TURBO GASOLINA TOURING 4P CVT',
            price: 'R$119.500',
            year: '2016/2017',
            distance: '72000 km',
            location: 'Catanduva - SP',
        },
        {
            id: 'ijbdfijbasdif',
            title: 'Honda Civic',
            description: '1.5 16V TURBO GASOLINA TOURING 4P CVT',
            price: 'R$119.500',
            year: '2016/2017',
            distance: '72000 km',
            location: 'Catanduva - SP',
        },
        {
            id: 'ijpbsdfpijabsdp',
            title: 'Honda Civic',
            description: '1.5 16V TURBO GASOLINA TOURING 4P CVT',
            price: 'R$119.500',
            year: '2016/2017',
            distance: '72000 km',
            location: 'Catanduva - SP',
        },
    ]

    return (
        <footer className='container mx-auto'>
            <section className='mt-24'>
                <div className='mb-10 flex items-center justify-between font-medium'>
                    <p>Recomendados para você</p>
                    <Link to='/'>
                        <span className='text-primary'>Ver todos veículos disponíveis</span>
                    </Link>
                </div>
                <div className='grid grid-cols-5 gap-5'>
                    {forYou.map((item) => (
                        <Link to={`/info/${item.id}`} key={item.id}>
                            <Card data={item} />
                        </Link>
                    ))}
                </div>
            </section>
            <section className='mt-24 mb-[200px] flex items-center justify-center'>
                <div className='grid w-[85%] grid-cols-2 items-center justify-items-center'>
                    <p className='text-4xl font-semibold text-gray-200'>
                        Cuide melhor do seu <br />
                        veículo e <span className='text-primary'>economize muito.</span>
                    </p>
                    <div className='flex items-center justify-center gap-8'>
                        <img src={MenWithPhone} />
                        <div>
                            <p className='font-medium text-gray-200'>
                                Conheça o Blog Oficial
                                <br /> do OfertaRepasse.
                            </p>
                            <Button className='mt-4 bg-primary text-white'>Conhecer Blog</Button>
                        </div>
                    </div>
                </div>
            </section>
            <div className='grid grid-cols-6'>
                {items.map((item) => (
                    <div key={item.title}>
                        <p className='mb-6 text-xl font-semibold text-gray-200'>{item.title}</p>
                        <div className='flex flex-col'>
                            {item.items.map((link, index) => (
                                <Link to='/' key={index}>
                                    <span
                                        className={
                                            'ease text-sm font-medium text-gray-200 duration-200 hover:text-primary'
                                        }
                                    >
                                        {link}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
                <div className='col-span-5 flex items-center justify-between'>
                    <p className='font-medium'>
                        Atendimento de <strong>Segunda a Sexta</strong> 07:30 ás 18:00 -{' '}
                        <strong>Sábado</strong> 07:30 ás 12:00
                    </p>
                    <p>
                        Fale com nosso time{' '}
                        <Link to='/'>
                            <span className='font-semibold text-primary'>Iniciar Chat Online</span>
                        </Link>
                    </p>
                </div>
            </div>
            <div className='mt-8 py-4'>
                <span className='font-medium text-gray-200'>
                    OfertaRepasse. Todos Direitos Reservados.
                </span>
            </div>
        </footer>
    )
}

export default Footer
