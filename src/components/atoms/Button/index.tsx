interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode
}

const Button = ({ children, className, ...props }: IButton) => (
    <button className={`w-full rounded-full py-3 px-5 ${className}`} {...props}>
        {children}
    </button>
)

export default Button
