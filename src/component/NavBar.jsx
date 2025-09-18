import React, { useEffect } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from '../context/GlobalContext';
import { FaUserCircle } from "react-icons/fa";
import { IoExitOutline, IoSchool } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";

const NavBar = () => {
  let { token, setToken, user, isOpen, setIsOpen,menuClass ,setmenuClass} = useContext(MyContext);

  let handleToken = () => {
    setToken(undefined);
  }
  let handleOpenMenu = () => {
    // setIsOpen(false);
    // setmenuClass("flex");
  }

  return (
    <div className='bg-transparent w-full shadow flex flex-wrap justify-between items-center p-4 sm:p-5 '>
      {/* Responsive */}
      {/* Logo / Title */}
      <div className='flex  items-center gap-3'>

        {
          isOpen ? <>
            <IoMenu className={`text-3xl ${menuClass}`} onClick={handleOpenMenu} />
          </> : <>
          </>
        }
        <div className='flex text-3xl items-center gap-1 font-medium'>
          <Link to="/layout" className='flex gap-3 items-center'> <IoSchool className='text-blue-600' />BootCamp</Link>
        </div>
      </div>

      {/* Navigation / Buttons */}
      <div className='flex flex-col sm:flex-row items-center gap-3'>

        <div className='flex items-center gap-4'>
          {
            user != "user" ? <>
              <p className='p-1 rounded-full w-full pl-3 pr-3 bg-red-300 text-white'>Admin</p>
            </> : <>
              <p className='p-1 rounded-full w-full pl-3 pr-3 bg-green-300 text-white'>User</p>
            </>
          }
          <Link to="/layout/Profile">
            <FaUserCircle className={`text-xl sm:text-3xl ${user!="user"?"text-rose-600":"text-green-600"}  hover:bg-black hover:rounded-full hover:text-white transition-all`} />
          </Link>
          <button
            onClick={handleToken}
            className='flex items-center gap-4 text-base sm:text-xl px-6 py-2 rounded-[20px] hover:bg-gray-200 hover:text-black transition-all'
          >
            <IoExitOutline />
            Logout
          </button>
        </div>

      </div>
    </div>
  )
}

export default NavBar
