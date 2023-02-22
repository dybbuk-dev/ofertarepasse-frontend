/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from 'react'
import { IoChevronDown } from 'react-icons/io5'

interface ISelect {
    label: string
    options?: Array<{ label: string; value: any }>
    defaultValue?: { label: string; value: any }
    onChange: (value: any) => void
    position?: 'left' | 'right'
}

const Select = ({ label, options, defaultValue, onChange, position = 'left' }: ISelect) => {
    const [open, setOpen] = React.useState(false)
    const labelRef = React.useRef<HTMLSpanElement>(null)

    return (
        <div
            className='relative flex w-full items-center justify-center rounded-xl bg-white px-8 py-2'
            role='button'
            onClick={() => setOpen(!open)}
        >
            <span ref={labelRef} className='text-sm text-gray-200'>
                {defaultValue ? defaultValue.label : label}
            </span>
            <IoChevronDown className={`ml-2 ${!open ? 'rotate-0' : 'rotate-180'} text-gray-200`} />
            {options && open ? (
                <div
                    className={`absolute top-[110%] ${
                        position === 'left' ? 'left-0' : 'right-0'
                    } min-w-full overflow-hidden rounded-lg bg-white shadow`}
                >
                    {options.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                onChange(item)
                                if (labelRef && labelRef.current) {
                                    labelRef.current.innerText = item.label
                                }
                            }}
                            className='px-8 py-2'
                        >
                            <span className='text-sm text-gray-200'>{item.label}</span>
                        </button>
                    ))}
                </div>
            ) : null}
        </div>
    )
}

export default Select
