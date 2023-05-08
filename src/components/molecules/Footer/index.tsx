import Button from 'components/atoms/Button'
import Card from 'components/atoms/Card'
import { Link } from 'react-router-dom'
import MenWithPhone from 'assets/images/men_with_phone.png'
import React from 'react'
import { IAdvert } from 'components/organisms/Dashboard/Adverts'
import api from 'services/api'
import { toast } from 'react-toastify'

const Footer = () => {
    const [recommendations, setRecommendations] = React.useState<Array<IAdvert> | null>(null)

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
                    <section className='mt-24'>
                        <div className='mb-10 flex items-center justify-between font-medium'>
                            <p>Recomendados para você</p>
                            <Link to='/search'>
                                <span className='text-primary'>Ver todos veículos disponíveis</span>
                            </Link>
                        </div>
                        <div className='grid grid-cols-5 gap-5'>
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
                                            description: item.about,
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
                <section className='mt-24 mb-[200px] flex items-center justify-center'>
                    <div className='grid h-[330px] w-full grid-cols-2 items-center justify-items-center rounded-2xl bg-gray-900'>
                        <p className='text-4xl font-semibold text-gray-200'>
                            Cuide melhor do seu <br />
                            veículo e <span className='text-primary'>economize muito.</span>
                        </p>
                        <div className='relative flex h-full w-full items-center justify-center'>
                            <img src={MenWithPhone} className='absolute bottom-0 right-[55%]' />
                            <div className='ml-[200px]'>
                                <p className='font-medium text-gray-200'>
                                    Conheça o Blog Oficial
                                    <br /> do OfertaRepasse.
                                </p>
                                <Button className='mt-4 bg-primary text-white'>
                                    Conhecer Blog
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
            <section className='border-t border-[#f4f4f4] pt-[100px]'>
                <div className='container mx-auto'>
                    <div className='grid grid-cols-6'>
                        {items.map((item) => (
                            <div key={item.title}>
                                <p className='mb-6 text-sm font-semibold text-gray-200'>
                                    {item.title}
                                </p>
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
                        <div className='col-span-5 flex items-center justify-between text-sm'>
                            <p className='font-medium'>
                                Atendimento de <strong>Segunda a Sexta</strong> 07:30 ás 18:00 -{' '}
                                <strong>Sábado</strong> 07:30 ás 12:00
                            </p>
                            <p>
                                Fale com nosso time{' '}
                                <Link to='/'>
                                    <span className='font-semibold text-primary'>
                                        Iniciar Chat Online
                                    </span>
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className='mt-8 border-t border-[#ECECEC] py-10'>
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
