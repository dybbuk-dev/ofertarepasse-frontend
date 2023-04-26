import { FormControlLabel, RadioGroup } from '@mui/material'
import MenInCar from 'assets/images/men_in_car.png'
import Button from 'components/atoms/Button'
import Input from 'components/atoms/Input'
import Checkbox from 'components/atoms/Input/Checkbox'
import Radio from 'components/atoms/Input/Radio'
import { useAuth } from 'hooks/auth'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IoCheckmarkSharp } from 'react-icons/io5'
import InputMask from 'react-input-mask'
import { toast } from 'react-toastify'
import api from 'services/api'
import styled from 'styled-components'
import getUrlAws from 'utils/getUrlAws'

const TableCustom = styled.table`
    width: 100%;

    th {
        font-size: 14px;
        color: #27272d;
        font-weight: 400;
        padding-bottom: 10px;
        text-align: left;
    }

    td {
        font-size: 16px;
        color: #27272d;
        font-weight: 400;
        padding: 10px 0;
        text-align: left;
    }
`

interface IDataForm {
    image: FileList | null
    name: string
    phone: string
    email: string
    type: string
    document: string
    dateOfBirth: string
    cep: string
}

const Configurations = () => {
    const [loading, setLoading] = React.useState(false)

    const { user } = useAuth()
    const { handleSubmit, register, watch, control } = useForm<IDataForm>({
        defaultValues: {
            image: null,
            name: user?.name,
            phone: user?.phone ?? '',
            email: user?.email,
            type: user?.type,
            document: user?.type === 'physical' ? user.cpf ?? '' : user?.cnpj ?? '',
            dateOfBirth: user?.dateOfBirth ? new Date(user?.dateOfBirth).toLocaleDateString() : '',
            cep: user?.cep ?? '',
        },
    })

    const itemsNotifications = [
        {
            label: 'Novos Anunciantes',
            options: ['email', 'phone', 'navigator'],
        },
        {
            label: 'Novos Clientes',
            options: ['email', 'phone', 'navigator'],
        },
        {
            label: 'Novos Anunciantes',
            options: ['email', 'phone', 'navigator'],
        },
        {
            label: 'Novos Clientes',
            options: ['email', 'phone', 'navigator'],
        },
        {
            label: 'Novos Anunciantes',
            options: ['email', 'phone', 'navigator'],
        },
        {
            label: 'Novos Clientes',
            options: ['email', 'phone', 'navigator'],
        },
    ]

    const onSubmit = async (dataForm: IDataForm) => {
        setLoading(true)
        try {
            let dateBirth = null

            if (dataForm.dateOfBirth) {
                const dateSplit = dataForm.dateOfBirth.split('/')

                dateBirth = new Date(
                    Number(dateSplit[2]),
                    Number(dateSplit[1]) - 1,
                    Number(dateSplit[0]),
                    3,
                    0,
                    0,
                    0
                ).toISOString()
            }

            await api.patch(`/api/v1/users/${user?.id}`, {
                name: dataForm.name,
                phone: dataForm.phone ?? user?.phone,
                email: dataForm.email,
                type: dataForm.type,
                cpf: dataForm.type === 'physical' ? dataForm.document : user?.cpf,
                cnpj: dataForm.type === 'legal' ? dataForm.document : user?.cnpj,
                dateOfBirth: dateBirth,
                cep: dataForm.cep ?? user?.email,
            })

            if (dataForm.image) {
                const formData = new FormData()
                formData.append('file', dataForm.image[0])
                await api.post(`/api/v1/users/${user?.id}/upload-file`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
            }

            toast.success('Usuário atualizados🎉')
            setLoading(false)
        } catch (err) {
            toast.error('Falha ao atualizar seus dados: Erro interno')
            setLoading(false)
        }
    }

    return (
        <section>
            <p className='text-3xl font-light text-gray-200'>Configurations</p>
            <form
                className='mt-10 grid grid-cols-[auto_1fr] gap-8 rounded-2xl bg-white p-10'
                onSubmit={handleSubmit(onSubmit)}
            >
                <label className='flex w-max cursor-pointer flex-col items-center'>
                    <img
                        src={
                            watch('image')
                                ? URL.createObjectURL((watch('image') as FileList)[0])
                                : user?.image
                                ? getUrlAws(user.image)
                                : MenInCar
                        }
                        className='mb-2 h-[65px] w-[65px] rounded-full bg-gray-500 object-cover'
                    />
                    <span className='text-xs text-gray-200'>Alterar</span>
                    <input type='file' className='hidden' {...register('image')} />
                </label>
                <div className='flex flex-col gap-3 text-gray-200'>
                    <label>
                        <p className='text-xs'>Nome completo</p>
                        <Input
                            className='!border-none !px-0'
                            classInput='border-b border-gray-700 pb-2 !text-base'
                            {...register('name')}
                        />
                    </label>
                    <label>
                        <p className='text-xs'>Telefone</p>
                        <InputMask
                            mask='(99) 99999-9999'
                            className='w-full border-b border-gray-700 py-2 text-base text-gray-200 outline-none'
                            defaultValue={user?.phone ?? ''}
                            {...register('phone')}
                        />
                    </label>
                    <label>
                        <p className='text-xs'>Email</p>
                        <Input
                            className='!border-none !px-0'
                            classInput='border-b border-gray-700 pb-2 !text-base'
                            {...register('email')}
                        />
                    </label>
                    <Controller
                        control={control}
                        name='type'
                        defaultValue={user?.type}
                        render={({ field }) => (
                            <RadioGroup row={true} {...field}>
                                <FormControlLabel
                                    value='physical'
                                    control={<Radio />}
                                    label='Pessoa Física'
                                />
                                <FormControlLabel
                                    value='legal'
                                    control={<Radio />}
                                    label='Pessoa Jurídica'
                                />
                            </RadioGroup>
                        )}
                    />
                    <label>
                        <p className='text-xs'>{watch('type') === 'physical' ? 'CPF' : 'CNPJ'}</p>
                        <InputMask
                            mask={
                                watch('type') === 'physical'
                                    ? '999.999.999-99'
                                    : '99.999.999/9999-99'
                            }
                            className='w-full border-b border-gray-700 py-2 text-base text-gray-200 outline-none'
                            defaultValue={
                                watch('type') === 'physical' ? user?.cpf ?? '' : user?.cnpj ?? ''
                            }
                            {...register('document')}
                        />
                    </label>
                    <label>
                        <p className='text-xs'>Data de Nascimento</p>
                        <InputMask
                            mask='99/99/9999'
                            className='w-full border-b border-gray-700 py-2 text-base text-gray-200 outline-none'
                            defaultValue={
                                user?.dateOfBirth
                                    ? new Date(user?.dateOfBirth).toLocaleDateString()
                                    : ''
                            }
                            {...register('dateOfBirth')}
                        />
                    </label>
                    <label>
                        <p className='text-xs'>Digite seu CEP</p>
                        <InputMask
                            mask='99999-999'
                            className='w-full border-b border-gray-700 py-2 text-base text-gray-200 outline-none'
                            defaultValue={user?.cep ?? ''}
                            {...register('cep')}
                        />
                    </label>
                    <div className='mt-20 flex w-full items-center justify-between'>
                        <Button
                            className='flex !w-max items-center gap-1 bg-primary-opacity-100 text-sm font-medium text-primary'
                            colorLoading='#F3722C'
                            loading={loading}
                        >
                            <IoCheckmarkSharp className='text-lg' />
                            Salvar Alterações
                        </Button>
                        <Button className='!w-max !px-0 text-sm text-gray-400' type='button'>
                            Excluir conta
                        </Button>
                    </div>
                </div>
            </form>

            <p className='mt-20 mb-10 text-3xl font-light text-gray-200'>Notificações</p>
            <div className='rounded-2xl bg-white p-8'>
                <TableCustom>
                    <thead>
                        <tr className='w-full border-b border-gray-700'>
                            <th>Informações</th>
                            <th className='w-[100px]'>E-mail</th>
                            <th className='w-[100px]'>Celular</th>
                            <th className='w-[100px]'>Navegador</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemsNotifications.map((item, index) => (
                            <tr className='w-full' key={index}>
                                <td key={index}>{item.label}</td>
                                {item.options.map((option, indexOption) => (
                                    <td key={indexOption}>
                                        <Checkbox />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </TableCustom>
            </div>
        </section>
    )
}

export default Configurations
