/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import CheckboxMui, { CheckboxProps } from '@mui/material/Checkbox'
import * as React from 'react'
import { IoEllipseOutline, IoCheckmarkCircle } from 'react-icons/io5'

const Checkbox = React.forwardRef(({ ...props }: CheckboxProps, ref: any) => {
    return (
        <CheckboxMui
            sx={{
                color: '#E3E3E3',
                '&.Mui-checked': {
                    color: '#F3722C',
                },
            }}
            icon={<IoEllipseOutline className='text-2xl' />}
            checkedIcon={<IoCheckmarkCircle className='text-2xl' />}
            ref={ref}
            {...props}
        />
    )
})

export default Checkbox
