import Button from 'components/atoms/Button'
import { IoCheckmark, IoHeartOutline, IoLogoWhatsapp } from 'react-icons/io5'
import { RiErrorWarningLine } from 'react-icons/ri'
// import { useParams } from 'react-router-dom'

const Info = () => {
    // const { id } = useParams()

    const info = {
        id: 12345,
        title: 'Honda Civic',
        subtitle: '1.5 16V TURBO GASOLINA TOURING 4P CVT',
        value: {
            fipe: 119.5,
            web: 121.2,
            ofertaRepasse: 89.5,
        },
        benefits: [
            'Aceita Troca',
            'Todas revisões feitas pela concessionária',
            'Garantia de Fábrica',
        ],
        city: 'Catanduva, SP',
        year: '2016/2017',
        km: 72000,
        exchange: 'CVT',
        bodywork: 'Sedã',
        fuel: 'Gasolina e Álcool',
        finalPlate: 0,
        color: 'Cinza',
        details: 'Pneus Velhos, leve amassado na porta esquerda, parachoque levemente danificado.',
        description:
            'TODO REVISADO / VERSÃO TOURING A TOP DE LINHA / SEM DETALHES / MANUAL E CHAVE RESERVA / TETO SOLAR / Na Victória Veículos os carros são revisados, de procedências certificadas, financiamento próprio e garantia são algumas das inúmeras vantagens que você tem ao realizar um negócio com a Victória! Toda a credibilidade de mais de 23 anos no mercado de seminovos. Outros Opcionais: Farol de neblina, Direção Elétrica, Comando de áudio no volante, Controle de estabilidade, Distribuição eletrônica de frenagem, Kit Multimídia, Pára-choques na cor do veículo.',
        items: [
            'Airbag',
            'Alarme',
            'Ar Quente',
            'Ar Condicionado',
            'Computador de bordo',
            'Controle de tração',
            'Desembaçador traseiro',
            'Banco com regulagem de altura',
            'Computador de bordo',
            'Controle de tração',
            'Desembaçador traseiro',
            'Banco com regulagem de altura',
            'Encosto de cabeça traseiro',
            'Freio ABS',
            'Controle automático de velocidade',
            'Rádio',
            'Rodas de liga leve',
            'Sensor de estacionamento',
            'Teto solar',
            'Retrovisor fotocrômico',
            'Travas elétricas',
            'Vidros elétricos',
            'Volante com regulagem de altura',
            'Bancos em couro',
            'GPS',
        ],
    }

    return (
        <section className='grid grid-cols-[1fr_auto] gap-10'>
            <div>
                <div className='flex items-start justify-between'>
                    <div>
                        <h1 className='mb-2 text-3xl font-extrabold uppercase text-gray-100'>
                            {info.title}
                        </h1>
                        <h2 className='text-xl font-medium uppercase text-gray-500'>
                            {info.subtitle}
                        </h2>
                    </div>
                    <button>
                        <IoHeartOutline className='text-3xl text-gray-500' />
                    </button>
                </div>
                <div className='my-8 flex justify-between '>
                    <div className='flex flex-wrap gap-6'>
                        {info.benefits.map((item, index) => (
                            <span
                                className='flex items-center gap-1 text-sm font-medium text-gray-200'
                                key={index}
                            >
                                <IoCheckmark className='text-primary' /> {item}
                            </span>
                        ))}
                    </div>
                    <span className='text-gray-600'>
                        <span className='font-bold'>ID</span> {info.id}
                    </span>
                </div>
                <div className='grid grid-cols-[1fr_20%] gap-3'>
                    <img
                        src='https://www.autoo.com.br/fotos/2022/2/960_720/kia1_11022022_70604_960_720.jpg'
                        className='max-h-[425px] w-full rounded-xl object-cover 2xl:max-h-[500px]'
                    />
                    <div className='flex w-full flex-col gap-1'>
                        <img
                            src='https://www.autoo.com.br/fotos/2022/2/960_720/kia1_11022022_70604_960_720.jpg'
                            className='w-full rounded-xl object-cover'
                        />
                        <img
                            src='https://www.autoo.com.br/fotos/2022/2/960_720/kia1_11022022_70604_960_720.jpg'
                            className='w-full rounded-xl object-cover'
                        />
                        <img
                            src='https://www.autoo.com.br/fotos/2022/2/960_720/kia1_11022022_70604_960_720.jpg'
                            className='w-full rounded-xl object-cover'
                        />
                    </div>
                </div>
                <div className='mt-10 grid grid-cols-3 rounded-xl bg-gray-100 p-8'>
                    <div className='text-white'>
                        <p className='text-xs font-medium'>
                            Valor <span className='text-lg font-bold'>fipe</span>
                        </p>
                        <p className='mt-2 mb-1 text-3xl'>R${info.value.fipe.toFixed(3)}</p>
                        <p className='text-xs'>Valor deste veículo na Tabela Fipe</p>
                    </div>
                    <div className='text-white'>
                        <p className='text-xs font-medium'>
                            Valor média <span className='text-lg font-bold'>web</span>
                        </p>
                        <p className='mt-2 mb-1 text-3xl'>R${info.value.web.toFixed(3)}</p>
                        <p className='text-xs'>valor médio em toda internet</p>
                    </div>
                    <div className='text-white'>
                        <p className='text-xs font-medium'>
                            Valor <span className='text-lg font-bold'>OfertaRepasse</span>
                        </p>
                        <p className='mt-2 mb-1 text-3xl'>
                            R${info.value.ofertaRepasse.toFixed(3)}
                        </p>
                        <p className='text-xs'>Valor deste veículo na Ofertarepasse</p>
                    </div>
                </div>
                <div className='px-8'>
                    <div className='mt-10 grid grid-cols-4 gap-y-10'>
                        <div>
                            <p className='mb-1 text-sm font-medium text-gray-500'>Cidade</p>
                            <p className='font-semibold text-gray-200'>{info.city}</p>
                        </div>
                        <div>
                            <p className='mb-1 text-sm font-medium text-gray-500'>Ano</p>
                            <p className='font-semibold text-gray-200'>{info.year}</p>
                        </div>
                        <div>
                            <p className='mb-1 text-sm font-medium text-gray-500'>KM</p>
                            <p className='font-semibold text-gray-200'>{info.km}</p>
                        </div>
                        <div>
                            <p className='mb-1 text-sm font-medium text-gray-500'>Câmbio</p>
                            <p className='font-semibold text-gray-200'>{info.exchange}</p>
                        </div>
                        <div>
                            <p className='mb-1 text-sm font-medium text-gray-500'>Carroceria</p>
                            <p className='font-semibold text-gray-200'>{info.bodywork}</p>
                        </div>
                        <div>
                            <p className='mb-1 text-sm font-medium text-gray-500'>Combustível</p>
                            <p className='font-semibold text-gray-200'>{info.fuel}</p>
                        </div>
                        <div>
                            <p className='mb-1 text-sm font-medium text-gray-500'>Final da Placa</p>
                            <p className='font-semibold text-gray-200'>{info.finalPlate}</p>
                        </div>
                        <div>
                            <p className='mb-1 text-sm font-medium text-gray-500'>Cor</p>
                            <p className='font-semibold text-gray-200'>{info.color}</p>
                        </div>
                    </div>
                    <div className='my-20'>
                        <p className='flex items-center gap-3 text-sm font-medium text-secondary'>
                            <RiErrorWarningLine className='text-2xl' />
                            Detalhes do Veículo
                        </p>
                        <p className='mt-4 font-semibold text-secondary'>
                            Pneus Velhos, leve amassado na porta esquerda, parachoque levemente
                            danificado.
                        </p>
                    </div>
                    <div className='mt-10'>
                        <p className='mb-4 text-sm font-medium text-gray-500'>Outras Informações</p>
                        <p className='font-medium text-gray-200'>{info.description}</p>
                    </div>
                    <div className='mt-10'>
                        <p className='mb-4 text-sm font-medium text-gray-500'>Itens do veículo</p>
                        <div className='mt-7 grid grid-cols-4 gap-4'>
                            {info.items.map((item, index) => (
                                <p
                                    key={index}
                                    className='flex items-center gap-1 font-semibold text-gray-200'
                                >
                                    <IoCheckmark className='text-primary' /> {item}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='relative'>
                <div className='sticky top-5 text-gray-100'>
                    <div className='px-12'>
                        <p className='text-xs font-medium'>
                            Valor <span className='text-lg font-bold'>OfertaRepasse</span>
                        </p>
                        <p className='mt-2 mb-1 text-3xl'>
                            R${info.value.ofertaRepasse.toFixed(3)}
                        </p>
                        <p className='text-xs'>R$20.000,00 comparado a tabela fipe.</p>
                    </div>
                    <div className='my-7 grid grid-cols-2 border-y border-gray-700 bg-[#efefef] px-12 py-5'>
                        <div>
                            <p className='text-sm font-bold'>fipe</p>
                            <p className='mt-2 mb-1 text-2xl'>
                                R${info.value.ofertaRepasse.toFixed(3)}
                            </p>
                            <p className='max-w-[150px] text-xs'>
                                R$20.000,00 comparado a tabela fipe.
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 text-white'>
                        <Button className='!bg-primary !py-4 font-semibold'>Comprar Veículo</Button>
                        <Button className='!bg-gray-100 !py-4 font-semibold'>
                            Tenho Interesse
                        </Button>
                        <Button className='flex items-center justify-center gap-2 !bg-[#25D366] !py-4 font-semibold'>
                            <IoLogoWhatsapp className='text-xl' />
                            Conversar pelo WhatsApp
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Info
