import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/styles/index.css'
import SignIn from 'pages/SignIn'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUp from 'pages/SignUp'
import Home from 'pages/Home'
import HomeDashboard from 'pages/Dashboard/Home'
import Info from 'pages/Info'
import Search from 'pages/Search'
import Advertiser from 'pages/Dashboard/Advertiser'
import Customers from 'pages/Dashboard/Customers'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/signin',
        element: <SignIn />,
    },
    {
        path: '/signup',
        element: <SignUp />,
    },
    {
        path: '/search',
        element: <Search />,
    },
    {
        path: '/info/:id',
        element: <Info />,
    },
    {
        path: '/dashboard',
        element: <HomeDashboard />,
    },
    {
        path: '/dashboard/advertiser',
        element: <Advertiser />,
    },
    {
        path: '/dashboard/customers',
        element: <Customers />,
    },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
