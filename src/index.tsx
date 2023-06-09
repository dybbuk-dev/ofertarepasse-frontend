import ReactDOM from 'react-dom/client'
import '@/styles/index.scss'
import { ToastContainer } from 'react-toastify'
import AuthProvider from 'contexts/auth'
import App from 'app'
import FavoriteProvider from 'contexts/favorites'
import { GoogleOAuthProvider } from '@react-oauth/google'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <GoogleOAuthProvider
        clientId={
            process.env.REACT_APP_GOOGLE_CLIENTE_ID ? process.env.REACT_APP_GOOGLE_CLIENTE_ID : ''
        }
    >
        <AuthProvider>
            <FavoriteProvider>
                <ToastContainer theme='colored' />
                <App />
            </FavoriteProvider>
        </AuthProvider>
    </GoogleOAuthProvider>
)
