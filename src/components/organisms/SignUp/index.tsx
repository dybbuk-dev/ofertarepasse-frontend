import WomamCar from 'assets/images/womam_in_car.png'
import Logo from 'assets/images/logo.png'
import { Link } from 'react-router-dom'
import ButtonSocial from 'components/atoms/Button/Social'
import Input from 'components/atoms/Input'
import Button from 'components/atoms/Button'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from 'components/atoms/Input/Radio'

const SignUp = () => (
    <div className='grid min-h-screen grid-cols-2 items-center gap-14'>
        <div className='flex flex-col items-end py-10'>
            <div className='w-[500px]'>
                <div className='flex items-center justify-between'>
                    <Link to='/'>
                        <img src={Logo} alt='Logo Oferta Repasse' />
                    </Link>
                    <Link to='/signin'>
                        <p className='text-[13px] text-gray-100'>Já tem uma conta?</p>
                        <span className='text-[13px] font-semibold text-gray-100'>
                            Fazer o Login
                        </span>
                    </Link>
                </div>
                <div className='mt-[10vh] w-[384px]'>
                    <p className='mb-10 text-[26px] text-gray-100'>
                        Cadastre-se com suas redes sociais
                    </p>
                    <ButtonSocial social='facebook' />
                    <ButtonSocial social='google' className='my-4 border border-gray-700' />
                    <ButtonSocial social='apple' />

                    <p className='mt-16 mb-10 text-[26px] text-gray-100'>
                        ou crie uma conta com seu e-mail
                    </p>

                    <Input placeholder='Nome completo' />
                    <RadioGroup row={true} className='my-4'>
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
                    <Input placeholder='example@example.com' className='mb-3' />
                    <Input placeholder='********' />
                    <div className='my-5 flex justify-end'>
                        <Link to='#'>
                            <span className='text-[13px] font-medium text-gray-400 underline underline-offset-2'>
                                Esqueci minha senha
                            </span>
                        </Link>
                    </div>
                    <Button className='bg-primary text-left font-semibold text-white'>
                        Entrar
                    </Button>
                </div>
            </div>
        </div>
        <div className='h-full w-full overflow-hidden'>
            <img src={WomamCar} className='h-full w-full object-cover' />
        </div>
    </div>
)

export default SignUp
