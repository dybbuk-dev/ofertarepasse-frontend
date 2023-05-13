/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from 'components/atoms/Button'
import Card from 'components/atoms/Card'
import * as React from 'react'
import { BiImageAlt } from 'react-icons/bi'
import {
    IoCheckmarkCircle,
    IoCheckmarkOutline,
    IoCloseCircle,
    IoStar,
    IoStarOutline,
    IoTrash,
} from 'react-icons/io5'
import { useForm } from 'react-hook-form'
import api from 'services/api'
import { useAuth } from 'hooks/auth'
import { toast } from 'react-toastify'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import formatMoney from 'utils/formatMoney'
import getUrlAws from 'utils/getUrlAws'
import ReactInputMask from 'react-input-mask'
import { produce } from 'immer'

interface IDataForm {
    title: string
    images: FileList | File[]
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
    images: FileList | null | string[]
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

const DefaultBox = ({
    title,
    children,
    checked,
    position = 'center',
    error = false,
}: {
    title: string
    children: React.ReactNode
    checked?: boolean
    position?: 'center' | 'end'
    error?: boolean
}) => {
    return (
        <div className='rounded-xl bg-white'>
            <div className='border-b border-gray-700 px-5 py-4'>
                <p className='text-gray-400'>{title}</p>
            </div>
            <DivCustom
                className={`relative flex ${position === 'center' ? 'items-center' : 'items-end'}`}
            >
                {children}
                {error ? (
                    <IoCloseCircle
                        className={`absolute ${
                            position !== 'center' ? 'bottom-2' : ''
                        } right-2 text-2xl text-red-500 duration-200 ease-in-out`}
                    />
                ) : (
                    <IoCheckmarkCircle
                        className={`absolute ${
                            position !== 'center' ? 'bottom-2' : ''
                        } right-2 text-2xl text-green-500 duration-200 ease-in-out ${
                            checked ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                )}
            </DivCustom>
        </div>
    )
}

const CreateAdverts = () => {
    const [highlight, setHighlight] = React.useState<Array<string>>([])
    const [images, setImages] = React.useState<Array<File | string>>([])
    const [infoPlate, setInfoPlate] = React.useState<any>(null)
    const [loading, setLoading] = React.useState(false)
    const [advert, setAdvert] = React.useState<IAdvert | null>(null)
    const [loadingPage, setLoadingPage] = React.useState(true)
    const [imagesDeleted, setImagesDeleted] = React.useState<Array<string>>([])
    const [reorderImage, setReorderImage] = React.useState(false)

    const { register, handleSubmit, watch } = useForm<IDataForm>()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

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

    const uploadImage = async (images: File[], id: string) => {
        const formData = new FormData()
        images.forEach((file) => {
            formData.append('files', file)
        })

        const { status } = await api.post(`/api/v1/adverts/${id}/upload-file`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })

        return status
    }

    const onSubmit = async (dataForm: IDataForm) => {
        setLoading(true)

        const { correct } = verifyPrice(dataForm.value)

        if (!correct) {
            setLoading(false)
            return toast.error('Valor do veículo está acima do permitido')
        }

        if (advert) {
            const { data } = await api.patch(`/api/v1/adverts/${advert.id}`, {
                title: `${infoPlate.veiculo.marca} ${infoPlate.veiculo.modelo}`,
                kilometer: dataForm.kilometer,
                about: dataForm.about,
                alert: dataForm.alert,
                value: dataForm.value,
                highlight: highlight,
                images: reorderImage ? images : undefined,
            })

            if (data) {
                if (data && data.error) {
                    setLoading(false)
                    return toast.error(
                        'Verifique os campos do seu formulário, pode ter algo incorreto ou faltando.'
                    )
                } else {
                    if (
                        images.length > 0 &&
                        images.filter((item) => typeof item !== 'string').length > 0
                    ) {
                        const status = await uploadImage(
                            images.filter((item) => typeof item !== 'string') as Array<File>,
                            advert.id
                        )

                        if (status !== 201) {
                            toast.error('Erro ao enviar as imagens do seu anúncio')
                        }
                    }

                    if (imagesDeleted.length > 0) {
                        try {
                            await api.post(`/api/v1/adverts/${advert.id}/delete-file`, {
                                files: imagesDeleted,
                            })
                        } catch (err) {
                            toast.error('Erro ao excluir imagens antigas do anúncio')
                        }
                    }

                    toast.success('Anúncio atualizado')
                    navigate('/dashboard/adverts')
                }
            }
        } else {
            try {
                const { data } = await api.post('/api/v1/adverts', {
                    title: `${infoPlate.veiculo.marca} ${infoPlate.veiculo.modelo}`,
                    plate: infoPlate.veiculo.placa,
                    brand: infoPlate.veiculo.marca,
                    model: infoPlate.veiculo.modelo,
                    modelYear: infoPlate.veiculo.ano.split('/')[0],
                    manufactureYear: infoPlate.veiculo.ano.split('/')[1],
                    version: infoPlate.veiculo.versao,
                    color: infoPlate.veiculo.cor,
                    kilometer: dataForm.kilometer,
                    about: dataForm.about,
                    alert: dataForm.alert,
                    value: dataForm.value,
                    user: user?.id,
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
                    setLoading(false)
                    return toast.error(
                        'Verifique os campos do seu formulário, pode ter algo incorreto ou faltando.'
                    )
                } else {
                    if (images.length > 0) {
                        const status = await uploadImage(
                            images.filter((item) => typeof item !== 'string') as Array<File>,
                            data.id
                        )

                        if (status !== 201) {
                            toast.error('Erro ao enviar as imagens do seu anúncio')
                        }
                    }

                    toast.success('Anúncio criado')
                    navigate('/dashboard/adverts')
                }
            } catch (err: any) {
                toast.error(err.response.data.message[0])
                setLoading(false)
            }
        }
    }

    const getInfoPlate = async (dataForm: any) => {
        setLoading(true)
        try {
            const { data } = await api.get(`/api/v1/fipe?plate=${dataForm.plate.replace('-', '')}`)

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

    const verifyPrice = (price: number) => {
        if (infoPlate.fipes[0].valor) {
            let minValue = infoPlate.fipes[0].valor * 0.05
            minValue = infoPlate.fipes[0].valor - minValue

            return {
                minValue,
                correct: price <= minValue,
            }
        } else {
            return {
                minValue: 0,
                correct: false,
            }
        }
    }

    React.useEffect(() => {
        const getAdvertById = async () => {
            const id = searchParams.get('id')
            if (id) {
                const { data } = await api.get(`/api/v1/adverts/${id}`)

                if (data) {
                    setAdvert(data)
                    setImages(data.images)
                    setHighlight(data.highlight)
                    await getInfoPlate({ plate: data.plate })
                }
            }

            setLoadingPage(false)
        }

        getAdvertById()
    }, [])

    if (loadingPage) return null

    return (
        <div>
            <section>
                <p className='text-3xl font-light'>
                    {searchParams.get('id') ? 'Atualizar anúncio' : 'Criar Novo Anúncio'}
                </p>
                <p className='mt-4 text-sm'>
                    {searchParams.get('id')
                        ? 'Vamos atualizar seu anúncio?'
                        : 'Vamos começar seu anúncio?'}
                </p>
            </section>
            <section className='mt-14'>
                <div className='grid grid-cols-[350px_auto] gap-x-[100px]'>
                    <form
                        className='flex flex-col gap-5'
                        onSubmit={infoPlate ? handleSubmit(onSubmit) : handleSubmit(getInfoPlate)}
                    >
                        <DefaultBox
                            title='Placa do Veículo'
                            checked={
                                (!!watch('plate') && watch('plate').length === 8) || !!advert?.plate
                            }
                        >
                            <ReactInputMask
                                mask='aaa-****'
                                placeholder='Ex: ABC-1234'
                                autoFocus={true}
                                className='field'
                                defaultValue={advert?.plate}
                                readOnly={!!advert?.plate}
                                alwaysShowMask={false}
                                maskChar={null}
                                {...register('plate')}
                            />
                        </DefaultBox>
                        {infoPlate ? (
                            <>
                                <div className='rounded-xl border border-dashed border-gray-700 bg-white py-8 px-5'>
                                    <BiImageAlt className='text-3xl text-primary' />
                                    <div className='mt-3 mb-5'>
                                        <p className='text-smd font-medium text-gray-400'>
                                            Clique em &quot;Procurar&quot; logo a baixo para enviar
                                            imagens do seu veículo.
                                        </p>
                                        <p className='mt-2 text-xs text-gray-400'>
                                            Maximo de 12 fotos com o tamanho máximo de 2MB cada
                                        </p>
                                    </div>
                                    <label
                                        className='rounded border border-gray-600 py-2 px-4 font-medium text-gray-500'
                                        role='button'
                                    >
                                        Procurar
                                        <input
                                            type='file'
                                            className='hidden'
                                            multiple={true}
                                            accept='image/png, image/jpeg'
                                            onChange={(e) => {
                                                e.target.files
                                                    ? setImages([...images, ...e.target.files])
                                                    : []
                                            }}
                                        />
                                    </label>
                                    {images.length > 0 ? (
                                        <div className='mt-8 grid grid-cols-3 gap-2'>
                                            <p className='col-span-3 text-sm text-gray-400'>
                                                Imagens do anúncio:
                                            </p>
                                            {images.map((item, index) => {
                                                return (
                                                    <div
                                                        className={
                                                            'relative h-[80px] w-[100px] overflow-hidden rounded duration-200 ease-in-out'
                                                        }
                                                        key={index}
                                                    >
                                                        <div
                                                            className={
                                                                'absolute top-0 left-0 flex h-full w-full items-center justify-center bg-[#00000099] opacity-0 hover:opacity-100'
                                                            }
                                                        >
                                                            <button
                                                                type='button'
                                                                onClick={() => {
                                                                    if (!reorderImage)
                                                                        setReorderImage(true)

                                                                    setImages(
                                                                        produce(images, (draft) => {
                                                                            const itemChange =
                                                                                draft[0]

                                                                            draft[0] = item
                                                                            draft[index] =
                                                                                itemChange
                                                                        })
                                                                    )
                                                                }}
                                                            >
                                                                {index === 0 ? (
                                                                    <IoStar className='text-2xl text-yellow-500' />
                                                                ) : (
                                                                    <IoStarOutline className='text-2xl text-white' />
                                                                )}
                                                            </button>
                                                            <button
                                                                type='button'
                                                                className='ml-3'
                                                                onClick={() => {
                                                                    setImages(
                                                                        images.filter(
                                                                            (itemFilter) =>
                                                                                itemFilter !== item
                                                                        )
                                                                    )
                                                                    if (typeof item === 'string') {
                                                                        setImagesDeleted([
                                                                            ...imagesDeleted,
                                                                            item as string,
                                                                        ])
                                                                    }
                                                                }}
                                                            >
                                                                <IoTrash className='text-2xl text-white' />
                                                            </button>
                                                        </div>
                                                        <img
                                                            src={
                                                                typeof item !== 'string'
                                                                    ? URL.createObjectURL(
                                                                          item as any
                                                                      )
                                                                    : getUrlAws(item as string)
                                                            }
                                                            className='h-full w-full object-cover'
                                                        />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    ) : null}
                                </div>
                                <DefaultBox
                                    title='Título'
                                    checked={!!infoPlate.veiculo.marca_modelo}
                                >
                                    <p className='field'>
                                        {`${infoPlate.veiculo.marca} ${infoPlate.veiculo.modelo}`}
                                    </p>
                                </DefaultBox>
                                <DefaultBox title='Marca' checked={!!infoPlate.veiculo.marca}>
                                    <p className='field'>{infoPlate.veiculo.marca}</p>
                                </DefaultBox>
                                <DefaultBox title='Modelo' checked={!!infoPlate.veiculo.modelo}>
                                    <p className='field'>{infoPlate.veiculo.modelo}</p>
                                </DefaultBox>
                                <DefaultBox title='Versão' checked={!!infoPlate.veiculo.versao}>
                                    <p className='field'>{infoPlate.veiculo.versao}</p>
                                </DefaultBox>
                                <DefaultBox
                                    title='Ano do modelo / fabricação'
                                    checked={!!infoPlate.veiculo.ano}
                                >
                                    <p className='field'>{infoPlate.veiculo.ano}</p>
                                </DefaultBox>
                                <DefaultBox title='Cor' checked={!!infoPlate.veiculo.cor}>
                                    <p className='field'>{infoPlate.veiculo.cor}</p>
                                </DefaultBox>
                                <DefaultBox
                                    title='Combustível'
                                    checked={!!infoPlate.veiculo.combustivel}
                                >
                                    <p className='field'>
                                        {infoPlate.veiculo.combustivel.search('/') !== -1
                                            ? 'Flex'
                                            : infoPlate.veiculo.combustivel}
                                    </p>
                                </DefaultBox>
                                <DefaultBox
                                    title='Quantidade de pessoas'
                                    checked={!!infoPlate.veiculo.quantidade_passageiro}
                                >
                                    <p className='field'>
                                        {infoPlate.veiculo.quantidade_passageiro}
                                    </p>
                                </DefaultBox>
                                <div className='mt-16'>
                                    <p className='text-3xl font-light'>
                                        Mais Informações do Veículo
                                    </p>
                                    <p className='mt-4 text-sm'>Vamos completar seu anúncio</p>
                                </div>
                                <DefaultBox
                                    title='Quanto seu veículo já rodou?'
                                    checked={!!watch('kilometer') || !!advert?.kilometer}
                                >
                                    <input
                                        placeholder='0 km'
                                        className='field'
                                        type='number'
                                        defaultValue={advert?.kilometer}
                                        {...register('kilometer')}
                                    />
                                </DefaultBox>
                                <DefaultBox
                                    title='Sobre o veículo'
                                    checked={!!advert?.about || !!watch('about')}
                                    position='end'
                                >
                                    <textarea
                                        maxLength={500}
                                        defaultValue={advert?.about}
                                        rows={8}
                                        className='field'
                                        {...register('about')}
                                    />
                                </DefaultBox>
                                <DefaultBox
                                    title='Alerta'
                                    position='end'
                                    checked={!!advert?.alert || !!watch('alert')}
                                >
                                    <textarea
                                        maxLength={500}
                                        defaultValue={advert?.alert}
                                        rows={8}
                                        className='field'
                                        placeholder='Pneus Velhos, leve amassado na porta esquerda, parachoque levemente danificado.'
                                        {...register('alert')}
                                    />
                                </DefaultBox>
                                <div>
                                    <DefaultBox
                                        title='Valor'
                                        checked={
                                            (!!watch('value') &&
                                                verifyPrice(Number(watch('value'))).correct) ||
                                            !!advert?.value
                                        }
                                        error={
                                            !verifyPrice(
                                                Number(advert ? advert?.value : watch('value'))
                                            ).correct
                                        }
                                    >
                                        <input
                                            placeholder='R$'
                                            className='field'
                                            defaultValue={advert?.value}
                                            type='number'
                                            {...register('value')}
                                        />
                                    </DefaultBox>
                                    <p className='mt-1 ml-2 text-[12px] font-light'>
                                        O veículo tem que ser no máximo{' '}
                                        {formatMoney(verifyPrice(Number(watch('value'))).minValue)}{' '}
                                        que corresponde a 5% abaixo da FIPE
                                    </p>
                                </div>
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
                    <div className='relative h-full w-[290px]'>
                        <div className={`sticky top-10 ${infoPlate ? 'block' : 'hidden'}`}>
                            <p className='mb-5 text-sm font-medium'>Pré-visualização do anúncio</p>
                            <Card
                                data={{
                                    id: '',
                                    images: images.length > 0 ? images : null,
                                    title: infoPlate
                                        ? `${infoPlate.veiculo.marca} ${infoPlate.veiculo.modelo}`
                                        : '',
                                    description: infoPlate ? infoPlate.veiculo.versao : '--------',
                                    price: Number(
                                        watch('value') ? watch('value') : advert ? advert.value : 0
                                    ),
                                    year: infoPlate ? infoPlate.veiculo.ano : '----',
                                    distance: Number(
                                        watch('kilometer')
                                            ? watch('kilometer')
                                            : advert
                                            ? advert.kilometer
                                            : '----'
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
