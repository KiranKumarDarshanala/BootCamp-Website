import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../context/GlobalContext';
import { toast } from 'react-toastify';
import Loader from '../component/Loader';
import { FaUserCircle } from 'react-icons/fa';

const UserProfile = () => {
  let { token } = useContext(MyContext);
  let [user, setUser] = useState();

  let handleUpdateProfile = () => {
    // console.log("Not developed..");
    toast.error("This option is not Available.!!!");
  }

  useEffect(() => {
    let fetchUserDetails = async () => {
      let resutl = await fetch("http://localhost:5000/api/v1/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });
      let data = resutl.json();
      // it returns a promise.
      data.then((res) => {
        setUser(res.data);
      });
      data.catch((err) => {
        toast.error(`${err}`);
      })
    }
    fetchUserDetails();
  }, []);

  // console.log(user);

  return (
    <>
      {
        user != undefined ? <>
          <div className='flex items-center justify-center flex-row h-full'>
            <div className='flex h-[500px] gap-[20px] bg-white flex-col items-center border border-gray-400 pt-5 pb-5 pl-20 pr-20 rounded-2xl shadow-2xl shadow-black'>
              <FaUserCircle className={`border-4 h-[150px] w-[150px] rounded-full ${user.role=="user"?"bg-green-600":"bg-red-400"} bg-emerald-900 hover:bg-white  transition-all`}/>
              <h1 className='text-2xl font-bold'>Name: {user.name}</h1>
              <h1 className='text-xl font-semibold'>Email ID: {user.email}</h1>
              <h1 className='text-xl font-light'>Role: {user.role}</h1>
              <button className="text-2xl text-white w-[320px] py-2 px-6 border bg-blue-500 rounded-xl m-2 hover:bg-blue-600  transition-all inline-block" onClick={handleUpdateProfile}>Edit Profile</button>
            </div>
          </div>
        </> : <>
          <Loader />
        </>
      }

    </>
  )
}

export default UserProfile
