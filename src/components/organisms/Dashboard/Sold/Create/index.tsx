import { IUser } from 'contexts/auth'
import React from 'react'
import { toast } from 'react-toastify'
import api from 'services/api'
import { IAdvert } from '../../Adverts'
import { useAuth } from 'hooks/auth'
import { INegociations } from '..'
import { IoEllipsisHorizontalOutline } from 'react-icons/io5'
import BasicLoading from 'components/atoms/BasicLoading'

interface IButtonOptions {
    negociation: INegociations
    getNegociations: () => Promise<void>
}

const ButtonOptions = ({ negociation, getNegociations }: IButtonOptions) => {
    const [show, setShow] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const { user } = useAuth()

    const handleCopyPaymentLink = async () => {
        try {
            setLoading(true)
            const { data } = await api.post('/api/v1/payments', {
                receiver: negociation.advert.user.id,
                payer: negociation.user.id,
                intermediary: user?.id,
                advert: negociation.advert.id,
                negociation: negociation.id,
            })

            navigator.clipboard.writeText(data.body.init_point)
            setShow(false)
            setLoading(false)
        } catch (_) {
            toast.error('Erro ao copiar o link de pagamento')
        }
    }

    const handleCancelNegociation = async () => {
        try {
            await api.patch(`/api/v1/negociations/${negociation.id}`, { status: 'canceled' })

            getNegociations()
            setShow(false)
        } catch (_) {
            toast.error('Erro ao cancelar a negociação')
        }
    }

    return (
        <div className='relative'>
            <button onClick={() => setShow(!show)}>
                <IoEllipsisHorizontalOutline className='text-3xl' />
            </button>
            {show ? (
                <div
                    className='absolute right-0 top-[80%] z-10 overflow-hidden rounded-lg border-2 border-gray-600 bg-white'
                    onMouseLeave={() => setShow(false)}
                >
                    <button
                        className='w-full p-4 text-sm font-medium text-red-500 duration-200 ease-in-out hover:bg-red-500 hover:text-white'
                        onClick={handleCancelNegociation}
                    >
                        Cancelar
                    </button>
                    <button
                        className='flex w-[250px] justify-center p-4 text-sm font-medium text-gray-200 duration-200 ease-in-out hover:bg-blue-500 hover:text-white'
                        onClick={handleCopyPaymentLink}
                        disabled={loading}
                    >
                        {loading ? (
                            <BasicLoading borderSize='2px' color='white' size='25px' />
                        ) : (
                            'Copiar link de pagamento'
                        )}
                    </button>
                </div>
            ) : null}
        </div>
    )
}

const CreateNegociations = () => {
    const [fields, setFields] = React.useState({
        user: '',
        advert: '',
    })
    const [users, setUsers] = React.useState<Array<IUser>>([])
    const [adverts, setAdverts] = React.useState<Array<IAdvert>>([])
    const [negociations, setNegociations] = React.useState<Array<INegociations>>([])

    const { user } = useAuth()

    const getNegociations = async () => {
        try {
            const { data } = await api.get(
                `/api/v1/negociations?intermediary=${user?.id}&status=in progress`
            )

            setNegociations(data.items)
        } catch (_) {
            toast.error('Erro ao trazer as negociações')
        }
    }

    const handleCreateNegociations = async () => {
        try {
            await api.post('/api/v1/negociations', {
                user: fields.user,
                advert: fields.advert,
                intermediary: user?.id,
            })

            setFields({
                user: '',
                advert: '',
            })

            getNegociations()
        } catch (_) {
            toast.error('Erro ao criar a negociação')
        }
    }

    React.useEffect(() => {
        const getUsers = async () => {
            try {
                const { data } = await api.get('/api/v1/users')

                setUsers(data)
            } catch (_) {
                toast.error('Erro ao buscar os usuários')
            }
        }

        const getAdverts = async () => {
            try {
                const { data } = await api.get('/api/v1/adverts')

                setAdverts(data.items)
            } catch (_) {
                toast.error('Erro ao buscar os anúncios')
            }
        }

        getUsers()
        getAdverts()
        getNegociations()
    }, [user])

    return (
        <div>
            <div>
                <span className='text-3xl font-light text-gray-200'>Criar Negociação</span>
                <div className='mt-8 flex items-end gap-5'>
                    <div className=' flex flex-col'>
                        <label className='mb-2 font-light text-gray-200'>Usuário comprador</label>
                        <select
                            className='w-[300px] rounded-lg p-3'
                            value={fields.user}
                            onChange={(e) => setFields({ ...fields, user: e.target.value })}
                        >
                            <option value=''>Selecione o usuário</option>
                            {users.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name} - {item.id.split('-').at(-1)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-2 font-light text-gray-200'>Anúncio</label>
                        <select
                            className='w-[300px] rounded-lg p-3'
                            value={fields.advert}
                            onChange={(e) => setFields({ ...fields, advert: e.target.value })}
                        >
                            <option value=''>Selecione o anúncio</option>
                            {adverts.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.title} - {item.id.split('-').at(-1)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        disabled={!fields.advert || !fields.user}
                        className={`rounded-lg bg-primary py-3 px-10 font-semibold text-white ${
                            !fields.advert || !fields.user ? 'opacity-50' : ''
                        }`}
                        onClick={handleCreateNegociations}
                    >
                        Criar
                    </button>
                </div>
            </div>
            <div className='mt-20'>
                <span className='text-3xl font-light text-gray-200'>Negociações em progresso</span>
                <div className='mt-8'>
                    {negociations.map((item) => (
                        <div
                            className='mb-2 grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-3 rounded-lg bg-white py-4 px-5'
                            key={item.id}
                        >
                            <div>
                                <span className='text-xs font-bold text-gray-200'>Cliente</span>
                                <p className='font-light text-gray-200'>
                                    {item.user.name} - {item.user.email}
                                </p>
                            </div>
                            <div>
                                <span className='text-xs font-bold text-gray-200'>Anunciante</span>
                                <p className='font-light text-gray-200'>{item.advert.user.name}</p>
                            </div>
                            <div>
                                <span className='text-xs font-bold text-gray-200'>Anúncio</span>
                                <p className='font-light text-gray-200'>{item.advert.title}</p>
                            </div>
                            <ButtonOptions negociation={item} getNegociations={getNegociations} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CreateNegociations
