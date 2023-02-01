import React from 'react'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: React.InputHTMLAttributes<HTMLInputElement>['type']
    classInput?: string
}

const Input = ({ type, className = '', classInput, ...props }: IInput) => {
    const [visible, setVisible] = React.useState(false)

    return (
        <div
            className={`relative flex w-full items-center rounded-full border border-gray-400 py-3 px-5 ${className}`}
        >
            <input
                className={`text-[14px] text-gray-300 outline-none ${classInput}`}
                type={visible ? 'text' : type}
                {...props}
            />
            {!!type && type === 'password' ? (
                <button className='absolute right-4 text-xl' onClick={() => setVisible(!visible)}>
                    {visible ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </button>
            ) : null}
        </div>
    )
}

export default Input
