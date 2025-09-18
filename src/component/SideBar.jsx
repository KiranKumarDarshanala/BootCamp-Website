import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MyContext } from '../context/GlobalContext';
import { FaBars, FaTimes } from 'react-icons/fa';
import { LuBookOpen } from 'react-icons/lu';
import { FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SideBar = () => {
  let { user, isOpen, setIsOpen, menuClass, setmenuClass } = useContext(MyContext);
  // let [isOpen, setIsOpen] = useState(false);

  let handleClose = () => {
    // if (isOpen) {
    //   setmenuClass("hidden");
    //   setIsOpen(false);
    // } else {
    //   setmenuClass("flex");
    //   setIsOpen(true);
    // }
  }

  return (
    <>
      {/* Responsive */}
      <nav
        className={` ${menuClass} flex-col shadow h-fit p-5 relative `}
      >
        <button className={`absolute top-3 right-2 mb-4 `} onClick={handleClose}><IoMdClose /></button>
        <NavLink className={`flex p-[10px] rounded gap-5 items-center hover:bg-blue-300`}
          to="/layout"
        >
          <LuBookOpen className='text-[#000] text-xl' />
          All BootCamps
        </NavLink>

        {user === 'publisher' && (
          <NavLink className={`flex p-[10px] rounded gap-4  items-center hover:bg-blue-300 `}
            to="/layout/addBootCamp"
          >
            <FaPlus className='text-[#000] text-xl' />
            Create BootCamp
          </NavLink>
        )}
      </nav>
    </>
  );
};

export default SideBar;
