/* eslint-disable @typescript-eslint/no-explicit-any */
import WomamCar from 'assets/images/womam_in_car.png'
import Logo from 'assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import ButtonSocial from 'components/atoms/Button/Social'
import Input from 'components/atoms/Input'
import Button from 'components/atoms/Button'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from 'components/atoms/Input/Radio'

import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import api from 'services/api'
import { useAuth } from 'hooks/auth'
import { LoginSocialFacebook, LoginSocialGoogle } from 'reactjs-social-login'

interface IDataForm {
    name: string
    type: string
    email: string
    password: string
}

const SignUp = () => {
    const { register, handleSubmit, control } = useForm<IDataForm>()

    const navigate = useNavigate()
    const { handleAuthGoogle } = useAuth()

    const onSubmit = async (dataForm: IDataForm) => {
        const { data } = await api.post('/api/v1/users', {
            name: dataForm.name,
            email: dataForm.email,
            password: dataForm.password,
            type: dataForm.type,
        })

        if (data && data.error) {
            toast.error(data.message)
        } else {
            toast.success('User created successfully')
            navigate('/login')
        }
    }

    return (
        <div className='flex flex-col-reverse items-center md:h-screen md:flex-row'>
            <section className='flex flex-col items-center overflow-y-scroll py-10 md:h-[100vh] md:min-w-[500px] md:px-5'>
                <div className=''>
                    <div className='flex flex-col items-center justify-between md:flex-row'>
                        <Link to='/'>
                            <img src={Logo} alt='Logo Oferta Repasse' />
                        </Link>
                        <Link to='/login'>
                            <p className='text-[13px] text-gray-100'>Já tem uma conta?</p>
                            <span className='text-[13px] font-semibold text-gray-100'>
                                Fazer o Login
                            </span>
                        </Link>
                    </div>
                    <div className='mt-3 px-2 md:mt-10 md:px-10'>
                        <p className='mb-3 text-center text-[26px] text-gray-100 xs:mb-5 md:mb-10 md:text-left'>
                            Cadastre-se com suas redes sociais
                        </p>
                        <LoginSocialFacebook
                            isOnlyGetToken
                            appId={process.env.REACT_APP_FACEBOOK_ID as string}
                            onResolve={({ data }: any) =>
                                handleAuthGoogle('facebook', data.accessToken)
                            }
                            onReject={(err) => console.log({ err })}
                        >
                            <ButtonSocial social='facebook' />
                        </LoginSocialFacebook>
                        <LoginSocialGoogle
                            client_id={process.env.REACT_APP_GOOGLE_CLIENTE_ID as string}
                            scope='email profile'
                            onResolve={({ data }: any) => {
                                handleAuthGoogle('google', data.access_token)
                            }}
                            onReject={(err) => console.log({ err })}
                        >
                            <ButtonSocial social='google' className='my-4 border border-gray-700' />
                        </LoginSocialGoogle>
                        {/* <ButtonSocial social='google' className='my-4 border border-gray-700' /> */}
                        <ButtonSocial social='apple' />

                        <p className='mt-4 mb-3 text-center text-[26px] text-gray-100 xs:mb-6 xs:mt-8 md:mb-10 md:mt-16 md:text-left'>
                            ou crie uma conta com seu e-mail
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input placeholder='Nome completo' {...register('name')} />
                            <Controller
                                control={control}
                                name='type'
                                render={({ field }) => (
                                    <RadioGroup row={true} className='my-4' {...field}>
                                        <FormControlLabel
                                            value='physical'
                                            control={<Radio />}
                                            label='Pessoa Física'
                                        />
                                        <FormControlLabel
                                            value='legal'
                                            control={<Radio />}
                                            label='Pessoa Jurídica'
                                            className='text-sm'
                                        />
                                    </RadioGroup>
                                )}
                            />
                            <Input
                                placeholder='example@example.com'
                                className='mb-3'
                                {...register('email')}
                            />
                            <Input
                                placeholder='********'
                                type='password'
                                {...register('password')}
                            />
                            <Button
                                className='mt-3 bg-primary text-center font-semibold text-white xs:mt-6 md:mt-10 md:text-left'
                                type='submit'
                            >
                                Criar conta
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
            <div className='h-[50vh] w-full overflow-hidden md:h-full'>
                <img src={WomamCar} className='h-full w-full object-cover' />
            </div>
        </div>
    )
}

export default SignUp
