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

interface IDataForm {
    email: string
    password: string
}

const SignIn = () => {
    const { register, handleSubmit } = useForm<IDataForm>()
    const { signIn, handleAuthGoogle } = useAuth()
    const navigate = useNavigate()

    const onSubmit = async (dataForm: IDataForm) => {
        const { error, message } = await signIn(dataForm.email, dataForm.password)

        if (error) {
            toast.error(message)
        } else {
            navigate('/')
        }
    }

    return (
        <div className='grid h-screen grid-cols-2 items-center gap-14'>
            <section className='flex flex-col items-end py-10'>
                <div className='w-[500px]'>
                    <div className='flex items-center justify-between'>
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
                    <div className='mt-[10vh] w-[384px]'>
                        <p className='mb-10 text-[26px] text-gray-100'>
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
                            scope='email'
                            onResolve={({ data }: any) => {
                                handleAuthGoogle('google', data.access_token)
                            }}
                            onReject={(err) => console.log({ err })}
                        >
                            <ButtonSocial social='google' className='my-4 border border-gray-700' />
                        </LoginSocialGoogle>
                        {/* <div className='my-5 w-full'>
                            <GoogleLogin
                                onSuccess={(response) => {
                                    handleAuthGoogle(response.credential as string)
                                }}
                                onError={() => {
                                    console.log('Login Failed')
                                }}
                            />
                        </div> */}
                        <ButtonSocial social='apple' />
                        <p className='mt-16 mb-10 text-[26px] text-gray-100'>
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
                            {/* <div className='my-5 flex justify-end'>
                                <Link to='#'>
                                    <span className='text-[13px] font-medium text-gray-400 underline underline-offset-2'>
                                        Esqueci minha senha
                                    </span>
                                </Link>
                            </div> */}
                            <Button
                                className='mt-5 bg-primary text-left font-semibold text-white'
                                type='submit'
                            >
                                Entrar
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
            <div className='h-full w-full overflow-hidden'>
                <img src={MenCar} className='h-full w-full object-cover' />
            </div>
        </div>
    )
}

export default SignIn
