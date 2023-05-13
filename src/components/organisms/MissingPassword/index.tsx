/* eslint-disable @typescript-eslint/no-explicit-any */
import PersonInCar from 'assets/images/personBlackInCar.jpeg'
import Logo from 'assets/images/logo.png'
import Input from 'components/atoms/Input'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Button from 'components/atoms/Button'
import api from 'services/api'
import { toast } from 'react-toastify'

const MissingPassword = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const token = searchParams.get('token')

    const { register, handleSubmit } = useForm<any>()

    const onSubmit = async (dataForm: any) => {
        try {
            if (!token) {
                const { data } = await api.post('/api/auth/tokenEmail', { email: dataForm.email })

                console.log(data)
                toast.success(
                    'Enviamos um email para você contendo um link para redifinir sua senha',
                    { autoClose: false }
                )
            } else {
                await api.post('/api/auth/changePassword', {
                    token,
                    password: dataForm.password,
                })

                toast.success('Sua senha foi alterada🎉')
                navigate('/login')
            }
        } catch (err) {
            console.log(err)
            toast.error('')
        }
    }

    return (
        <div className='grid h-screen grid-cols-2 items-center gap-14'>
            <section className='flex flex-col items-end py-10'>
                <div className='w-[400px]'>
                    <div className='flex items-center justify-between'>
                        <Link to='/'>
                            <img src={Logo} alt='Logo Oferta Repasse' />
                        </Link>
                        <Link to='/login'>
                            <p className='text-[13px] text-gray-100'>Lembrou sua senha?</p>
                            <span className='text-[13px] font-semibold text-primary'>
                                Ir para o login
                            </span>
                        </Link>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p className='my-10 text-lg text-gray-100'>
                            {!token ? 'Digite seu email cadastrado' : 'Digite sua nova senha'}, logo
                            abaixo
                        </p>
                        {token ? (
                            <>
                                <Input placeholder='Sua nova senha' {...register('password')} />
                                <Input
                                    placeholder='Repita sua nova senha'
                                    className='mt-2'
                                    {...register('confirmPassword')}
                                />
                            </>
                        ) : (
                            <Input placeholder='example@example.com' {...register('email')} />
                        )}
                        <Button
                            className='mt-3 bg-primary text-left font-semibold text-white'
                            type='submit'
                        >
                            Enviar
                        </Button>
                    </form>
                </div>
            </section>
            <div className='h-full w-full overflow-hidden'>
                <img src={PersonInCar} className='h-full w-full object-cover' />
            </div>
        </div>
    )
}

export default MissingPassword
