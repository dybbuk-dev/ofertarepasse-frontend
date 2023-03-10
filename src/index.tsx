import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/styles/index.css'
import { ToastContainer } from 'react-toastify'
import AuthProvider from 'contexts/auth'
import App from 'app'
import FavoriteProvider from 'contexts/favorites'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <AuthProvider>
        <FavoriteProvider>
            <ToastContainer theme='colored' />
            <App />
        </FavoriteProvider>
    </AuthProvider>
)
