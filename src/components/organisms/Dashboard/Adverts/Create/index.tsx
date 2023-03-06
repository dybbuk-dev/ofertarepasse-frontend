/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import Button from 'components/atoms/Button'
import Card from 'components/atoms/Card'
import * as React from 'react'
import { BiImageAlt } from 'react-icons/bi'
import { IoCheckmarkOutline } from 'react-icons/io5'
import { useForm } from 'react-hook-form'
import api from 'services/api'
import { useAuth } from 'hooks/auth'
import { toast } from 'react-toastify'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import formatMoney from 'utils/formatMoney'

interface IDataForm {
    title: string
    images: FileList
    plate: string
    kilometer: number
    about: string
    value: number
    userId: string
    alert: string
}

interface IAdvert {
    id: string
    title: string
    plate: string
    images: null
    brand: string
    model: string
    fuel: string
    amountPeaple: number
    rolling: number
    modelYear: string
    manufactureYear: string
    version: string
    color: string
    kilometer: number
    value: number
    about: string
    alert: string
    views: number
    active: true
    city: string
    state: string
    highlight: string[]
}

const DivCustom = styled.div`
    .field {
        width: 100%;
        background: transparent;
        padding: 20px 16px;
        font-size: 15px;
        font-weight: 500;
        color: #484854;
        outline: none;

        ::placeholder {
            color: #48485471;
        }
    }
`

const DefaultBox = ({ title, children }: { title: string; children: React.ReactNode }) => {
    return (
        <div className='rounded-xl bg-white'>
            <div className='border-b border-gray-700 px-5 py-4'>
                <p className='text-gray-400'>{title}</p>
            </div>
            <DivCustom>{children}</DivCustom>
        </div>
    )
}

