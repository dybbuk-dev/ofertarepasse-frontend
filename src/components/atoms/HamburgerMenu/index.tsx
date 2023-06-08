import React from 'react'
import CloseIcon from '@mui/icons-material/Close'

interface HamburgerMenuType {
    navbarVisible: boolean
    setNavbarVisible: React.Dispatch<React.SetStateAction<boolean>>
    children?: React.ReactNode
    className?: string
}

const HamburgerMenu = ({
    navbarVisible,
    setNavbarVisible,
    children,
    className,
}: HamburgerMenuType) => {
    const closeNavbar = () => setNavbarVisible(false)
    return (
        <div
            className={`fixed top-0 right-0 z-10 overflow-hidden border border-l-2 border-slate-300 ${
                navbarVisible === true ? 'w-full' : 'w-0'
            } h-screen bg-white transition-[width] duration-500 ${className}`}
        >
            <div className='flex h-20 w-full items-center justify-end px-5'>
                <button onClick={closeNavbar}>
                    <CloseIcon sx={{ color: 'black' }} />
                </button>
            </div>
            {children}
        </div>
    )
}

export default HamburgerMenu
