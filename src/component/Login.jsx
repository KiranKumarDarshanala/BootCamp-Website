import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MyContext } from '../context/GlobalContext';
import { LuBookOpen } from "react-icons/lu";
import { IoSchool } from "react-icons/io5";
import { FaLessThan } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa";
import { TbUsers } from "react-icons/tb";

const Login = () => {
  let { user, setUser, setToken ,userName,setuserName} = useContext(MyContext);
  let navigate = useNavigate();

  let [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  let { email, password } = formData;

  let handleForgetPassword = ()=>{
    toast.error("This option is not available!\n We are currently working on this feature..");
  }

  let handleChange = (e) => {
    let { name, value, type } = e.target;
    setFormData({ ...formData, [name]: value })
  }
  let handleSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    let data = await response.json();
    // console.log(data.token);
    console.log(data);
    if (data.success == true) {
      toast.success(`Login as ${data.user.name}`);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      setUser(data.user.role);
      setuserName(data.user.name);
      setFormData({
        email: "",
        password: ""
      });
      navigate("/layout");
    }
    else {
      console.log(data.error);
      toast.error(`Invalid details. ${data.error}`);
    }
  }
  return (
  <>
    <section className="w-full min-h-screen bg-[#ccdaf9] flex justify-center items-center shadow-inner px-4 sm:px-6 md:px-10">
      <article className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 xl:gap-20">
        
        {/* LEFT CONTENT */}
        <div className="text-center lg:text-left">
          <h1 className="flex justify-center lg:justify-start text-4xl sm:text-5xl items-center gap-2 font-medium">
            <IoSchool className="text-blue-600" /> BootCamp
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 pt-4 max-w-[90%] sm:max-w-[500px] md:max-w-[650px] mx-auto lg:mx-0">
            Master technology skills with our comprehensive bootcamps and hands-on courses designed for the modern developer.
          </p>

          {/* FEATURES GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8 justify-items-center">
            <div className="bg-white p-5 w-[90%] sm:w-[280px] rounded-xl shadow">
              <LuBookOpen className="text-[#038903] text-xl" />
              <h1 className="font-medium">Expert-Led Courses</h1>
              <p className="text-gray-600 text-sm sm:text-base">Learn from industry professionals</p>
            </div>

            <div className="bg-white p-5 w-[90%] sm:w-[280px] rounded-xl shadow">
              <div className="flex">
                <FaLessThan className="text-[#53015f] text-xl" />
                <FaGreaterThan className="text-[#53015f] text-xl" />
              </div>
              <h1 className="font-medium">Hands-On Projects</h1>
              <p className="text-gray-600 text-sm sm:text-base">Build real-world applications</p>
            </div>

            <div className="bg-white p-5 w-[90%] sm:w-[280px] rounded-xl shadow">
              <TbUsers className="text-[orange] text-xl" />
              <h1 className="font-medium">Community Support</h1>
              <p className="text-gray-600 text-sm sm:text-base">Connect with fellow learners</p>
            </div>

            <div className="bg-white p-5 w-[90%] sm:w-[280px] rounded-xl shadow">
              <IoSchool className="text-[#2727ea] text-xl" />
              <h1 className="font-medium">Career Growth</h1>
              <p className="text-gray-600 text-sm sm:text-base">Advance your tech career</p>
            </div>
          </div>
        </div>

        {/* RIGHT FORM SECTION */}
        <form
          onSubmit={handleSubmit}
          className="w-[90%] sm:w-[400px] md:w-[450px] lg:w-[500px] px-4 py-8 rounded-xl bg-white backdrop-blur-2xl shadow-black shadow-2xl mt-10 lg:mt-0"
        >
          <h1 className="text-center text-xl md:text-2xl font-medium mb-6">Welcome Back</h1>
          <p className="text-center text-gray-500 mb-6 text-sm sm:text-base">
            Sign in to continue your learning journey
          </p>

          <div>
            <input
              className="w-full border border-gray-400 p-3 mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Enter your email *"
              required
              minLength={13}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              className="w-full border border-gray-400 p-3 mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Enter your password *"
              required
              minLength={7}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 cursor-pointer mb-4 rounded-xl text-center text-lg sm:text-xl font-medium bg-blue-700 text-white hover:bg-blue-900 transition-all"
          >
            Sign In
          </button>

          <div>
            <p
              className="text-center cursor-pointer text-blue-600 hover:underline text-sm sm:text-base"
              onClick={handleForgetPassword}
            >
              Forgot your password?
            </p>
          </div>

          <div className="text-center pt-5">
            <p className="text-gray-500 pb-3 text-sm sm:text-base">
              Don't have an account?
            </p>
            <Link className="font-medium cursor-pointer hover:text-blue-500" to="/register">
              Create Account
            </Link>
          </div>
        </form>
      </article>
    </section>
  </>
);

}

export default Login
