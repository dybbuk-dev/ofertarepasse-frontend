import Select from 'components/atoms/Select'
import * as React from 'react'
// import InputMask from 'react-input-mask'
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
import getUrlAws from 'utils/getUrlAws'
import WithoutImage from 'assets/images/withoutImage.png'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useAuth } from 'hooks/auth'
import formatUrlDetails from 'utils/formatUrlDetails'

export interface IAdvert {
    id: string
    title: string
    plate: string
    images: string[] | null
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
    highlight: Array<string>
    fipeValue: number
    proposals: number
    createdAt: Date
    updatedAt: Date
}

export interface IAdvertResponse {
    items: Array<IAdvert>
    count: number
}

const Adverts = () => {
    const [filter, setFilter] = React.useState({
        action: '',
        date: {
            min: null,
            max: null,
        },
        search: '',
    })
    const [adverts, setAdverts] = React.useState<IAdvertResponse | null>(null)
    const [showModal, setShowModal] = React.useState({
        show: false,
        id: '',
    })
    const [page, setPage] = React.useState(2)

    const titlesTable = ['Veículo', 'Proposta', 'Vizualizações', 'Valor', 'Status', 'Gerenciar']
    const navigate = useNavigate()
    const { user } = useAuth()

    const getAdverts = async () => {
        const { data } = await api.get(`/api/v1/adverts?limit=10&userId=${user?.id}`)

        if (data) {
            setAdverts(data)
        }
    }

    const handleMore = async () => {
        if (adverts) {
            const { data } = await api.get(
                `/api/v1/adverts?page=${page}&limit=10&userId=${user?.id}`
            )

            if (data) {
                setAdverts({ ...adverts, items: [...adverts.items, ...data.items] })
                setPage((prev) => prev + 1)
            }
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
            if (adverts) {
                setAdverts({
                    ...adverts,
                    items: adverts.items.filter((item) => item.id !== showModal.id),
                })
            }
        } else {
            toast.error('Erro ao remover o anúncio')
        }
    }

    React.useEffect(() => {
        getAdverts()
    }, [])

    React.useEffect(() => {
        const getAdvertsSearch = async () => {
            try {
                const { data } = await api.get(`/api/v1/adverts?title=${filter.search}&limit=30`)

                setAdverts(data)
            } catch (_) {
                toast.error('Erro ao trazer os anúncios pesquisados')
            }
        }

        if (filter.search !== '') {
            getAdvertsSearch()
        } else {
            setPage(2)
            getAdverts()
        }
    }, [filter.search])

    if (!adverts) return null

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
                <div className='flex w-full flex-col items-center md:flex-row md:items-end'>
                    <span className='text-xl font-light text-gray-200 xs:text-2xl md:text-3xl'>
                        Meus Anúncios
                    </span>
                    <p className='mt-3 text-xs text-gray-200 xs:text-sm'>
                        Total de <span className='font-semibold'>{adverts.count ?? 0}</span>{' '}
                        registros
                        {!!filter.date.min || !!filter.date.max ? (
                            <>
                                {' '}
                                entre <span className='font-semibold'>05/12/2022</span> e{' '}
                                <span className='font-semibold'>04/01/2023</span>
                            </>
                        ) : null}
                    </p>
                </div>
                {/* <div>
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
                </div> */}
            </div>
            <div className='mt-2 mb-5 grid grid-cols-none grid-rows-3 gap-x-3 gap-y-3 xs:mt-4 md:mt-8 md:grid-cols-[auto_1fr_auto] md:grid-rows-none'>
                <Select label='Ação' onChange={(e) => setFilter({ ...filter, action: e })} />
                <InputSimple
                    className='rounded-xl bg-white px-5 py-3'
                    placeholder='Faça uma busca pelo título do anúncio'
                    value={filter.search}
                    onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                />
                <button className='flex h-full items-center gap-1 rounded-xl bg-white px-8 text-gray-200'>
                    <MdOutlineCloudDownload className='text-xl' />
                    Exportar
                </button>
            </div>
            <div className='mb-10 rounded-xl bg-white'>
                <InfiniteScroll
                    dataLength={adverts.items.length}
                    next={handleMore}
                    hasMore={true}
                    loader={null}
                >
                    <table className='w-full min-w-[560px]'>
                        <thead>
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
                        </thead>
                        <tbody>
                            {adverts && adverts.items.length > 0
                                ? adverts.items.map((item, index) => (
                                      <tr
                                          key={index}
                                          className='border-b border-gray-900 text-smd text-gray-500 last:border-none'
                                      >
                                          <td className='py-6 pl-6'>
                                              <div className='flex items-center gap-2'>
                                                  <img
                                                      src={
                                                          item.images && item.images.length > 0
                                                              ? getUrlAws(item.images[0])
                                                              : WithoutImage
                                                      }
                                                      className='h-[40px] w-[60px] rounded-lg object-cover'
                                                  />
                                                  <div>
                                                      <p className='text-smd text-gray-400'>
                                                          {item.title}
                                                      </p>
                                                      <p className='text-xs text-gray-500 line-clamp-1'>
                                                          {item.version}
                                                      </p>
                                                  </div>
                                              </div>
                                          </td>
                                          <td>
                                              <div className='flex items-center gap-1'>
                                                  <Target />
                                                  <span>{item.proposals}</span>
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
                                                          item.active
                                                              ? 'text-green'
                                                              : 'text-gray-600'
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
                                                      onClick={() =>
                                                          setShowModal({ id: item.id, show: true })
                                                      }
                                                  />
                                                  <IoPencil
                                                      role='button'
                                                      className='text-xl hover:text-primary'
                                                      onClick={() =>
                                                          navigate(
                                                              `/dashboard/adverts/create?id=${item.id}`
                                                          )
                                                      }
                                                  />
                                              </div>
                                          </td>
                                          <td>
                                              <div className='flex items-center gap-2'>
                                                  <IoDocumentOutline
                                                      role='button'
                                                      className='text-xl hover:text-primary'
                                                      onClick={() => {
                                                          navigator.clipboard.writeText(
                                                              formatUrlDetails(
                                                                  `${
                                                                      window.location.origin
                                                                  }/comprar/${
                                                                      item.brand
                                                                  }/${item.model.replaceAll(
                                                                      '/',
                                                                      ''
                                                                  )}/${item.version.replaceAll(
                                                                      '/',
                                                                      ''
                                                                  )}/${item.modelYear}/${item.id}`
                                                              )
                                                          )
                                                      }}
                                                  />
                                              </div>
                                          </td>
                                      </tr>
                                  ))
                                : null}
                        </tbody>
                    </table>
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default Adverts
