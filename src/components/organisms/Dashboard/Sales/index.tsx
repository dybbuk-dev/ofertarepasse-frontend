import * as React from 'react'
import InputMask from 'react-input-mask'
import { MdOutlineCloudDownload } from 'react-icons/md'
import InputSimple from 'components/atoms/Input/Simple'
import WithoutImage from 'assets/images/withoutImage.png'
import Checkbox from 'components/atoms/Input/Checkbox'
import { IoPencil } from 'react-icons/io5'
import { INegociations } from '../Sold'
import api from 'services/api'
import { useAuth } from 'hooks/auth'
import getUrlAws from 'utils/getUrlAws'
import DefaultProfile from 'assets/images/defaultProfile.png'
import formatMoney from 'utils/formatMoney'
import { toast } from 'react-toastify'
import InfiniteScroll from 'react-infinite-scroll-component'

interface ISales {
    items: Array<INegociations>
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
    const [sales, setSales] = React.useState<ISales | null>(null)
    const [page, setPage] = React.useState(2)

    const titlesTable = ['', 'Veículo', 'Valor', 'Status', 'Cliente', 'Criado em']

    const { user } = useAuth()

    const getSales = async () => {
        const { data } = await api.get(
            `/api/v1/negociations?userId=${user?.id}&status=finalized&limit=10`
        )

        if (data) {
            setSales(data)
        }
    }

    const handleMore = async () => {
        if (sales) {
            const { data } = await api.get(
                `/api/v1/negociations?page=${page}&limit=10&status=finalized&userId=${user?.id}`
            )

            if (data) {
                setSales({ ...sales, items: [...sales.items, ...data.items] })
                setPage((prev) => prev + 1)
            }
        }
    }

    React.useEffect(() => {
        const getAdvertsSearch = async () => {
            try {
                const { data } = await api.get(
                    `/api/v1/negociations?search=${filter.search}&limit=30&status=finalized`
                )

                setSales(data)
            } catch (_) {
                toast.error('Erro ao trazer os anúncios pesquisados')
            }
        }

        if (filter.search !== '') {
            getAdvertsSearch()
        } else {
            setPage(2)
            getSales()
        }
    }, [filter.search])

    React.useEffect(() => {
        getSales()
    }, [])

    if (!sales) return null

    return (
        <div>
            <div className='flex items-center justify-between'>
                <div>
                    <span className='text-3xl font-light text-gray-200'>Minhas Vendas</span>
                    <p className='mt-3 text-sm text-gray-200'>
                        Total de <span className='font-semibold'>{sales?.count ?? 0}</span>{' '}
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
            <div className='mt-8 mb-5 grid grid-cols-[1fr_auto] gap-3'>
                <InputSimple
                    className='rounded-xl bg-white px-5 py-3'
                    placeholder='Faça uma busca pelo nome da venda'
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
                    dataLength={sales.items.length}
                    next={handleMore}
                    hasMore={true}
                    loader={null}
                >
                    <table className='w-full'>
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
                        {sales && sales.items.length > 0
                            ? sales.items.map((item, index) => {
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
                                      <tr
                                          key={index}
                                          className='border-b border-gray-900 text-smd text-gray-500 last:border-none'
                                      >
                                          <td className='pl-2'>
                                              <Checkbox />
                                          </td>
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
                                                  <IoPencil />
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
                                              <span>
                                                  {new Date(item.createdAt).toLocaleDateString()}
                                              </span>
                                          </td>
                                      </tr>
                                  )
                              })
                            : null}
                    </table>
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default Adverts
