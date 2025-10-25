import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { LuBookOpen } from "react-icons/lu";
import { IoSchool } from "react-icons/io5";
import { FaLessThan } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa";
import { TbUsers } from "react-icons/tb";

const Registration = () => {
  let [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    avatar: "",
  });
  let { name, email, password, role, avatar } = formData;

  let navigate = useNavigate();
  let handleChange = (e) => {
    let { name, value, type } = e.target;
    setFormData({ ...formData, [name]: value })
  }
  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    let response = await fetch("http://localhost:5000/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    let data = await response.json();
    console.log(data)
    navigate("/login");

    toast("Registration Successful !!");
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "",
      avatar: "",
    });
  }
  return (
  <>
    {/* Responsive BootCamp Registration Section */}
    <section className="w-full min-h-screen bg-[#ccdaf9] flex justify-center items-center shadow-inner px-4 sm:px-6 md:px-10 py-10">
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
        <div className="w-full sm:w-[90%] md:w-[500px] lg:w-[480px]">
          <form
            onSubmit={handleSubmit}
            className="w-full px-5 sm:px-8 py-8 rounded-xl bg-white backdrop-blur-2xl shadow-black shadow-2xl"
          >
            <h1 className="text-center text-xl md:text-2xl font-medium mb-6">Join BootCamp</h1>
            <p className="text-center text-gray-500 mb-6 text-sm sm:text-base">
              Create an account to start learning
            </p>

            {/* Input Fields */}
            <div className="space-y-4">
              <input
                className="w-full border border-gray-400 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                name="name"
                id="name"
                value={name}
                placeholder="Enter Name *"
                required
                minLength={3}
                onChange={handleChange}
              />

              <input
                className="w-full border border-gray-400 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="email"
                name="email"
                id="email"
                value={email}
                placeholder="Enter Email *"
                required
                minLength={13}
                onChange={handleChange}
              />

              <input
                className="w-full border border-gray-400 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="password"
                name="password"
                id="password"
                value={password}
                placeholder="Enter Password *"
                required
                minLength={7}
                onChange={handleChange}
              />

              <select
                className="w-full border border-gray-400 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="role"
                id="role"
                value={role}
                required
                onChange={handleChange}
              >
                <option value="">Select Role *</option>
                <option value="user">User</option>
                <option value="publisher">Publisher</option>
              </select>

              <input
                className="w-full border border-gray-400 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="url"
                name="avatar"
                id="avatar"
                value={avatar}
                placeholder="Enter Avatar URL"
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 p-3 cursor-pointer rounded-xl text-center text-lg sm:text-xl font-medium bg-blue-700 text-white hover:bg-blue-900 transition-all"
            >
              Create Account
            </button>

            {/* Footer Links */}
            <div className="text-center mt-6 text-sm">
              <p className="text-gray-500 pb-3">Already have an account?</p>
              <Link className="font-medium hover:text-blue-500" to="/">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </article>
    </section>
  </>
);

}

export default Registration
