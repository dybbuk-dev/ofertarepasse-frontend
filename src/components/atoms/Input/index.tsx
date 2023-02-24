/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import React from 'react'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: React.InputHTMLAttributes<HTMLInputElement>['type']
    classInput?: React.InputHTMLAttributes<HTMLInputElement>['className']
}

type Ref = any

const Input = React.forwardRef<Ref, IInput>(({ type, className, classInput, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false)

    return (
        <div
            className={`relative flex w-full items-center rounded-full border border-gray-400 py-3 px-5 ${className}`}
        >
            <input
                className={`w-full bg-transparent text-[14px] text-gray-300 outline-none ${classInput}`}
                type={visible ? 'text' : type}
                ref={ref}
                {...props}
            />
            {!!type && type === 'password' ? (
                <button
                    className='absolute right-4 text-xl'
                    onClick={() => setVisible(!visible)}
                    type='button'
                >
                    {visible ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </button>
            ) : null}
        </div>
    )
})

export default Input
