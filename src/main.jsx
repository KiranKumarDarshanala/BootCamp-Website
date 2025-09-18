import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import routes from './router/Router.jsx'
import GlobalContex from './context/GlobalContext.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <GlobalContex>
      <RouterProvider router={routes}></RouterProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </GlobalContex>
  // </StrictMode>,
)
