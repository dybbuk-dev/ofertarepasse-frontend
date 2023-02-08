import CheckboxMui, { CheckboxProps } from '@mui/material/Checkbox'
import { IoEllipseOutline, IoCheckmarkCircle } from 'react-icons/io5'

const Checkbox = ({ ...props }: CheckboxProps) => {
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
            {...props}
        />
    )
}

export default Checkbox
