import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { MyContext } from '../context/GlobalContext';
import { FaArrowLeft } from 'react-icons/fa6';
import { LuSave } from 'react-icons/lu';

const CreateCources = () => {
  let location = useLocation();
  let { token } = useContext(MyContext);

  let navigate = useNavigate();
  let [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    price: "",
    image: "",
    minimumSkill: "beginner",
    scholarshipAvailable: "",
  });
  let { title, duration, price, minimumSkill, image, description, scholarshipAvailable } = formData;

  let handleChange = (e) => {
    let { name, value, type } = e.target;
    setFormData({ ...formData, [name]: value })
  }
  let handleSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch(`http://localhost:5000/api/v1/bootcamps/${location.state.id}/courses`, {
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
      toast.success(`${data.message}`);
      navigate("/layout");
      setFormData({
        title: "",
        duration: "",
        price: "",
        minimumSkill: "beginner",
        image: "",
        description: "",
        scholarshipAvailable: false,
      });
    } else {
      toast.error(`${data.error}`);
    }

  }
 return (
  <>
    <section className="w-full min-h-screen px-2 sm:px-4 md:px-6 py-4 sm:py-6 bg-gray-50">
      <div className="w-full sm:max-w-3xl md:max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
          <Link
            to="/layout"
            className="text-xl rounded-full p-2 sm:p-3 flex items-center hover:text-blue-500 hover:bg-blue-300 transition-all"
          >
            <FaArrowLeft />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold">Create Course</h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full bg-white/40 backdrop-blur-2xl rounded-xl shadow-lg p-4 sm:p-6"
        >
          <h1 className="font-bold text-lg sm:text-xl mb-2">Course Information</h1>
          <p className="text-gray-600 text-sm sm:text-base mb-4">
            Provide basic information about your course to help students understand what they'll learn.
          </p>

          {/* Course Title */}
          <label htmlFor="title" className="font-bold">Course Title *</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleChange}
            placeholder="Enter Course title *"
            className="w-full border p-2 sm:p-3 mt-1 mb-4 rounded-xl text-sm sm:text-base focus:outline-emerald-500"
            required
          />

          {/* Description */}
          <label htmlFor="description" className="font-bold">Description *</label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={handleChange}
            placeholder="Enter Course description"
            className="w-full border p-2 sm:p-3 mt-1 mb-4 rounded-xl text-sm sm:text-base focus:outline-emerald-500 resize-none"
            rows={4}
          />

          {/* Duration */}
          <label htmlFor="duration" className="font-bold">Duration *</label>
          <input
            type="text"
            name="duration"
            id="duration"
            value={duration}
            onChange={handleChange}
            placeholder="Enter Course duration *"
            className="w-full border p-2 sm:p-3 mt-1 mb-4 rounded-xl text-sm sm:text-base focus:outline-emerald-500"
            required
          />

          {/* Price */}
          <label htmlFor="price" className="font-bold">Price *</label>
          <input
            type="text"
            name="price"
            id="price"
            value={price}
            onChange={handleChange}
            placeholder="Enter Course price *"
            className="w-full border p-2 sm:p-3 mt-1 mb-4 rounded-xl text-sm sm:text-base focus:outline-emerald-500"
            required
          />

          {/* Image URL */}
          <label htmlFor="image" className="font-bold">Cover Image URL</label>
          <input
            type="url"
            name="image"
            id="image"
            value={image}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="w-full border p-2 sm:p-3 mt-1 mb-4 rounded-xl text-sm sm:text-base focus:outline-emerald-500"
          />

          {/* Skill Type */}
          <label htmlFor="minimumSkill" className="font-bold">Skill Type *</label>
          <select
            name="minimumSkill"
            id="minimumSkill"
            onChange={handleChange}
            className="w-full border p-2 sm:p-3 mt-1 mb-4 rounded-xl text-sm sm:text-base focus:outline-emerald-500"
            defaultValue="beginner"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          {/* Scholarship */}
          <fieldset className="mb-6 border border-gray-300 rounded-xl p-4">
            <legend className="font-bold mb-2">Scholarship Available</legend>
            <label className="inline-flex items-center mr-6">
              <input
                type="radio"
                name="scholarshipAvailable"
                value="true"
                onChange={handleChange}
                className="mr-2"
              />
              Yes
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="scholarshipAvailable"
                value="false"
                onChange={handleChange}
                className="mr-2"
              />
              No
            </label>
          </fieldset>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <Link
              to="/layout/displayCources"
              state={location.state}
              className="border flex justify-center items-center pl-3 pr-3 font-bold rounded border-gray-400 hover:bg-blue-100 hover:text-blue-400 transition-all text-sm sm:text-base"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="border flex justify-center items-center p-2 sm:p-3 gap-3 sm:gap-5 bg-blue-300 text-white rounded-xl text-center font-medium text-sm sm:text-base"
            >
              <LuSave />
              Create Course
            </button>
          </div>
        </form>
      </div>
    </section>
  </>
);

}

export default CreateCources
