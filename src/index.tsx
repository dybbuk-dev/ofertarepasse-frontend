import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/styles/index.css'
import SignIn from 'pages/SignIn'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUp from 'pages/SignUp'
import Home from 'pages/Home'
import Info from 'pages/Info'
import Search from 'pages/Search'

import AdminHome from 'pages/Admin/Home'
import AdminAdvertiser from 'pages/Admin/Advertiser'
import AdminCustomers from 'pages/Admin/Customers'
import AdminNegotiations from 'pages/Admin/Negotiations'
import AdminSold from 'pages/Admin/Sold'
import AdminAdverts from 'pages/Admin/Adverts'
import AdminConfigurations from 'pages/Admin/Configurations'
import DashboardHome from 'pages/Dashboard/Home'
import DashboardSold from 'pages/Dashboard/Sold'
import DashboardAdverts from 'pages/Dashboard/Adverts'
import DashboardSales from 'pages/Dashboard/Sales'
import DashboardConfigurations from 'pages/Dashboard/Configurations'
import DashboardCreateAdverts from 'pages/Dashboard/Adverts/Create'
import { ToastContainer } from 'react-toastify'

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
        path: '/admin',
        element: <AdminHome />,
    },
    {
        path: '/admin/advertiser',
        element: <AdminAdvertiser />,
    },
    {
        path: '/admin/customers',
        element: <AdminCustomers />,
    },
    {
        path: '/admin/negotiations',
        element: <AdminNegotiations />,
    },
    {
        path: '/admin/sold',
        element: <AdminSold />,
    },
    {
        path: '/admin/adverts',
        element: <AdminAdverts />,
    },
    {
        path: '/admin/configurations',
        element: <AdminConfigurations />,
    },
    {
        path: '/dashboard',
        element: <DashboardHome />,
    },
    {
        path: '/dashboard/negotiations',
        element: <DashboardSold />,
    },
    {
        path: '/dashboard/adverts',
        element: <DashboardAdverts />,
    },
    {
        path: '/dashboard/adverts/create',
        element: <DashboardCreateAdverts />,
    },
    {
        path: '/dashboard/sales',
        element: <DashboardSales />,
    },
    {
        path: '/dashboard/configurations',
        element: <DashboardConfigurations />,
    },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <ToastContainer theme='colored' />
        <RouterProvider router={router} />
    </React.StrictMode>
)