const CreateAdverts = () => {
    const [highlight, setHighlight] = React.useState<Array<string>>([])
    const [infoPlate, setInfoPlate] = React.useState<any>(null)
    const [loading, setLoading] = React.useState(false)
    const [advert, setAdvert] = React.useState<IAdvert | null>(null)

    const { register, handleSubmit, watch } = useForm<IDataForm>()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const onSubmit = async (dataForm: IDataForm) => {
        setLoading(true)
        if (advert) {
            const { data } = await api.patch(`/api/v1/adverts/${advert.id}`, {
                title: dataForm.title,
                kilometer: dataForm.kilometer,
                about: dataForm.about,
                alert: dataForm.alert,
                value: dataForm.value,
                highlight: highlight,
            })

            if (data) {
                if (data && data.error) {
                    toast.error(
                        'Verifique os campos do seu formulário, pode ter algo incorreto ou faltando.'
                    )
                } else {
                    toast.success('Anúncio atualizado')
                    navigate('/dashboard/adverts')
                }
            }
        } else {
            const { data } = await api.post('/api/v1/adverts', {
                title: dataForm.title,
                plate: infoPlate.veiculo.placa,
                brand: infoPlate.veiculo.marca_modelo.split('/')[0],
                model: infoPlate.veiculo.marca_modelo.split('/')[1],
                modelYear: infoPlate.veiculo.ano.split('/')[0],
                manufactureYear: infoPlate.veiculo.ano.split('/')[1],
                version: infoPlate.fipes[0].marca_modelo,
                color: infoPlate.veiculo.cor,
                kilometer: dataForm.kilometer,
                about: dataForm.about,
                alert: dataForm.alert,
                value: dataForm.value,
                userId: user?.id,
                city: infoPlate.veiculo.municipio,
                state: infoPlate.veiculo.uf,
                fuel:
                    infoPlate.veiculo.combustivel.search('/') !== -1
                        ? 'Flex'
                        : infoPlate.veiculo.combustivel,
                amountPeaple: infoPlate.veiculo.quantidade_passageiro,
                rolling: infoPlate.veiculo.cilindradas,
                highlight: highlight,
                fipeValue: infoPlate.fipes[0].valor,
            })

            if (data && data.error) {
                toast.error(
                    'Verifique os campos do seu formulário, pode ter algo incorreto ou faltando.'
                )
            } else {
                toast.success('Anúncio criado')
                navigate('/dashboard/adverts')
            }
        }
    }

    const getInfoPlate = async (dataForm: any) => {
        setLoading(true)
        try {
            const { data } = await api.get(
                `https://placas.fipeapi.com.br/placas/${dataForm.plate.replace('-', '')}?key=${
                    process.env.REACT_APP_WIPSITES
                }`,
                {
                    transformRequest: (_, headers) => {
                        delete headers['Authorization']
                    },
                }
            )

            if (data) {
                if (data.data.fipes.length === 0) {
                    setLoading(false)
                    return toast.error('Veiculo não identificado')
                }
                setInfoPlate(data.data)
                setLoading(false)
            }
        } catch (err: any) {
            toast.error(err.response.data.message)
            setLoading(false)
        }
    }

    const handleSelectItem = (
        state: Array<string>,
        setState: React.Dispatch<React.SetStateAction<Array<string>>>,
        item: string
    ) => {
        if (state.find((itemFind) => itemFind === item)) {
            setState(state.filter((itemFilter) => itemFilter !== item))
        } else {
            setState([...state, item])
        }
    }

    const itemsHighlightVehicle = [
        'Airbag',
        'Alarme',
        'Ar Concidionado',
        'Ar Quente',
        'Computador de Bordo',
        'Controle de Tração',
        'Desembaçador traseiro',
        'Banco com regulagem de altura',
        'Freio ABS',
        'Controle automático de velocidade',
    ]

    React.useEffect(() => {
        const getAdvertById = async () => {
            const id = searchParams.get('id')
            if (id) {
                const { data } = await api.get(`/api/v1/adverts/${id}`)

                if (data) {
                    setAdvert(data)
                    setHighlight(data.highlight)
                    await getInfoPlate({ plate: data.plate })
                }
            }
        }

        getAdvertById()
    }, [])

    return (
        <div>
            <section>
                <p className='text-3xl font-light'>Criar Novo Anúncio</p>
                <p className='mt-4 text-sm'>Vamos começar seu anúncio?</p>
            </section>
            <section className='mt-14'>
                <div className='grid grid-cols-[350px_auto] gap-x-[100px]'>
                    <form
                        className='flex flex-col gap-5'
                        onSubmit={infoPlate ? handleSubmit(onSubmit) : handleSubmit(getInfoPlate)}
                    >
                        <DefaultBox title='Placa do Veículo'>
                            <input
                                placeholder='Ex: ABC-1234'
                                autoFocus={true}
                                className='field'
                                defaultValue={advert?.plate}
                                readOnly={!!advert?.plate}
                                {...register('plate')}
                            />
                        </DefaultBox>
                        <div className='rounded-xl border border-dashed border-gray-700 bg-white py-8 px-5'>
                            <BiImageAlt className='text-3xl text-primary' />
                            <div className='mt-3 mb-5'>
                                <p className='text-smd font-medium text-gray-400'>
                                    Clique ou arraste aqui para enviar imagens do seu veículo.
                                </p>
                                <p className='text-sm text-gray-400'>Tamanho máximo 2MB cada</p>
                            </div>
                            <label
                                className='rounded border border-gray-600 py-2 px-4 font-medium text-gray-500'
                                role='button'
                            >
                                Procurar
                                <input
                                    type='file'
                                    className='hidden'
                                    accept='image/png, image/jpeg'
                                    {...register('images')}
                                />
                            </label>
                        </div>
                        {infoPlate ? (
                            <>
                                <DefaultBox title='Título'>
                                    <input
                                        className='field'
                                        placeholder='Ex: Honda Civic 4 portas 2020'
                                        defaultValue={advert?.title}
                                        {...register('title')}
                                    />
                                </DefaultBox>
                                <DefaultBox title='Marca'>
                                    <p className='field'>
                                        {infoPlate.veiculo.marca_modelo.split('/')[0]}
                                    </p>
                                </DefaultBox>
                                <DefaultBox title='Modelo'>
                                    <p className='field'>
                                        {infoPlate.veiculo.marca_modelo.split('/')[1]}
                                    </p>
                                </DefaultBox>
                                <DefaultBox title='Ano do modelo'>
                                    <p className='field'>{infoPlate.veiculo.ano.split('/')[0]}</p>
                                </DefaultBox>
                                <DefaultBox title='Ano da Fabricação'>
                                    <p className='field'>{infoPlate.veiculo.ano.split('/')[1]}</p>
                                </DefaultBox>
                                <DefaultBox title='Versão'>
                                    <p className='field'>{infoPlate.fipes[0].marca_modelo}</p>
                                </DefaultBox>
                                <DefaultBox title='Cor'>
                                    <p className='field'>{infoPlate.veiculo.cor}</p>
                                </DefaultBox>
                                <DefaultBox title='Combustível'>
                                    <p className='field'>
                                        {infoPlate.veiculo.combustivel.search('/') !== -1
                                            ? 'Flex'
                                            : infoPlate.veiculo.combustivel}
                                    </p>
                                </DefaultBox>
                                <DefaultBox title='Quantidade de pessoas'>
                                    <p className='field'>
                                        {infoPlate.veiculo.quantidade_passageiro}
                                    </p>
                                </DefaultBox>
                                <DefaultBox title='Cilindradas'>
                                    <p className='field'>{infoPlate.veiculo.cilindradas}</p>
                                </DefaultBox>
                                <div className='mt-16'>
                                    <p className='text-3xl font-light'>
                                        Mais Informações do Veículo
                                    </p>
                                    <p className='mt-4 text-sm'>Vamos completar seu anúncio</p>
                                </div>
                                <DefaultBox title='Quanto seu veículo já rodou?'>
                                    <input
                                        placeholder='0 km'
                                        className='field'
                                        type='number'
                                        defaultValue={advert?.kilometer}
                                        {...register('kilometer')}
                                    />
                                </DefaultBox>
                                <DefaultBox title='Sobre o veículo'>
                                    <textarea
                                        maxLength={500}
                                        defaultValue={advert?.about}
                                        rows={8}
                                        className='field'
                                        {...register('about')}
                                    />
                                </DefaultBox>
                                <DefaultBox title='Alerta'>
                                    <textarea
                                        maxLength={500}
                                        defaultValue={advert?.alert}
                                        rows={8}
                                        className='field'
                                        placeholder='Pneus Velhos, leve amassado na porta esquerda, parachoque levemente danificado.'
                                        {...register('alert')}
                                    />
                                </DefaultBox>
                                <DefaultBox title='Valor'>
                                    <input
                                        placeholder='R$'
                                        className='field'
                                        defaultValue={advert?.value}
                                        {...register('value')}
                                    />
                                </DefaultBox>
                                <div className='grid grid-cols-2 rounded-2xl bg-white px-3 py-5'>
                                    <div>
                                        <p className='text-sm font-bold'>fipe</p>
                                        <p className='mt-2 mb-1 text-xl'>
                                            {formatMoney(infoPlate.fipes[0].valor)}
                                        </p>
                                        <p className='max-w-[150px] text-xs'>
                                            Valor deste veículo na Tabela Fipe
                                        </p>
                                    </div>
                                    <div>
                                        <p className='text-sm font-bold'>web</p>
                                        <p className='mt-2 mb-1 text-xl'>
                                            {formatMoney(
                                                infoPlate.fipes[0].valor +
                                                    infoPlate.fipes[0].valor * 0.2
                                            )}
                                        </p>
                                        <p className='max-w-[150px] text-xs'>
                                            Valor médio de venda em toda internet
                                        </p>
                                    </div>
                                </div>

                                <div className='mt-16'>
                                    <p className='text-3xl font-light'>Destaque seu Veículo</p>
                                    <p className='mt-4 text-sm'>Estamos acabando</p>
                                </div>
                                <div className='flex flex-wrap items-center gap-4'>
                                    {itemsHighlightVehicle.map((item, index) => (
                                        <button
                                            key={index}
                                            type='button'
                                            className={`rounded-full  px-7 py-2 font-semibold text-gray-200 ${
                                                highlight.find((itemFind) => itemFind === item)
                                                    ? 'bg-primary !text-white'
                                                    : 'bg-white'
                                            }`}
                                            onClick={() =>
                                                handleSelectItem(highlight, setHighlight, item)
                                            }
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </>
                        ) : null}
                        <Button
                            className='mt-20 flex !w-max items-center gap-2 bg-primary text-white'
                            loading={loading}
                            type='submit'
                        >
                            {infoPlate ? (
                                <>
                                    <IoCheckmarkOutline className='text-2xl' />{' '}
                                    {advert
                                        ? 'Atualizar meu anúncio'
                                        : 'Pronto, publicar meu anúncio'}
                                </>
                            ) : (
                                'Buscar veiculo'
                            )}
                        </Button>
                    </form>
                    <div className='relative h-full w-[240px]'>
                        <div className='sticky top-10'>
                            <p className='mb-5 text-sm font-medium'>Pré-visualização do anúncio</p>
                            <Card
                                data={{
                                    title: String(watch('title') ? watch('title') : '-----'),
                                    description: infoPlate
                                        ? infoPlate.fipes[0].marca_modelo
                                        : '--------',
                                    price: Number(watch('value') ? watch('value') : 0),
                                    year: infoPlate ? infoPlate.veiculo.ano : '----',
                                    distance: Number(
                                        watch('kilometer') ? watch('kilometer') : '----'
                                    ),
                                    location: infoPlate
                                        ? `${infoPlate.veiculo.municipio} - ${infoPlate.veiculo.uf}`
                                        : '----',
                                }}
                                inverseColors={true}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CreateAdverts
