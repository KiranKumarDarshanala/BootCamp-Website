import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { MyContext } from '../context/GlobalContext';
import { LuSave } from 'react-icons/lu';
import { FaArrowLeft } from 'react-icons/fa6';

const EditBootCamp = () => {
  let location = useLocation();
  // console.log(location.state.id);
  let { token } = useContext(MyContext);

  let navigate = useNavigate();
  let [formData, setFormData] = useState({
    name: location.state.name,
    email: location.state.email,
    website: location.state.website,
    careers: location.state.careers,
    photo: location.state.photo,
    description: location.state.description,
    address: location.state.address,
  });
  let { name, email, website, careers, photo, description, address } = formData;





  let handleChange = (e) => {
    let { name, value, type } = e.target;
    setFormData({ ...formData, [name]: value })
  }
  let handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ name, email, website, careers, photo, description, address });
    let result = await fetch(`http://localhost:5000/api/v1/bootcamps/${location.state.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    let data = await result.json();
    // toast.success("BootCamp Updated Successful !!");
    console.log(data);
    if (data.success) {
      toast.success(`${data.success ? "Updated Successfull" : "Something went wrong!!!"}`);
      navigate("/layout");
      setFormData({
        name: "",
        email: "",
        website: "",
        careers: "",
        photo: "",
        description: "",
        address: "",
      });
    } else {
      toast.error(`${data.error}`);
    }

  }
 return (
  <>
    <section className="w-full min-h-screen px-2 sm:px-4 md:px-6 py-4 sm:py-6 bg-gray-50">
      <div className="w-full sm:max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
          <Link
            to="/layout"
            className="text-xl rounded-full p-2 sm:p-3 flex items-center hover:text-blue-500 hover:bg-blue-300 transition-all"
          >
            <FaArrowLeft />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold">Update BootCamp</h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full bg-white/40 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-lg"
        >
          <h1 className="font-bold text-lg sm:text-xl mb-2">Bootcamp Information</h1>
          <p className="text-gray-600 text-sm sm:text-base mb-4">
            Provide basic information about your bootcamp to help students understand what they'll learn.
          </p>

          {/* Bootcamp Title */}
          <label htmlFor="name" className="font-bold">Bootcamp Title *</label>
          <input
            className="w-full border p-2 sm:p-3 mt-1 mb-4 rounded-xl text-sm sm:text-base"
            type="text"
            name="name"
            id="name"
            required
            value={name}
            placeholder="e.g., Full Stack Web Development"
            onChange={handleChange}
          />

          {/* Email */}
          <label htmlFor="email" className="font-bold">Email *</label>
          <input
            className="w-full border p-2 sm:p-3 mt-1 mb-4 rounded-xl text-sm sm:text-base"
            type="email"
            name="email"
            id="email"
            required
            value={email}
            placeholder="example@gmail.com"
            onChange={handleChange}
          />

          {/* Description */}
          <label htmlFor="description" className="font-bold">Description *</label>
          <textarea
            className="w-full border p-2 sm:p-3 mt-1 mb-4 rounded-xl resize-none text-sm sm:text-base"
            name="description"
            value={description}
            required
            placeholder="Describe what students will learn in this bootcamp..."
            onChange={handleChange}
            id="description"
            rows={4}
          />

          {/* Website */}
          <label htmlFor="website" className="font-bold">Website *</label>
          <input
            className="w-full border p-2 sm:p-3 mt-1 mb-4 rounded-xl text-sm sm:text-base"
            type="text"
            name="website"
            id="website"
            value={website}
            required
            placeholder="Provide your website URL..."
            onChange={handleChange}
          />

          {/* Address */}
          <label htmlFor="address" className="font-bold">Address</label>
          <textarea
            className="w-full border p-2 sm:p-3 mt-1 mb-4 rounded-xl resize-none text-sm sm:text-base"
            name="address"
            value={address}
            placeholder="Enter the address of institute..."
            onChange={handleChange}
            id="address"
            rows={3}
          />

          {/* Careers */}
          <label htmlFor="careers" className="font-bold">Careers *</label>
          <select
            className="w-full border p-2 sm:p-3 mt-1 mb-4 rounded-xl text-sm sm:text-base"
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

          {/* Cover Image URL */}
          <label htmlFor="photo" className="font-bold">Cover Image URL</label>
          <input
            className="w-full border p-2 sm:p-3 mt-1 mb-6 rounded-xl text-sm sm:text-base"
            type="url"
            name="photo"
            id="photo"
            value={photo}
            placeholder="https://example.com/image.jpg"
            onChange={handleChange}
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <Link
              to="/layout"
              className="border flex justify-center items-center pl-3 pr-3 font-bold rounded border-gray-400 hover:bg-blue-100 hover:text-blue-400 transition-all text-sm sm:text-base"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="border flex justify-center items-center p-2 sm:p-3 gap-3 sm:gap-5 bg-blue-300 text-white rounded-xl text-center font-medium text-sm sm:text-base"
            >
              <LuSave />
              Update BootCamp
            </button>
          </div>
        </form>
      </div>
    </section>
  </>
);

}

export default EditBootCamp
