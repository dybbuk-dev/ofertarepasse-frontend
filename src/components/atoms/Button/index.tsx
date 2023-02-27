import BasicLoading from '../BasicLoading'

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean
    children?: React.ReactNode
}

const Button = ({ children, className, disabled, loading, ...props }: IButton) => (
    <button
        className={`w-full rounded-full py-3 px-5 ${className}`}
        disabled={disabled || loading}
        {...props}
    >
        {loading ? <BasicLoading borderSize='2px' color='white' size='25px' /> : children}
    </button>
)

export default Button
