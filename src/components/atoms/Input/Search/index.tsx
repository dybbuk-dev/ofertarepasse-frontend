import React from 'react'

interface ISearch extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: React.InputHTMLAttributes<HTMLInputElement>['className']
}

const Search = ({ className, ...props }: ISearch) => {
    // const [focused, setFocused] = React.useState(false)

    const sugestions = ['HB20 2020', 'HB20 2019', 'HB20 2018', 'HB20 2015']

    return (
        <div className='relative w-full'>
            <input
                className={`w-full text-xl outline-none placeholder:text-gray-500 ${className}`}
                // onFocus={() => setFocused(true)}
                // onBlur={() => setFocused(false)}
                {...props}
            />
            <div
                className={
                    'ease absolute top-full left-0 mt-4 hidden w-full overflow-hidden border-y border-gray-700 bg-white py-4 duration-200'
                }
            >
                <div className='flex flex-col gap-2 px-6'>
                    {sugestions.map((item) => (
                        <button key={item} className='!w-max'>
                            <span className='font-medium text-gray-500'>{item}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Search
