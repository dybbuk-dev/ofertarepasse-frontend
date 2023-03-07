import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/styles/index.css'
import { ToastContainer } from 'react-toastify'
import AuthProvider from 'contexts/auth'
import App from 'app'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <AuthProvider>
        <ToastContainer theme='colored' />
        <App />
    </AuthProvider>
)
