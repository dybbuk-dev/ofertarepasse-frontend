/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import Button from 'components/atoms/Button'
import Card from 'components/atoms/Card'
import InputMask, { ReactInputMask, Props } from 'react-input-mask'
import * as React from 'react'
import { BiImageAlt } from 'react-icons/bi'
import { IoCheckmarkOutline } from 'react-icons/io5'
import { useForm } from 'react-hook-form'
import api from 'services/api'
import { useAuth } from 'hooks/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

interface IInput extends Props {
    title: string
}

interface ITextArea extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    title: string
}

interface IDataForm {
    images: FileList
    plate: string
    kilometer: number
    about: string
    value: number
    userId: string
}

interface IBox {
    title: string
    value: string
}

type RefInput = ReactInputMask
type RefTextarea = HTMLTextAreaElement

const Box = ({ title, value }: IBox) => (
    <div className='rounded-xl bg-white'>
        <div className='border-b border-gray-700 px-5 py-4'>
            <p className='text-gray-400'>{title}</p>
        </div>
        <p className='w-full bg-transparent px-5 py-4 text-smd font-medium text-gray-400 outline-none'>
            {value}
        </p>
    </div>
)

const Input = React.forwardRef<RefInput, IInput>(({ title, ...props }, ref) => {
    return (
        <div className='rounded-xl bg-white'>
            <div className='border-b border-gray-700 px-5 py-4'>
                <p className='text-gray-400'>{title}</p>
            </div>
            <InputMask
                className='w-full bg-transparent px-5 py-4 text-smd font-medium text-gray-400 outline-none'
                ref={ref}
                {...props}
            />
        </div>
    )
})

const TextArea = React.forwardRef<RefTextarea, ITextArea>(({ title, maxLength, ...props }, ref) => {
    const lenghtRef = React.useRef<HTMLSpanElement | null>(null)

    return (
        <div className='rounded-xl bg-white'>
            <div className='flex items-center justify-between border-b border-gray-700 px-5 py-4'>
                <p className='text-gray-400'>{title}</p>
                <span className='text-sm' ref={lenghtRef}>
                    0/{maxLength}
                </span>
            </div>
            <textarea
                className='w-full bg-transparent px-5 py-4 text-smd font-medium text-gray-400 outline-none'
                rows={10}
                maxLength={maxLength}
                onChange={(e) => {
                    if (lenghtRef.current) {
                        lenghtRef.current.innerText = `${e.target.value.length}/${maxLength}`
                    }
                }}
                ref={ref}
                {...props}
            />
        </div>
    )
})

