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
      {/* Responsive */}
      <section className='w-full min-h-screen bg-[#ccdaf9] flex justify-center items-center shadow-inner px-2'>
        <article className='flex items-center gap-[50px]'>
          <div>
            <div>
              <h1 className='flex text-5xl items-center gap-1 font-medium'><IoSchool className='text-blue-600' /> BootCamp</h1>
              <p className='text-xl text-[gray] pt-[20px] w-[650px]'>Master technology skills with our comprehensive bootcamps and hands-on courses designed for the modern developer.</p>
            </div><br />
            <div className='grid grid-cols-2 gap-5'>
              <div className='bg-white p-5 w-[300px] rounded-xl shadow'>
                <LuBookOpen className='text-[#038903] text-xl' />
                <h1 className='font-medium'>Expert-Led Courses</h1>
                <p className='text-gray-600'>Learn from industry professionals</p>
              </div>

              <div className='bg-white p-5 w-[300px] rounded-xl shadow'>
                <div className='flex'>
                  <FaLessThan className='text-[#53015f] text-xl' />
                  <FaGreaterThan className='text-[#53015f] text-xl' />
                </div>
                <h1>Hands-On Projects</h1>
                <p>Build real-world applications</p>
              </div>

              <div className='bg-white p-5 w-[300px] rounded-xl shadow'>
                <TbUsers className='text-[orange] text-xl' />
                <h1>Community Support</h1>
                <p>Connect with fellow learners</p>
              </div>

              <div className='bg-white p-5 w-[300px] rounded-xl shadow'>
                <IoSchool className='text-[#2727ea] text-xl' />
                <h1>Career Growth</h1>
                <p>Advance your tech career</p>
              </div>
            </div>
          </div>








          <div className="w-full max-w-md">
            <form
              onSubmit={handleSubmit}
              className='w-[500px] px-4 py-8 rounded-xl bg-white backdrop-blur-2xl shadow-black shadow-2xl'
            >
              <h1 className='text-center text-xl font-medium  mb-6'>Join BootCamp</h1>
              <p className='text-center   text-[gray] mb-6'>Create an account to start learning</p>

              <div className="mb-4">
                <input
                  className='w-full border border-gray-400 p-3 rounded-xl'
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  placeholder="Enter Name *"
                  required
                  minLength={3}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <input
                  className='w-full border border-gray-400 p-3 rounded-xl'
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  placeholder="Enter Email *"
                  required
                  minLength={13}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <input
                  className='w-full border border-gray-400 p-3 rounded-xl'
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  placeholder="Enter Password *"
                  required
                  minLength={7}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <select
                  className='w-full border border-gray-400 p-3 rounded-xl'
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
              </div>

              <div className="mb-6">
                <input
                  className='w-full border border-gray-400 p-3 rounded-xl'
                  type="url"
                  name="avatar"
                  id="avatar"
                  value={avatar}
                  placeholder="Enter Avatar URL"
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className='w-full p-3 mb-4 rounded-xl text-center text-xl font-medium bg-blue-700 text-white hover:bg-blue-900 transition-all'
              >
                Create Account
              </button>

              <div className="text-center mt-4 text-sm">
                <p className='text-gray-500 pb-5'>Already have an account?</p>
                  <Link
                    className='pt-5 font-medium hover:text-blue-500'
                    to="/"
                  >
                    Sign In
                  </Link>
              </div>
            </form>
          </div>
        </article>
      </section>
    </>
  )
}

export default Registration
