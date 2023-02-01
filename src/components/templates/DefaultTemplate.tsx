import Footer from 'components/molecules/Footer'
import Menu from 'components/molecules/Menu'
import React from 'react'

interface IDefaultTemplate extends React.HTMLAttributes<HTMLDivElement> {
    title?: string
    children: React.ReactNode
    container?: boolean
    hasMenu?: boolean
    hasFooter?: boolean
}

const DefaultTemplate: React.FC<IDefaultTemplate> = ({
    title,
    children,
    container = true,
    hasMenu = true,
    hasFooter = true,
    ...props
}) => {
    React.useEffect(() => {
        document.title = title ? `Oferta Repasse - ${title}` : 'Oferta Repasse'
    }, [])

    return (
        <div>
            {hasMenu ? <Menu /> : null}
            <main
                className={`${container ? 'container mx-auto' : ''} ${props.className}`}
                {...props}
            >
                {children}
            </main>
            {hasFooter ? <Footer /> : null}
        </div>
    )
}

export default DefaultTemplate
