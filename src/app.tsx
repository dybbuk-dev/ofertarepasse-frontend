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
import ProtectedRoute from 'components/atoms/ProtectedRoute'

const App = () => {
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
            element: (
                <ProtectedRoute role='admin'>
                    <AdminHome />
                </ProtectedRoute>
            ),
        },
        {
            path: '/admin/advertiser',
            element: (
                <ProtectedRoute role='admin'>
                    <AdminAdvertiser />
                </ProtectedRoute>
            ),
        },
        {
            path: '/admin/customers',
            element: (
                <ProtectedRoute role='admin'>
                    <AdminCustomers />
                </ProtectedRoute>
            ),
        },
        {
            path: '/admin/negotiations',
            element: (
                <ProtectedRoute role='admin'>
                    <AdminNegotiations />
                </ProtectedRoute>
            ),
        },
        {
            path: '/admin/sold',
            element: (
                <ProtectedRoute role='admin'>
                    <AdminSold />
                </ProtectedRoute>
            ),
        },
        {
            path: '/admin/adverts',
            element: (
                <ProtectedRoute role='admin'>
                    <AdminAdverts />
                </ProtectedRoute>
            ),
        },
        {
            path: '/admin/configurations',
            element: (
                <ProtectedRoute role='admin'>
                    <AdminConfigurations />
                </ProtectedRoute>
            ),
        },
        {
            path: '/dashboard',
            element: (
                <ProtectedRoute role='user'>
                    <DashboardHome />
                </ProtectedRoute>
            ),
        },
        {
            path: '/dashboard/negotiations',
            element: (
                <ProtectedRoute role='user'>
                    <DashboardSold />
                </ProtectedRoute>
            ),
        },
        {
            path: '/dashboard/adverts',
            element: (
                <ProtectedRoute role='user'>
                    <DashboardAdverts />
                </ProtectedRoute>
            ),
        },
        {
            path: '/dashboard/adverts/create',
            element: (
                <ProtectedRoute role='user'>
                    <DashboardCreateAdverts />
                </ProtectedRoute>
            ),
        },
        {
            path: '/dashboard/sales',
            element: (
                <ProtectedRoute role='user'>
                    <DashboardSales />
                </ProtectedRoute>
            ),
        },
        {
            path: '/dashboard/configurations',
            element: (
                <ProtectedRoute role='user'>
                    <DashboardConfigurations />
                </ProtectedRoute>
            ),
        },
    ])

    return <RouterProvider router={router} />
}

export default App
