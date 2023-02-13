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
import Negotiations from 'pages/Dashboard/Negotiations'
import Sold from 'pages/Dashboard/Sold'
import Adverts from 'pages/Dashboard/Adverts'
import Configurations from 'pages/Dashboard/Configurations'

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
    {
        path: '/dashboard/negotiations',
        element: <Negotiations />,
    },
    {
        path: '/dashboard/sold',
        element: <Sold />,
    },
    {
        path: '/dashboard/adverts',
        element: <Adverts />,
    },
    {
        path: '/dashboard/configations',
        element: <Configurations />,
    },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
