import Select from 'components/atoms/Select'
import * as React from 'react'
// import InputMask from 'react-input-mask'
import { MdOutlineCloudDownload } from 'react-icons/md'
import InputSimple from 'components/atoms/Input/Simple'
// import Checkbox from 'components/atoms/Input/Checkbox'
import { useAuth } from 'hooks/auth'
import api from 'services/api'
import { IUser } from 'contexts/auth'
import { IAdvert } from '../Adverts'
import getUrlAws from 'utils/getUrlAws'
import DefaultProfile from 'assets/images/defaultProfile.png'
import formatMoney from 'utils/formatMoney'
import WithoutImage from 'assets/images/withoutImage.png'
import InfiniteScroll from 'react-infinite-scroll-component'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

interface IAdvertNegociation extends IAdvert {
    user: IUser
}

export interface INegociations {
    advert: IAdvertNegociation
    createdAt: string
    id: string
    status: string
    updateAt: string
    value: number
    user: IUser
}

interface INegociationsResponse {
    items: Array<INegociations>
    count: number
}

const Sold = () => {
    const [filter, setFilter] = React.useState({
        action: '',
        date: {
            min: null,
            max: null,
        },
        search: '',
    })
    const [negociations, setNegotiations] = React.useState<INegociationsResponse | null>(null)
    const [page, setPage] = React.useState(2)

    const titlesTable = ['', 'Veículo', 'Valor', 'Anunciante', 'Cliente', 'Status', 'ID']

    const { user } = useAuth()

    const getNegociations = async () => {
        const { data } = await api.get(`/api/v1/negociations?limit=10&userId=${user?.id}`)

        if (data) {
            setNegotiations(data)
        }
    }

    const handleMore = async () => {
        if (negociations) {
            const { data } = await api.get(
                `/api/v1/negociations?page=${page}&limit=10&userId=${user?.id}`
            )

            if (data) {
                setNegotiations({ ...negociations, items: [...negociations.items, ...data.items] })
                setPage((prev) => prev + 1)
            }
        }
    }

    React.useEffect(() => {
        const getAdvertsSearch = async () => {
            try {
                const { data } = await api.get(
                    `/api/v1/negociations?search=${filter.search}&limit=30`
                )

                setNegotiations(data)
            } catch (_) {
                toast.error('Erro ao trazer os anúncios pesquisados')
            }
        }

        if (filter.search !== '') {
            getAdvertsSearch()
        } else {
            setPage(2)
            getNegociations()
        }
    }, [filter.search])

    React.useEffect(() => {
        getNegociations()
    }, [])

    if (!negociations) return null

    return (
        <div>
            <div className='flex items-center justify-between'>
                <div className='item-center flex w-full flex-col justify-center text-center md:flex-row md:items-end md:text-left'>
                    <span className='text-xl font-light text-gray-200 xs:text-2xl md:text-3xl'>
                        Minhas Negociações
                    </span>
                    <p className='mt-3 text-sm text-gray-200'>
                        Total de <span className='font-semibold'>{negociations?.count ?? 0}</span>{' '}
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
                {user?.roles === 'intermediary' ? (
                    <Link to='/dashboard/negotiations/create'>
                        <p className='rounded-lg bg-primary py-3 px-10 font-semibold text-white'>
                            Criar negociação
                        </p>
                    </Link>
                ) : null}
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
                    placeholder='Faça uma busca por nome, local, telefone, e-mail'
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
                    dataLength={negociations.items.length}
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
                                            index === 0 ? 'w-[60px]' : 'w-max'
                                        }`}
                                    >
                                        {item}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        {negociations && negociations.items.length > 0
                            ? negociations.items.map((item, index) => {
                                  const statusColor = {
                                      text: '#484854',
                                      background: '#F9F9F9',
                                  }

                                  switch (item.status.toLowerCase()) {
                                      case 'finalized':
                                          statusColor.text = '#83BF6E'
                                          statusColor.background = '#ECF5E9'
                                          break
                                      case 'in progress':
                                          statusColor.text = '#F3BB2C'
                                          statusColor.background = '#FEF9EE'
                                          break
                                      case 'canceled':
                                          statusColor.text = '#FF6A55'
                                          statusColor.background = '#FEF8F4'
                                          break

                                      default:
                                          break
                                  }

                                  return (
                                      <tbody key={index}>
                                          <tr className='border-b border-gray-900 text-smd text-gray-500 last:border-none'>
                                              <td className='pl-2'>{/* <Checkbox /> */}</td>
                                              <td>
                                                  <div className='flex items-center gap-2'>
                                                      <img
                                                          src={
                                                              item.advert.images
                                                                  ? getUrlAws(item.advert.images[0])
                                                                  : WithoutImage
                                                          }
                                                          className='h-[40px] w-[60px] rounded-lg object-cover'
                                                      />
                                                      <div>
                                                          <p className='text-smd text-gray-400'>
                                                              {item.advert.title}
                                                          </p>
                                                          <p className='text-xs text-gray-500 line-clamp-1'>
                                                              {item.advert.about}
                                                          </p>
                                                      </div>
                                                  </div>
                                              </td>
                                              <td>
                                                  <span className='font-bold text-gray-400'>
                                                      {formatMoney(item.value)}
                                                  </span>
                                              </td>
                                              <td className='flex w-max items-center justify-between py-6'>
                                                  <div className='flex w-max items-center gap-2'>
                                                      <img
                                                          src={
                                                              item.advert.user.image
                                                                  ? getUrlAws(
                                                                        item.advert.user.image
                                                                    )
                                                                  : ''
                                                          }
                                                          alt={`Foto de ${item.advert.user.name}`}
                                                          className='h-[35px] w-[35px] rounded-full object-cover'
                                                      />
                                                      <p className='text-black'>
                                                          {item.advert.user.name}
                                                      </p>
                                                  </div>
                                              </td>
                                              <td>
                                                  <div className='flex items-center gap-2 py-6'>
                                                      <img
                                                          src={
                                                              item.user.image
                                                                  ? getUrlAws(item.user.image)
                                                                  : DefaultProfile
                                                          }
                                                          alt={`Foto de ${item.user.name}`}
                                                          className='h-[35px] w-[35px] rounded-full object-cover'
                                                      />
                                                      <p className='text-black'>{item.user.name}</p>
                                                  </div>
                                              </td>
                                              <td>
                                                  <div
                                                      className='flex w-max items-center gap-2 rounded-full px-4 py-1 text-sm'
                                                      style={{
                                                          background: statusColor.background,
                                                          color: statusColor.text,
                                                      }}
                                                  >
                                                      <div
                                                          className={'h-[8px] w-[8px] rounded-full'}
                                                          style={{
                                                              background: statusColor.text,
                                                          }}
                                                      />
                                                      <span>
                                                          {item.status === 'finalized'
                                                              ? 'Finalizado'
                                                              : item.status === 'in progress'
                                                              ? 'Em Progresso'
                                                              : 'Cancelado'}
                                                      </span>
                                                  </div>
                                              </td>
                                              <td>
                                                  <span>
                                                      <strong>ID</strong>{' '}
                                                      {
                                                          item.id.split('-')[
                                                              item.id.split('-').length - 1
                                                          ]
                                                      }
                                                  </span>
                                              </td>
                                          </tr>
                                      </tbody>
                                  )
                              })
                            : null}
                    </table>
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default Sold
