import Footer from 'components/molecules/Footer'
import Menu from 'components/molecules/Menu'
import React from 'react'
import 'react-toastify/dist/ReactToastify.min.css'

interface IDefaultTemplate extends React.HTMLAttributes<HTMLDivElement> {
    title?: string
    children: React.ReactNode
    hasMenu?: boolean
    hasFooter?: boolean
}

const DefaultTemplate: React.FC<IDefaultTemplate> = ({
    title,
    children,
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
            <main className={`${props.className ?? ''}`} {...props}>
                {children}
            </main>
            {hasFooter ? <Footer /> : null}
        </div>
    )
}

export default DefaultTemplate
