import { IoClose } from 'react-icons/io5'

interface IModal {
    title: string
    children: React.ReactNode
    onClose?: () => void
}

const Modal = ({ title, children, onClose, ...props }: IModal) => (
    <div
        className='fixed top-0 left-0 z-50 flex h-[100vh] w-[100vw] items-center justify-center bg-[#00000099]'
        {...props}
    >
        <div className='rounded bg-white'>
            <div className='flex items-center justify-between rounded-t py-3 px-8 shadow-[4px_0px_10px_#00000033]'>
                <p className='font-inter font-semibold text-gray-800'>{title}</p>
                <IoClose onClick={onClose} className='text-2xl text-gray-800' role='button' />
            </div>
            <div className='rounded-b p-8'>{children}</div>
        </div>
    </div>
)

export default Modal
