import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { MyContext } from '../context/GlobalContext';
import { FaArrowLeft } from 'react-icons/fa6';
import { LuSave } from 'react-icons/lu';
const EditCource = () => {
  let { user, setUser,token } = useContext(MyContext);
  let location = useLocation();

  let navgate = useNavigate();
  let [formData, setFormData] = useState({
    title: location.state.title,
    description: location.state.description,
    duration: location.state.duration,
    price: location.state.price,
    image: location.state.image,
    minimumSkill: location.state.minimumSkill,
    scholarshipAvailable: location.state.scholarshipAvailable,
  });
  let { title, duration, price, minimumSkill, image, description, scholarshipAvailable } = formData;
  // console.log(location)

  let handleChange = (e) => {
    let { name, value, type } = e.target;
    setFormData({ ...formData, [name]: value })
  }
  let handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ title, duration, price, minimumSkill, image, description, scholarshipAvailable });

    let result = await fetch(`http://localhost:5000/api/v1/courses/${location.state._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    let data = await result.json();
    // console.log(data);
    if (data.success == true) {
      toast.success("Cources Updated Successful !!");
      setFormData({
        title: "",
        duration: "",
        price: "",
        minimumSkill: "beginner",
        image: "",
        description: "",
        scholarshipAvailable: "",
      });
      navgate("/layout");
    } else {
      toast.error(`${data.error}`);
    }

  }
 return (
  <>
    <section className="w-full min-h-screen px-2 sm:px-4 py-4">
      <div className="w-full sm:pl-[200px] max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Link
            to="/layout"
            className="text-xl rounded-full p-2 sm:p-3 flex items-center hover:text-blue-500 hover:bg-blue-300 transition-all"
          >
            <FaArrowLeft />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold">Update Course</h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-30 backdrop-blur-2xl rounded-xl shadow-lg p-4 sm:p-6"
        >
          <h1 className="font-bold text-lg sm:text-xl mb-2">Course Information</h1>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            Provide basic information about your course to help students understand what they'll learn.
          </p>

          <label htmlFor="title" className="font-bold">Course Title *</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleChange}
            placeholder="Enter Course title *"
            className="w-full border mt-1 p-3 mb-4 rounded-xl focus:outline-emerald-500"
            required
          />

          <label htmlFor="description" className="font-bold">Description *</label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={handleChange}
            placeholder="Enter Course description"
            className="w-full border mt-1 p-3 mb-4 rounded-xl focus:outline-emerald-500 resize-none"
            rows={4}
          />

          <label htmlFor="duration" className="font-bold">Duration *</label>
          <input
            type="text"
            name="duration"
            id="duration"
            value={duration}
            onChange={handleChange}
            placeholder="Enter Course duration *"
            className="w-full border mt-1 p-3 mb-4 rounded-xl focus:outline-emerald-500"
            required
          />

          <label htmlFor="price" className="font-bold">Price *</label>
          <input
            type="text"
            name="price"
            id="price"
            value={price}
            onChange={handleChange}
            placeholder="Enter Course price *"
            className="w-full border mt-1 p-3 mb-4 rounded-xl focus:outline-emerald-500"
            required
          />

          <label htmlFor="image" className="font-bold">Cover Image URL</label>
          <input
            type="url"
            name="image"
            id="image"
            value={image}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="w-full border mt-1 p-3 mb-4 rounded-xl focus:outline-emerald-500"
          />

          <label htmlFor="minimumSkill" className="font-bold">Skill Type *</label>
          <select
            name="minimumSkill"
            id="minimumSkill"
            onChange={handleChange}
            className="w-full border mt-1 p-3 mb-4 rounded-xl focus:outline-emerald-500"
            defaultValue="beginner"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <fieldset className="mb-6 border border-gray-300 rounded-xl p-4">
            <legend className="font-bold mb-2">Scholarship Available</legend>
            <label className="inline-flex items-center mr-6">
              <input
                type="radio"
                name="scholarshipAvailable"
                value="true"
                defaultChecked={scholarshipAvailable === true}
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
                defaultChecked={scholarshipAvailable === false}
                onChange={handleChange}
                className="mr-2"
              />
              No
            </label>
          </fieldset>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <Link
              to="/layout"
              state={location.state}
              className="border flex items-center justify-center py-2 px-4 font-bold rounded border-gray-400 hover:bg-blue-100 hover:text-blue-400 transition-all w-full sm:w-auto text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="border flex items-center justify-center p-2 gap-3 sm:gap-5 bg-blue-300 text-white rounded-xl text-center font-medium w-full sm:w-auto"
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

export default EditCource
