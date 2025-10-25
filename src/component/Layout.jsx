import React, { useContext, useEffect } from 'react'
import SideBar from './SideBar'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { MyContext } from '../context/GlobalContext'
import Login from './Login'
import NavBar from './NavBar'

const Layout = () => {
    let { token, setToken } = useContext(MyContext);
    let navigate = useNavigate();
    return (
        <>
            {/* Responsive */}
            {
                token != undefined ? (
                    <>
                        <NavBar/>
                        <section className="flex w-full">
                            <ToastContainer />
                            {/* <SideBar className="min-h-screen" /> */}
                            <main className="flex-1 p-6">
                                <Outlet />
                            </main>
                        </section>
                    </>
                ) : (
                    <>
                        <Login />
                    </>
                )
            }


        </>
    )
}

export default Layout
