import React, { useContext } from 'react'
import { MyContext } from '../context/GlobalContext'
import { Navigate } from 'react-router-dom'

const PrivateRoute = (props) => {
    let {user}=useContext(MyContext)
  
    if (user=="publisher") {
        return <>
        {props.children}
        </>
    }
    else {
        return <Navigate to="/login"/>
    }
}

export default PrivateRoute
