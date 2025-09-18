import React, { Children } from 'react'
import { createContext, useContext, useState } from 'react';

export let MyContext = createContext();

const GlobalContex = ({ children }) => {
  const [user, setUser] = useState("");
  let [userName, setuserName] = useState("");
  let [isOpen, setIsOpen] = useState(false);
  let [menuClass, setmenuClass] = useState("flex");
  let [token, setToken] = useState(undefined);
  let [displayCourses, setDisplayCourses] = useState();


  return (
    <>
      <MyContext.Provider value={{ userName, setuserName, menuClass, setmenuClass, user, setUser, setToken, token, displayCourses, setDisplayCourses, isOpen, setIsOpen }}>
        {children}
      </MyContext.Provider>
    </>
  )
}

export default GlobalContex
