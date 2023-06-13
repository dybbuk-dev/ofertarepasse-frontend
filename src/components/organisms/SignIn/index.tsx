/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react'
import MenCar from 'assets/images/men_in_car.png'
import Logo from 'assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import ButtonSocial from 'components/atoms/Button/Social'
import Input from 'components/atoms/Input'
import Button from 'components/atoms/Button'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useAuth } from 'hooks/auth'
import { LoginSocialFacebook, LoginSocialGoogle } from 'reactjs-social-login'
import { Roles } from 'types'

interface IDataForm {
    email: string
    password: string
}

const SignIn = () => {
    const { register, handleSubmit } = useForm<IDataForm>()
    const { signIn, handleAuthGoogle, user, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    const onSubmit = async (dataForm: IDataForm) => {
        const { error, message, data } = await signIn(dataForm.email, dataForm.password)

        if (error) {
            toast.error(message)
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            if (user?.roles === Roles.ADMIN) {
                navigate('/admin')
            } else {
                navigate('/')
            }
        }
    }, [user, isAuthenticated])

    return (
        <div className='flex flex-col-reverse items-center justify-end md:h-screen md:flex-row'>
            <section className='flex items-center overflow-y-scroll py-10 md:h-[100vh] md:min-w-[500px] md:px-5'>
                <div>
                    <div className='flex flex-col items-center justify-between md:flex-row'>
                        <Link to='/'>
                            <img src={Logo} alt='Logo Oferta Repasse' />
                        </Link>
                        <Link to='/cadastro'>
                            <p className='text-[13px] text-gray-100'>Já tem uma conta?</p>
                            <span className='text-[13px] font-semibold text-primary'>
                                Cadastre-se Grátis
                            </span>
                        </Link>
                    </div>
                    <div className='mt-3 px-2 md:mt-10 md:px-10'>
                        <p className='mb-3 text-center text-[26px] text-gray-100 xs:mb-5 md:mb-10 md:text-left'>
                            Entre com suas redes sociais
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
                        <ButtonSocial social='apple' />
                        <p className='mt-4 mb-3 text-center text-[26px] text-gray-100 xs:mb-6 xs:mt-8 md:mb-10 md:mt-16 md:text-left'>
                            ou digite o seu e-mail e senha
                        </p>
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                            <div className='my-5 flex justify-center md:justify-end'>
                                <Link to='/esqueci-minha-senha'>
                                    <span className='text-[13px] font-medium text-gray-400 underline underline-offset-2'>
                                        Esqueci minha senha
                                    </span>
                                </Link>
                            </div>
                            <Button
                                className='bg-primary text-center font-semibold text-white md:text-left'
                                type='submit'
                            >
                                Entrar
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
            <div className='h-[50vh] w-full max-w-[100vh] overflow-hidden md:h-full'>
                <img src={MenCar} className='h-full w-full object-cover' />
            </div>
        </div>
    )
}

export default SignIn
