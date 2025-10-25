import React, { useState } from 'react'
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { MyContext } from '../context/GlobalContext';
import { FaArrowLeft } from 'react-icons/fa6';
import { LuSave } from 'react-icons/lu';

const CreateBootCamp = () => {
  let { token } = useContext(MyContext);

  let navigate = useNavigate();

  let [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    careers: "web development",
    photo: "",
    description: "",
    address: "",
  });

  let { name, email, website, careers, photo, description, address } = formData;

  let handleChange = (e) => {
    let { name, value, type } = e.target;
    setFormData({ ...formData, [name]: value })
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch("http://localhost:5000/api/v1/bootcamps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    let data = await response.json();
    console.log(data);

    if (data.success) {
      toast.success(` ${data.message}`);
      navigate("/layout");
      setFormData({
        name: "",
        email: "",
        website: "",
        careers: "web development",
        photo: "",
        description: "",
        address: "",
      });
    } else {
      toast.error(`${data.error}`);
    }


  };

 return (
  <>
    <section className="w-full min-h-screen p-4 sm:p-6 md:p-10 bg-[#f9f9f9]">
      <div className="w-full pl-0 sm:pl-[100px] lg:pl-[200px]">
        
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
          <Link
            to="/layout"
            className="text-lg sm:text-xl rounded-full p-2 sm:p-3 flex items-center hover:text-blue-500 hover:bg-blue-300 transition-all"
          >
            <FaArrowLeft />
          </Link>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Create BootCamp</h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full bg-white/40 backdrop-blur-md rounded-xl p-4 sm:p-6 md:p-8 shadow-lg"
        >
          <h1 className="font-bold text-lg sm:text-xl">Bootcamp Information</h1>
          <p className="text-gray-600 text-sm sm:text-base mb-4">
            Provide basic information about your bootcamp to help students understand what they'll learn.
          </p>

          <label htmlFor="name" className="font-semibold text-sm sm:text-base">Bootcamp Title *</label>
          <input
            className="w-full border p-3 mt-1 mb-4 rounded-xl text-sm sm:text-base focus:outline-blue-300"
            type="text"
            name="name"
            id="name"
            required
            value={name}
            placeholder="e.g., Full Stack Web Development"
            onChange={handleChange}
          />

          <label htmlFor="email" className="font-semibold text-sm sm:text-base">Email *</label>
          <input
            className="w-full border mt-1 p-3 mb-4 rounded-xl text-sm sm:text-base focus:outline-blue-300"
            type="email"
            name="email"
            id="email"
            required
            value={email}
            placeholder="example@gmail.com"
            onChange={handleChange}
          />

          <label htmlFor="description" className="font-semibold text-sm sm:text-base">Description *</label>
          <textarea
            className="w-full border mt-1 p-3 mb-4 rounded-xl resize-none text-sm sm:text-base focus:outline-blue-300"
            name="description"
            value={description}
            required
            placeholder="Describe what students will learn in this bootcamp..."
            onChange={handleChange}
            id="description"
            rows={4}
          />

          <label htmlFor="website" className="font-semibold text-sm sm:text-base">Website *</label>
          <input
            className="w-full border mt-1 p-3 mb-4 rounded-xl text-sm sm:text-base focus:outline-blue-300"
            type="text"
            name="website"
            id="website"
            value={website}
            required
            placeholder="Provide your website url.."
            onChange={handleChange}
          />

          <label htmlFor="address" className="font-semibold text-sm sm:text-base">Address</label>
          <textarea
            className="w-full border mt-1 p-3 mb-4 rounded-xl resize-none text-sm sm:text-base focus:outline-blue-300"
            name="address"
            value={address}
            placeholder="Enter the address of institute.... "
            onChange={handleChange}
            id="address"
            rows={3}
          />

          <label htmlFor="careers" className="font-semibold text-sm sm:text-base">Careers *</label>
          <select
            className="w-full border mt-1 p-3 mb-4 rounded-xl text-sm sm:text-base focus:outline-blue-300"
            name="careers"
            id="careers"
            required
            onChange={handleChange}
            value={careers}
          >
            <option value="web development">Web Development</option>
            <option value="react development">React Development</option>
            <option value="java development">Java Development</option>
            <option value="python development">Python Development</option>
            <option value="ux/ui development">UX/UI Development</option>
            <option value="business">Business</option>
            <option value="others">Others</option>
          </select>

          <label htmlFor="photo" className="font-semibold text-sm sm:text-base">Cover Image URL</label>
          <input
            className="w-full border mt-1 p-3 mb-6 rounded-xl text-sm sm:text-base focus:outline-blue-300"
            type="url"
            name="photo"
            id="photo"
            value={photo}
            placeholder="https://example.com/image.jpg"
            onChange={handleChange}
          />

          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
            <Link
              to="/layout"
              className="border flex justify-center items-center px-4 py-2 font-semibold rounded border-gray-400 hover:bg-blue-100 hover:text-blue-400 transition-all"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="border flex justify-center items-center px-4 py-2 gap-2 bg-blue-400 hover:bg-blue-500 text-white rounded-xl font-medium transition-all"
            >
              <LuSave />
              Create BootCamp
            </button>
          </div>
        </form>
      </div>
    </section>
  </>
);

}

export default CreateBootCamp
