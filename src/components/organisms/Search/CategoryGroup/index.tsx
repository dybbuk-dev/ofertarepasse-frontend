import React, { useState } from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Radio from 'components/atoms/Input/Radio'
import Checkbox from 'components/atoms/Input/Checkbox'

interface CategroyGroupType {
    title: string
    items: { title: string; value: string }[]
    currentItem: string
    isCheckbox?: boolean
    displayItems?: number
    inline?: boolean
}

type Ref = HTMLInputElement

const CategroyGroup = React.forwardRef<Ref, CategroyGroupType>(
    (
        {
            title,
            items,
            isCheckbox = false,
            displayItems = -1,
            currentItem,
            inline = false,
            ...restProps
        },
        ref
    ) => {
        const [showAll, setShowAll] = useState(false)
        return (
            <div className='flex flex-col gap-y-4'>
                <div className='pl-3.5 text-sm font-medium'>{title}</div>
                <div className={`flex ${inline ? '' : 'flex-col'} gap-x-4`}>
                    {(displayItems === -1 || (displayItems !== -1 && showAll)
                        ? items
                        : items.slice(0, displayItems)
                    ).map((item) => (
                        <label
                            key={item.toString()}
                            role='button'
                            className='text-sm font-medium text-gray-400'
                        >
                            {isCheckbox ? (
                                <Checkbox
                                    name={title}
                                    value={item.value}
                                    ref={ref}
                                    {...restProps}
                                />
                            ) : (
                                <Radio
                                    checked={item.value === currentItem}
                                    name={title}
                                    value={item.value}
                                    ref={ref}
                                    {...restProps}
                                />
                            )}
                            {item.title}
                        </label>
                    ))}
                </div>
                {displayItems !== -1 && (
                    <div className='pl-3.5'>
                        <button
                            className='text-sm font-medium'
                            onClick={(ev) => {
                                ev.preventDefault()
                                setShowAll(!showAll)
                            }}
                        >
                            Ver todos os {title.toLowerCase()}{' '}
                            {showAll ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </button>
                    </div>
                )}
            </div>
        )
    }
)

CategroyGroup.displayName = 'CategroyGroup'

export default CategroyGroup
