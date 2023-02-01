import React from 'react'
import RadioMui, { RadioProps } from '@mui/material/Radio'

const Radio = ({ ...props }: RadioProps) => {
    return (
        <RadioMui
            sx={{
                color: '#E3E3E3',
                '&.Mui-checked': {
                    color: '#F3722C',
                },
            }}
            {...props}
        />
    )
}

export default Radio
