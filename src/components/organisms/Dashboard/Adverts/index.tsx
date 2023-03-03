import Select from 'components/atoms/Select'
import * as React from 'react'
import InputMask from 'react-input-mask'
import { MdOutlineCloudDownload } from 'react-icons/md'
import InputSimple from 'components/atoms/Input/Simple'
import { IoDocumentOutline, IoPencil, IoTrashOutline } from 'react-icons/io5'
import Target from 'assets/icon/Target'
import Eye from 'assets/icon/Eye'
import api from 'services/api'
import formatMoney from 'utils/formatMoney'
import Modal from 'components/atoms/Modal'
import Button from 'components/atoms/Button'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export interface IAdvert {
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
    views: number
    active: true
    city: string
    state: string
    highlight: Array<string>
    createdAt: Date
    updatedAt: Date
}

const Adverts = () => {
    const [filter, setFilter] = React.useState({
        action: '',
    })
    const [adverts, setAdverts] = React.useState<Array<IAdvert>>([])
    const [showModal, setShowModal] = React.useState({
        show: false,
        id: '',
    })

    const titlesTable = ['Veículo', 'Proposta', 'Vizualizações', 'Valor', 'Status', 'Gerenciar']
    const navigate = useNavigate()

    const getAdverts = async () => {
        const { data } = await api.get('/api/v1/adverts')

        if (data) {
            setAdverts(data)
        }
    }

    const removeAdvert = async () => {
        const { data } = await api.delete(`/api/v1/adverts/${showModal.id}`)

        if (data && !data.error) {
            toast.success('Anúncio removido')
            setShowModal({
                show: false,
                id: '',
            })
            getAdverts()
        } else {
            toast.error('Erro ao remover o anúncio')
        }
    }

    React.useEffect(() => {
        getAdverts()
    }, [])

    return (
        <div>
            {showModal.show ? (
                <Modal
                    title='Excluir anúncio'
                    onClose={() => setShowModal({ ...showModal, show: false })}
                >
                    <div className='w-[400px]'>
                        <p>Deseja realmente excluir esse anúncio? Essa ação não é reversível.</p>
                        <div className='mt-10 flex items-center justify-end gap-3'>
                            <Button
                                className='w-[150px] bg-gray-600'
                                onClick={() => setShowModal({ id: '', show: false })}
                            >
                                Cancelar
                            </Button>
                            <Button
                                className='w-[150px] bg-primary text-white'
                                onClick={() => removeAdvert()}
                            >
                                Excluir
                            </Button>
                        </div>
                    </div>
                </Modal>
            ) : null}
            <div className='flex items-center justify-between'>
                <div>
                    <span className='text-3xl font-light text-gray-200'>Meus Anúncios</span>
                    <p className='mt-3 text-sm text-gray-200'>
                        Total de <span className='font-semibold'>156</span> registros entre{' '}
                        <span className='font-semibold'>05/12/2022</span> e{' '}
                        <span className='font-semibold'>04/01/2023</span>
                    </p>
                </div>
                <div>
                    <span className='text-sm font-medium'>Período</span>
                    <div className='mt-2 flex gap-3'>
                        <div className='relative flex w-[125px] items-center overflow-hidden rounded border border-gray-100'>
                            <InputMask
                                mask='99/99/9999'
                                className='w-full py-2 pl-8 text-sm text-gray-100 outline-none'
                            />
                            <p className='absolute left-3 text-sm text-gray-100'>de</p>
                        </div>
                        <div className='relative flex w-[125px] items-center overflow-hidden rounded border border-gray-100'>
                            <InputMask
                                mask='99/99/9999'
                                className='w-full py-2 pl-8 text-sm text-gray-100 outline-none'
                            />
                            <p className='absolute left-2 text-sm text-gray-100'>até</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-8 mb-5 grid grid-cols-[auto_1fr_auto_auto] gap-3'>
                <Select label='Ação' onChange={(e) => setFilter({ ...filter, action: e })} />
                <InputSimple
                    className='rounded-xl bg-white px-5 py-3'
                    placeholder='Faça uma busca por nome, local, telefone, e-mail'
                />
                <button className='flex h-full items-center gap-1 rounded-xl bg-white px-8 text-gray-200'>
                    <MdOutlineCloudDownload className='text-xl' />
                    Exportar
                </button>
                <Select label='Ordenar por' onChange={(e) => setFilter({ ...filter, action: e })} />
            </div>
            <div className='mb-10 rounded-xl bg-white'>
                <table className='w-full'>
                    <tr className='border-b border-gray-900'>
                        {titlesTable.map((item, index) => (
                            <th
                                key={item}
                                className={`py-6 text-left text-sm font-medium capitalize text-black ${
                                    index === 0 ? 'pl-6' : ''
                                }`}
                            >
                                {item}
                            </th>
                        ))}
                    </tr>
                    {adverts.map((item, index) => (
                        <tr
                            key={index}
                            className='border-b border-gray-900 text-smd text-gray-500 last:border-none'
                        >
                            <td className='py-6 pl-6'>
                                <div className='flex items-center gap-2'>
                                    <img
                                        src='https://www.autoo.com.br/fotos/2022/2/960_720/kia1_11022022_70604_960_720.jpg'
                                        className='h-[40px] w-[60px] rounded-lg object-cover'
                                    />
                                    <div>
                                        <p className='text-smd text-gray-400'>{item.title}</p>
                                        <p className='text-xs text-gray-500 line-clamp-1'>
                                            {item.version}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className='flex items-center gap-1'>
                                    <Target />
                                    <span>0</span>
                                </div>
                            </td>
                            <td>
                                <div className='flex items-center gap-1'>
                                    <Eye />
                                    <span>{item.views}</span>
                                </div>
                            </td>
                            <td>
                                <span className='font-bold text-gray-400'>
                                    {formatMoney(item.value)}
                                </span>
                            </td>
                            <td>
                                <div
                                    className={`flex w-max items-center gap-2 rounded-full ${
                                        item.active ? 'bg-green-100' : 'bg-gray-900'
                                    } px-4 py-1`}
                                >
                                    <div
                                        className={`h-[8px] w-[8px] rounded-full ${
                                            item.active ? 'bg-green' : 'bg-gray-600'
                                        }`}
                                    />
                                    <span
                                        className={` ${
                                            item.active ? 'text-green' : 'text-gray-600'
                                        }`}
                                    >
                                        {item.active ? 'Ativo' : 'Inativo'}
                                    </span>
                                </div>
                            </td>
                            <td>
                                <div className='flex items-center gap-2'>
                                    <IoTrashOutline
                                        role='button'
                                        className='text-xl hover:text-primary'
                                        onClick={() => setShowModal({ id: item.id, show: true })}
                                    />
                                    <IoPencil
                                        role='button'
                                        className='text-xl hover:text-primary'
                                        onClick={() =>
                                            navigate(`/dashboard/adverts/create?id=${item.id}`)
                                        }
                                    />
                                </div>
                            </td>
                            <td>
                                <div className='flex items-center gap-2'>
                                    <IoDocumentOutline
                                        role='button'
                                        className='text-xl hover:text-primary'
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default Adverts
