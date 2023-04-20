import Select from 'components/atoms/Select'
import * as React from 'react'
import InputMask from 'react-input-mask'
import { MdOutlineCloudDownload } from 'react-icons/md'
import InputSimple from 'components/atoms/Input/Simple'
import Checkbox from 'components/atoms/Input/Checkbox'
import { useAuth } from 'hooks/auth'
import api from 'services/api'
import { IUser } from 'contexts/auth'
import { IAdvert } from '../Adverts'
import getUrlAws from 'utils/getUrlAws'
import DefaultProfile from 'assets/images/defaultProfile.png'

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

const Sold = () => {
    const [filter, setFilter] = React.useState({
        action: '',
    })
    const [negociations, setNegotiations] = React.useState<Array<INegociations> | null>(null)

    const titlesTable = ['', 'Veículo', 'Valor', 'Anunciante', 'Cliente', 'Status', 'ID']

    const { user } = useAuth()

    React.useEffect(() => {
        const getNegociations = async () => {
            const { data } = await api.get(`/api/v1/negociations?limit=5&userId=${user?.id}`)

            if (data) {
                setNegotiations(data)
            }
        }

        getNegociations()
    }, [])

    return (
        <div>
            <div className='flex items-center justify-between'>
                <div>
                    <span className='text-3xl font-light text-gray-200'>Minhas Negociações</span>
                    <p className='mt-3 text-sm text-gray-200'>
                        Total de <span className='font-semibold'>73</span> registros entre{' '}
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
            <div className='mt-8 mb-5 grid grid-cols-[auto_1fr_auto_auto_auto] gap-3'>
                <Select label='Ação' onChange={(e) => setFilter({ ...filter, action: e })} />
                <InputSimple
                    className='rounded-xl bg-white px-5 py-3'
                    placeholder='Faça uma busca por nome, local, telefone, e-mail'
                />
                <Select
                    label='100 registros'
                    onChange={(e) => setFilter({ ...filter, action: e })}
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
                                    index === 0 ? 'w-[60px]' : 'w-max'
                                }`}
                            >
                                {item}
                            </th>
                        ))}
                    </tr>
                    {negociations && negociations.length > 0
                        ? negociations.map((item, index) => {
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
                                                          : ''
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
                                              R${item.value.toFixed(3)}
                                          </span>
                                      </td>
                                      <td className='flex w-max items-center justify-between py-6'>
                                          <div className='flex w-max items-center gap-2'>
                                              <img
                                                  src={
                                                      item.advert.user.image
                                                          ? getUrlAws(item.advert.user.image)
                                                          : ''
                                                  }
                                                  alt={`Foto de ${item.advert.user.name}`}
                                                  className='h-[35px] w-[35px] rounded-full object-cover'
                                              />
                                              <p className='text-black'>{item.advert.user.name}</p>
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
                                              {item.id.split('-')[item.id.split('-').length - 1]}
                                          </span>
                                      </td>
                                  </tr>
                              )
                          })
                        : null}
                </table>
            </div>
        </div>
    )
}

export default Sold
