/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import Button from 'components/atoms/Button'
import Card from 'components/atoms/Card'
import Checkbox from 'components/atoms/Input/Checkbox'
import * as React from 'react'
import { BiImageAlt } from 'react-icons/bi'
import { IoCheckmarkOutline, IoChevronDownOutline } from 'react-icons/io5'
import { useForm } from 'react-hook-form'

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
    title: string
}

interface ITextArea extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    title: string
}

interface ISelect {
    title: string
    placeholder: string
    options: Array<{
        label: string
        value: string
    }>
    name: string
}

type RefInput = HTMLInputElement
type RefTextarea = HTMLTextAreaElement

const Input = React.forwardRef<RefInput, IInput>(({ title, ...props }, ref) => {
    return (
        <div className='rounded-xl bg-white'>
            <div className='border-b border-gray-700 px-5 py-4'>
                <p className='text-gray-400'>{title}</p>
            </div>
            <input
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
    const [itemsDetails, setItemsDetails] = React.useState<Array<string>>([])
    const [highlight, setHighlight] = React.useState<Array<string>>([])

    const { register, handleSubmit, setValue } = useForm()

    React.useEffect(() => {
        register('itemsDetails')
        register('highlight')
    }, [])

    const onSubmit = async (data: any) => console.log(data)

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

    const Select = React.forwardRef(({ title, placeholder, options, name }: ISelect, ref: any) => {
        const [open, setOpen] = React.useState(false)
        const labelRef = React.useRef<HTMLSpanElement | null>(null)

        return (
            <div className='rounded-xl bg-white' ref={ref}>
                <div className='border-b border-gray-700 px-5 py-4'>
                    <p className='text-gray-400'>{title}</p>
                </div>
                <div onClick={() => setOpen(!open)}>
                    <div
                        className={`flex items-center justify-between px-5 py-4 ${
                            open ? 'border-b border-gray-900' : ''
                        }`}
                        role='button'
                    >
                        <span className='font-medium text-gray-400' ref={labelRef}>
                            {placeholder}
                        </span>
                        <IoChevronDownOutline className={`${open ? 'rotate-180' : ''}`} />
                    </div>
                    {open ? (
                        <div className='flex w-full flex-col rounded-xl bg-white'>
                            {options.map((item) => (
                                <button
                                    type='button'
                                    key={item.label}
                                    className='border-b border-gray-900 py-4 px-5 text-left font-medium text-gray-400 last:border-none'
                                    onClick={() => {
                                        if (labelRef.current) {
                                            labelRef.current.innerText = item.label
                                        }
                                        setValue(name, item.value)
                                    }}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>
        )
    })

    const itemsInfoVehicle = [
        'Airbag',
        'Alarme',
        'Ar Concidionado',
        'Ar Quente',
        'Computador de Bordo',
        'Controle de Tração',
        'Desembaçador traseiro',
        'Banco com regulagem de altura',
        'Computador de Bordo',
        'Controle de Tração',
        'Freio ABS',
        ' Controle automático de velocidade',
    ]

    return (
        <div>
            <section>
                <p className='text-3xl font-light'>Criar Novo Anúncio</p>
                <p className='mt-4 text-sm'>Vamos começar seu anúncio?</p>
            </section>
            <section className='mt-14'>
                <div className='grid grid-cols-[350px_auto] gap-x-[100px]'>
                    <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            title='Placa do Veículo'
                            placeholder='Ex: ABC-1234'
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
                                />
                            </label>
                        </div>
                        <Select
                            title='Marcas'
                            placeholder='Selecione a Marca'
                            options={[
                                {
                                    label: 'Chevrolet',
                                    value: 'chevrolet',
                                },
                                {
                                    label: 'Fiat',
                                    value: 'fiat',
                                },
                            ]}
                            {...register('brands')}
                            name='brands'
                        />
                        <Select
                            title='Modelo'
                            placeholder='Selecione o modelo'
                            options={[
                                {
                                    label: 'Chevrolet',
                                    value: 'chevrolet',
                                },
                                {
                                    label: 'Fiat',
                                    value: 'fiat',
                                },
                            ]}
                            {...register('model')}
                            name='model'
                        />
                        <Select
                            title='Ano do modelo'
                            placeholder='Selecione o ano do modelo'
                            options={[
                                {
                                    label: 'Chevrolet',
                                    value: 'chevrolet',
                                },
                                {
                                    label: 'Fiat',
                                    value: 'fiat',
                                },
                            ]}
                            {...register('yearModel')}
                            name='yearModel'
                        />
                        <Select
                            title='Ano da Fabricação'
                            placeholder='Selecione o ano da fabricação'
                            options={[
                                {
                                    label: 'Chevrolet',
                                    value: 'chevrolet',
                                },
                                {
                                    label: 'Fiat',
                                    value: 'fiat',
                                },
                            ]}
                            {...register('yearManufacture')}
                            name='yearManufacture'
                        />
                        <Select
                            title='Versão'
                            placeholder='Selecione a versão'
                            options={[
                                {
                                    label: 'Chevrolet',
                                    value: 'chevrolet',
                                },
                                {
                                    label: 'Fiat',
                                    value: 'fiat',
                                },
                            ]}
                            {...register('version')}
                            name='version'
                        />
                        <Select
                            title='Cor'
                            placeholder='Selecione a cor'
                            options={[
                                {
                                    label: 'Chevrolet',
                                    value: 'chevrolet',
                                },
                                {
                                    label: 'Fiat',
                                    value: 'fiat',
                                },
                            ]}
                            {...register('color')}
                            name='color'
                        />
                        <Select
                            title='Combustível'
                            placeholder='Selecione o combustível'
                            options={[
                                {
                                    label: 'Chevrolet',
                                    value: 'chevrolet',
                                },
                                {
                                    label: 'Fiat',
                                    value: 'fiat',
                                },
                            ]}
                            {...register('fuel')}
                            name='fuel'
                        />
                        <Select
                            title='Número de Portas'
                            placeholder='Selecione o número de portas'
                            options={[
                                {
                                    label: 'Chevrolet',
                                    value: 'chevrolet',
                                },
                                {
                                    label: 'Fiat',
                                    value: 'fiat',
                                },
                            ]}
                            {...register('amountDoors')}
                            name='amountDoors'
                        />
                        <Select
                            title='Câmbio'
                            placeholder='Selecione o câmbio'
                            options={[
                                {
                                    label: 'Chevrolet',
                                    value: 'chevrolet',
                                },
                                {
                                    label: 'Fiat',
                                    value: 'fiat',
                                },
                            ]}
                            {...register('exchange')}
                            name='exchange'
                        />
                        <div className='flex items-center'>
                            <Checkbox {...register('armored')} />
                            <span className='font-medium text-gray-400'>Blindado</span>
                        </div>

                        <div className='mt-16'>
                            <p className='text-3xl font-light'>Mais Informações do Veículo</p>
                            <p className='mt-4 text-sm'>Vamos completar seu anúncio</p>
                        </div>
                        <Input
                            title='Quanto seu veículo já rodou?'
                            placeholder='0 km'
                            {...register('km')}
                        />
                        <TextArea
                            title='Diferenciais do seu veículo'
                            maxLength={500}
                            {...register('differentials')}
                        />
                        <Input title='Valor' placeholder='R$' {...register('value')} />

                        <div className='mt-16'>
                            <p className='text-3xl font-light'>Detalhes do Veículo</p>
                            <p className='mt-4 text-sm'>
                                Informe os itens que necessitam reparos ou outras informações
                                importantes sobre seu veículo
                            </p>
                        </div>
                        <TextArea
                            title='Detalhes do Veículo'
                            maxLength={500}
                            {...register('details')}
                        />

                        <div className='mt-16'>
                            <p className='text-3xl font-light'>Detalhes do Veículo</p>
                            <p className='mt-4 text-sm'>
                                Informe os itens que necessitam reparos ou outras informações
                                importantes sobre seu veículo
                            </p>
                        </div>
                        <div className='flex flex-wrap items-center gap-4'>
                            {itemsInfoVehicle.map((item, index) => (
                                <button
                                    key={index}
                                    className={`rounded-full  px-7 py-2 font-semibold text-gray-200 ${
                                        itemsDetails.find((itemFind) => itemFind === item)
                                            ? 'bg-primary'
                                            : 'bg-white'
                                    }`}
                                    onClick={() =>
                                        handleSelectItem(itemsDetails, setItemsDetails, item)
                                    }
                                >
                                    {item}
                                </button>
                            ))}
                        </div>

                        <div className='mt-16'>
                            <p className='text-3xl font-light'>Destaque seu Veículo</p>
                            <p className='mt-4 text-sm'>Estamos acabando</p>
                        </div>
                        <div className='flex flex-wrap items-center gap-4'>
                            {itemsInfoVehicle.map((item, index) => (
                                <button
                                    key={index}
                                    className={`rounded-full  px-7 py-2 font-semibold text-gray-200 ${
                                        highlight.find((itemFind) => itemFind === item)
                                            ? 'bg-primary'
                                            : 'bg-white'
                                    }`}
                                    onClick={() => handleSelectItem(highlight, setHighlight, item)}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                        <Button className='mt-20 flex !w-max items-center gap-2 bg-primary'>
                            <IoCheckmarkOutline className='text-2xl' /> Pronto, publicar meu anúncio
                        </Button>
                    </form>
                    <div className='relative h-full w-[240px]'>
                        <div className='sticky top-10'>
                            <p className='mb-5 text-sm font-medium'>Pré-visualização do anúncio</p>
                            <Card
                                data={{
                                    title: 'Honda Civic',
                                    description: '1.5 16V TURBO GASOLINA TOURING 4P CVT',
                                    price: '119.500',
                                    year: '2016/2017',
                                    distance: '72000',
                                    location: 'Catanduva - SP',
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
