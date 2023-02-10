import { IoSearchOutline } from 'react-icons/io5'

interface IInputSimple extends React.InputHTMLAttributes<HTMLInputElement> {
    classInput?: React.InputHTMLAttributes<HTMLInputElement>['className']
}

const InputSimple = ({ className, classInput, ...props }: IInputSimple) => {
    return (
        <div className={`relative flex w-full items-center ${className ?? ''}`}>
            <IoSearchOutline className='text-xl text-gray-500' />
            <input
                className={`ml-3 w-full bg-transparent text-gray-200 outline-none ${classInput}`}
                {...props}
            />
        </div>
    )
}

export default InputSimple
