import { FormControlLabel, RadioGroup } from '@mui/material'
import MenInCar from 'assets/images/men_in_car.png'
import Button from 'components/atoms/Button'
import Input from 'components/atoms/Input'
import Checkbox from 'components/atoms/Input/Checkbox'
import Radio from 'components/atoms/Input/Radio'
import { IoCheckmarkSharp } from 'react-icons/io5'
import InputMask from 'react-input-mask'
import styled from 'styled-components'

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

const Configurations = () => {
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

    return (
        <section>
            <p className='text-3xl font-light text-gray-200'>Configurations</p>
            <div className='mt-10 grid grid-cols-[auto_1fr] gap-8 rounded-2xl bg-white p-10'>
                <label className='flex w-max cursor-pointer flex-col items-center'>
                    <img
                        src={MenInCar}
                        className='mb-2 h-[65px] w-[65px] rounded-full object-cover'
                    />
                    <span className='text-xs text-gray-200'>Alterar</span>
                    <input type='file' className='hidden' />
                </label>
                <div className='flex flex-col gap-3 text-gray-200'>
                    <label>
                        <p className='text-xs'>Nome completo</p>
                        <Input
                            className='!border-none !px-0'
                            classInput='border-b border-gray-700 pb-2 !text-base'
                            value='Italo Eduardo'
                        />
                    </label>
                    <label>
                        <p className='text-xs'>Telefone</p>
                        <InputMask
                            mask='(99) 99999-9999'
                            alwaysShowMask
                            className='w-full border-b border-gray-700 py-2 text-base text-gray-200 outline-none'
                            value='(00) 00000-0000'
                        />
                    </label>
                    <label>
                        <p className='text-xs'>Email</p>
                        <Input
                            className='!border-none !px-0'
                            classInput='border-b border-gray-700 pb-2 !text-base'
                            value='italo@capsula.digital'
                        />
                    </label>
                    <RadioGroup row={true}>
                        <FormControlLabel
                            value='fisica'
                            control={<Radio />}
                            label='Pessoa Física'
                        />
                        <FormControlLabel
                            value='juridica'
                            control={<Radio />}
                            label='Pessoa Jurídica'
                            className='text-sm'
                        />
                    </RadioGroup>
                    <label>
                        <p className='text-xs'>Genêro</p>
                        <Input
                            className='!border-none !px-0'
                            classInput='border-b border-gray-700 pb-2 !text-base'
                            value='Masculino'
                        />
                    </label>
                    <label>
                        <p className='text-xs'>Data de Nascimento</p>
                        <InputMask
                            mask='99/99/9999'
                            alwaysShowMask
                            className='w-full border-b border-gray-700 py-2 text-base text-gray-200 outline-none'
                            value='(00) 00000-0000'
                        />
                    </label>
                    <label>
                        <p className='text-xs'>CPF</p>
                        <InputMask
                            mask='000.000.000-00'
                            alwaysShowMask
                            className='w-full border-b border-gray-700 py-2 text-base text-gray-200 outline-none'
                            value='000.000.000-00'
                        />
                    </label>
                    <label>
                        <p className='text-xs'>Digite seu CEP</p>
                        <InputMask
                            mask='99999-999'
                            alwaysShowMask
                            className='w-full border-b border-gray-700 py-2 text-base text-gray-200 outline-none'
                            value='00000-000'
                        />
                    </label>
                    <div className='mt-20 flex w-full items-center justify-between'>
                        <Button className='flex !w-max items-center gap-1 bg-primary-opacity-100 text-sm font-medium text-primary'>
                            <IoCheckmarkSharp className='text-lg' />
                            Salvar Alterações
                        </Button>
                        <Button className='!w-max !px-0 text-sm text-gray-400'>
                            Excluir conta
                        </Button>
                    </div>
                </div>
            </div>

            <p className='mt-20 mb-10 text-3xl font-light text-gray-200'>Notificações</p>
            <div className='rounded-2xl bg-white p-8'>
                <TableCustom>
                    <tr className='w-full border-b border-gray-700'>
                        <th>Informações</th>
                        <th className='w-[100px]'>E-mail</th>
                        <th className='w-[100px]'>Celular</th>
                        <th className='w-[100px]'>Navegador</th>
                    </tr>

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
                </TableCustom>
            </div>
        </section>
    )
}

export default Configurations
