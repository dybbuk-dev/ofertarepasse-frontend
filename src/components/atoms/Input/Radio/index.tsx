import React from 'react'
import RadioMui, { RadioProps } from '@mui/material/Radio'

const Radio = React.forwardRef(({ ...props }: RadioProps, ref: any) => {
    return (
        <RadioMui
            sx={{
                color: '#E3E3E3',
                '&.Mui-checked': {
                    color: '#F3722C',
                },
            }}
            ref={ref}
            {...props}
        />
    )
})

Radio.displayName = 'Radio'

export default Radio
