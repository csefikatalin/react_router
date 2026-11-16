import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css'
import Layout from './pages/Layout';
import PublicPage from './pages/PublicPage';
import AdminPage from './pages/AdminPage';
import ProductFormPage from './pages/ProductFormPage';
import CartPage from './pages/CartPage';
import NoPage from './pages/NoPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <PublicPage /> },
        { path: "admin", element: <AdminPage /> },
        { path: "admin/uj-termek", element: <ProductFormPage /> },
        { path: "kosar", element: <CartPage /> },
        { path: "termek/:id", element: <ProductDetailPage /> },
        { path: "*", element: <NoPage /> },
      ],
    },
  ]);

  return (
 
       <RouterProvider router={router} />
  
  )
}

export default App