const CreateAdverts = () => {
    const [highlight, setHighlight] = React.useState<Array<string>>([])
    const [infoPlate, setInfoPlate] = React.useState<any>(null)
    const [loading, setLoading] = React.useState(false)

    const { register, handleSubmit, watch } = useForm<IDataForm>()
    const { user } = useAuth()
    const navigate = useNavigate()

    const onSubmit = async (dataForm: IDataForm) => {
        setLoading(true)
        // console.log({
        //     plate: infoPlate.veiculo.placa,
        //     brand: infoPlate.veiculo.marca_modelo.split('/')[0],
        //     model: infoPlate.veiculo.marca_modelo.split('/')[1],
        //     modelYear: infoPlate.veiculo.ano.split('/')[0],
        //     manufactureYear: infoPlate.veiculo.ano.split('/')[1],
        //     version: infoPlate.fipes[0].marca_modelo,
        //     color: infoPlate.veiculo.cor,
        //     kilometer: dataForm.kilometer,
        //     about: dataForm.about,
        //     value: dataForm.value,
        //     userId: user?.id,
        //     city: infoPlate.veiculo.municipio,
        //     state: infoPlate.veiculo.uf,
        //     fuel:
        //         infoPlate.veiculo.combustivel.search('/') !== -1
        //             ? 'Flex'
        //             : infoPlate.veiculo.combustivel,
        //     amountPeaple: infoPlate.veiculo.quantidade_passageiro,
        //     rolling: infoPlate.veiculo.cilindradas,
        //     highlight: highlight,
        // })

        const { data } = await api.post(
            '/api/v1/adverts',
            {
                plate: infoPlate.veiculo.placa,
                brand: infoPlate.veiculo.marca_modelo.split('/')[0],
                model: infoPlate.veiculo.marca_modelo.split('/')[1],
                modelYear: infoPlate.veiculo.ano.split('/')[0],
                manufactureYear: infoPlate.veiculo.ano.split('/')[1],
                version: infoPlate.fipes[0].marca_modelo,
                color: infoPlate.veiculo.cor,
                kilometer: dataForm.kilometer,
                about: dataForm.about,
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
            },
            {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            }
        )

        if (data && data.error) {
            toast.error(
                'Verifique os campos do seu formulário, pode ter algo incorreto ou faltando.'
            )
        } else {
            toast.success('Anúncio criado')
            navigate('/dashboard/adverts')
        }
    }

    const getInfoPlate = async (dataForm: IDataForm) => {
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
                        <Input
                            mask='aaa-****'
                            maskChar=''
                            title='Placa do Veículo'
                            placeholder='Ex: ABC-1234'
                            autoFocus={true}
                            {...register('plate')}
                        />
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
                                <Box
                                    title='Marca'
                                    value={infoPlate.veiculo.marca_modelo.split('/')[0]}
                                />
                                <Box
                                    title='Modelo'
                                    value={infoPlate.veiculo.marca_modelo.split('/')[1]}
                                />
                                <Box
                                    title='Ano do modelo'
                                    value={infoPlate.veiculo.ano.split('/')[0]}
                                />
                                <Box
                                    title='Ano da Fabricação'
                                    value={infoPlate.veiculo.ano.split('/')[1]}
                                />
                                <Box title='Versão' value={infoPlate.fipes[0].marca_modelo} />
                                <Box title='Cor' value={infoPlate.veiculo.cor} />
                                <Box
                                    title='Combustível'
                                    value={
                                        infoPlate.veiculo.combustivel.search('/') !== -1
                                            ? 'Flex'
                                            : infoPlate.veiculo.combustivel
                                    }
                                />
                                <Box
                                    title='Quantidade de pessoas'
                                    value={infoPlate.veiculo.quantidade_passageiro}
                                />
                                <Box title='Cilindradas' value={infoPlate.veiculo.cilindradas} />
                                <div className='mt-16'>
                                    <p className='text-3xl font-light'>
                                        Mais Informações do Veículo
                                    </p>
                                    <p className='mt-4 text-sm'>Vamos completar seu anúncio</p>
                                </div>
                                <Input
                                    mask='9999999'
                                    maskChar=''
                                    title='Quanto seu veículo já rodou?'
                                    placeholder='0 km'
                                    {...register('kilometer')}
                                />
                                <TextArea
                                    title='Sobre o veículo'
                                    maxLength={500}
                                    {...register('about')}
                                />
                                <Input
                                    mask='99999999999'
                                    maskChar=''
                                    title='Valor'
                                    placeholder='R$'
                                    {...register('value')}
                                />

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
                                    <IoCheckmarkOutline className='text-2xl' /> Pronto, publicar meu
                                    anúncio
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
                                    title: infoPlate
                                        ? `${infoPlate.veiculo.marca_modelo.split('/')[0]} ${
                                              infoPlate.veiculo.marca_modelo
                                                  .split('/')[1]
                                                  .split(' ')[0]
                                          }`
                                        : '----',
                                    description: infoPlate
                                        ? infoPlate.fipes[0].marca_modelo
                                        : '--------',
                                    price: String(watch('value') ? watch('value') : '0'),
                                    year: infoPlate ? infoPlate.veiculo.ano : '----',
                                    distance: String(
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
