import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import Products, {action as updateAvailabilityAction}  from './views/Products'
import { productLoader, editProductLoader } from './loaders/productLoader'
import NewProduct, { action as newProductAction } from './views/NewProduct'
import EditProduct, {  action as editProductAction } from './views/EditProduct'
import { action as deleteProductAction } from './components/ProductDetail'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: productLoader,
                action: updateAvailabilityAction
            },
            {
                path: '/products/new',
                element: <NewProduct />,
                action: newProductAction
            },
            {
                path: '/products/:id/edit', //ROA Pattern - Resource-oriented desing
                element: <EditProduct />,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path: '/products/:id/delete',
                action: deleteProductAction
            }
        ]
    }
])