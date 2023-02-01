import Facebook from 'assets/icon/Facebook'
import Google from 'assets/icon/Google'
import Apple from 'assets/icon/Apple'

interface IButtonSocial extends React.HTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode
    title?: string
    social?: 'facebook' | 'google' | 'apple'
}

const ButtonSocial = ({ icon, title, social, className, ...props }: IButtonSocial) => (
    <button
        className={`grid w-full grid-cols-[40px_1fr] rounded-full px-4 py-3 ${
            social === 'facebook'
                ? 'bg-facebook'
                : social === 'google'
                ? 'bg-white'
                : social === 'apple'
                ? 'bg-[#050708]'
                : ''
        } ${className}`}
        {...props}
    >
        <div className='flex items-center justify-center'>
            {social === 'facebook' ? (
                <Facebook />
            ) : social === 'google' ? (
                <Google />
            ) : social === 'apple' ? (
                <Apple />
            ) : (
                icon
            )}
        </div>
        <span
            className={`text-left text-[14px] font-medium ${
                social === 'google' ? 'text-[#00000084]' : 'text-white'
            }`}
        >
            {social === 'facebook'
                ? 'Continuar com facebook'
                : social === 'google'
                ? 'Continuar com google'
                : social === 'apple'
                ? 'Continuar com apple'
                : title}
        </span>
    </button>
)

export default ButtonSocial
