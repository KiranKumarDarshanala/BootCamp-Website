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
    {user !== undefined ? (
      <div className="flex items-center justify-center flex-col sm:flex-row h-full p-4">
        <div className="flex flex-col items-center gap-5 sm:gap-8 bg-white border border-gray-400 pt-5 pb-5 px-8 sm:px-20 rounded-2xl shadow-2xl shadow-black w-full sm:w-auto">
          <FaUserCircle
            className={`border-4 rounded-full transition-all ${
              user.role === "user" ? "bg-green-600" : "bg-red-400"
            } h-32 w-32 sm:h-[150px] sm:w-[150px] hover:bg-white`}
          />
          <h1 className="text-2xl font-bold text-center sm:text-left">Name: {user.name}</h1>
          <h1 className="text-xl font-semibold text-center sm:text-left">Email ID: {user.email}</h1>
          <h1 className="text-xl font-light text-center sm:text-left">Role: {user.role}</h1>
          <button
            className="text-2xl text-white w-full sm:w-[320px] py-2 px-6 border bg-blue-500 rounded-xl hover:bg-blue-600 transition-all"
            onClick={handleUpdateProfile}
          >
            Edit Profile
          </button>
        </div>
      </div>
    ) : (
      <Loader />
    )}
  </>
);

}

export default UserProfile
