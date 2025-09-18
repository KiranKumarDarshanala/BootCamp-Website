import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import NavBar from './component/NavBar';
import SideBar from './component/SideBar';
import { Outlet } from 'react-router-dom';
import Layout from './component/Layout';

const App = () => {
  return (
    <>
      {/* <ToastContainer /> */}
      {/* <NavBar /> */}
      <Outlet />
    </>
  )
}

export default App
