import Button from 'components/atoms/Button'
import Card from 'components/atoms/Card'
import { Link } from 'react-router-dom'
import MenWithPhone from 'assets/images/men_with_phone.png'
import React from 'react'
import { IAdvert } from 'components/organisms/Dashboard/Adverts'
import api from 'services/api'
import { toast } from 'react-toastify'
import { useAuth } from 'hooks/auth'
import { Roles } from 'types'

const Footer = () => {
    const [recommendations, setRecommendations] = React.useState<Array<IAdvert> | null>(null)
    const { user } = useAuth()

    const items = [
        {
            title: 'Comprar',
            items: [
                { title: 'Carros Usados', link: '/' },
                { title: 'Motos Usadas', link: '/' },
            ],
        },
        {
            title: 'Minha Conta',
            items: [
                { title: 'Meu Perfil', link: user?.roles === Roles.ADMIN ? '/admin' : 'dashboard' },
                { title: 'Favoritos', link: '/' },
                { title: 'Meus Veículos', link: '/' },
                { title: 'Suporte', link: '/suporte' },
            ],
        },
        {
            title: 'Links Úteis',
            items: [
                { title: 'Tabela Fipe 2023', link: '/' },
                { title: 'Financiamento', link: '/' },
                { title: 'Politicas', link: '/' },
                { title: 'Termos de Uso', link: '/' },
                { title: 'LGPD', link: '/' },
            ],
        },
        {
            title: 'OfertaRepasse',
            items: [
                { title: 'Quem Somos', link: '/' },
                { title: 'Estoque de Carros', link: '/' },
                { title: 'Estoque de Motos', link: '/' },
                { title: 'Blog Oficial', link: '/' },
                { title: 'Suporte', link: '/' },
            ],
        },
        {
            title: 'Suporte',
            items: [
                { title: 'Chat Online', link: '/suporte' },
                { title: 'WhatsApp', link: '/' },
                { title: 'E-mail', link: '/' },
            ],
        },
        {
            title: 'Conecte-se',
            items: [
                { title: 'Facebook', link: '/' },
                { title: 'Instagram', link: '/' },
                { title: 'WhatsApp', link: '/' },
            ],
        },
        {
            title: 'Vender',
            items: [
                { title: 'Carros Usados', link: '/' },
                { title: 'Motos Usadas', link: '/' },
            ],
        },
    ]

    React.useEffect(() => {
        const getRecommendations = async () => {
            try {
                const { data } = await api.post('/api/v1/adverts/recommendation?limit=5')

                setRecommendations(data)
            } catch (err) {
                toast.error('Erro ao trazer anúncios recomendados')
            }
        }

        getRecommendations()
    }, [])

    return (
        <footer>
            <section className='container mx-auto'>
                {recommendations && recommendations.length > 0 ? (
                    <section className='mt-6 xs:mt-12 md:mt-24'>
                        <div className='mb-10 flex items-center justify-between font-medium'>
                            <p>Recomendados para você</p>
                            <Link to='/search'>
                                <span className='text-primary'>Ver todos veículos disponíveis</span>
                            </Link>
                        </div>
                        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                            {recommendations.map((item) => (
                                <Link
                                    to={`/comprar/${item.brand}/${item.model.replaceAll(
                                        '/',
                                        ''
                                    )}/${item.version.replaceAll('/', '')}/${item.modelYear}/${
                                        item.id
                                    }`}
                                    key={item.id}
                                >
                                    <Card
                                        data={{
                                            id: item.id,
                                            images: item.images,
                                            title: item.title,
                                            description: item.version,
                                            distance: item.kilometer,
                                            location: `${item.city} - ${item.state}`,
                                            price: item.value,
                                            year: item.modelYear,
                                        }}
                                    />
                                </Link>
                            ))}
                        </div>
                    </section>
                ) : null}
                <section className='mt-6 mb-[50px] flex items-center justify-center xs:mb-[100px] xs:mt-12 md:mb-[200px] md:mt-24'>
                    <div className='grid h-[230px] w-full grid-cols-2 items-center justify-items-center gap-2 rounded-2xl bg-gray-900 px-3 xs:h-[270px] xs:px-6 md:h-[330px] md:gap-8 md:px-12 lg:grid-cols-4'>
                        <div className='col-span-1 text-center text-sm font-semibold text-gray-200 xs:text-base sm:text-2xl md:text-left md:text-3xl lg:col-span-2 lg:text-4xl'>
                            Cuide melhor do seu <br />
                            veículo e <span className='text-primary'>economize muito.</span>
                        </div>
                        <div className='relative row-span-2 h-full w-[180px] xs:w-[220px] md:w-[300px] lg:row-span-1'>
                            <img src={MenWithPhone} className='absolute bottom-0' />
                        </div>
                        <div className=''>
                            <p className='text-xs font-medium text-gray-200 xs:text-sm sm:text-base'>
                                Conheça o Blog Oficial
                                <br /> do OfertaRepasse.
                            </p>
                            <Button className='mt-4 bg-primary text-xs text-white sm:text-sm lg:text-base'>
                                Conhecer Blog
                            </Button>
                        </div>
                    </div>
                </section>
            </section>
            <section className='border-t border-[#f4f4f4] pt-[25px] xs:pt-[50px] md:pt-[100px]'>
                <div className='container mx-auto'>
                    <div className='grid grid-cols-2 gap-4 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'>
                        {items.map((item) => (
                            <div key={item.title}>
                                <p className='mb-6 text-sm font-semibold text-gray-200'>
                                    {item.title}
                                </p>
                                <div className='flex flex-col'>
                                    {item.items.map(({ title, link }, index) => (
                                        <Link to={link} key={index}>
                                            <span
                                                className={
                                                    'ease text-sm font-medium text-gray-200 duration-200 hover:text-primary'
                                                }
                                            >
                                                {title}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div className='col-span-2 flex items-center justify-between text-sm xs:col-span-3 sm:col-span-4 md:col-span-3 lg:col-span-5'>
                            <p className='font-medium'>
                                Atendimento de <strong>Segunda a Sexta</strong> 07:30 ás 18:00 -{' '}
                                <strong>Sábado</strong> 07:30 ás 12:00
                            </p>
                            <p>
                                Fale com nosso time{' '}
                                <Link to='/suporte'>
                                    <span className='font-semibold text-primary'>
                                        Iniciar Chat Online
                                    </span>
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className='mt-8 border-t border-[#ECECEC] py-3 xs:py-6 md:py-10'>
                        <span className='text-sm font-medium text-gray-200'>
                            OfertaRepasse. Todos Direitos Reservados.
                        </span>
                    </div>
                </div>
            </section>
        </footer>
    )
}

export default Footer
