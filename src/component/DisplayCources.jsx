import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../context/GlobalContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowLeft } from "react-icons/fa6";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { IoPlayOutline } from "react-icons/io5";
import { GoBook } from "react-icons/go";

const DisplayCources = () => {
  let { user, token, displayCourses, setDisplayCourses } = useContext(MyContext);
  // let [displaycourse, setdisplaycourse] = useState();


  let location = useLocation();
  // console.log(location.state);
  let { courses, id } = location.state;

  let navigate = useNavigate();

  let handleDelete = async (course) => {
    // console.log(course._id);
    if (confirm("Confirm again to delete the Course..")) {
      let result = await fetch(`http://localhost:5000/api/v1/courses/${course._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await result.json();
      // console.log(data);
      if (data.success) {
        toast.success("Deleted successfull !!");
        navigate("/layout");
      } else {
        toast.error(`${data.error}`);
      }
    } else {
      toast.error("Delete Canceled..");
    }
  }
  let handleDeleteBootCamp = async (id) => {
    console.log(id);
    if (confirm("Confirm again to delete the Boot camp..")) {
      let result = await fetch(`http://localhost:5000/api/v1/bootcamps/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await result.json();
      // console.log(data);
      if (data.success) {
        toast.success("Deleted successfull !!");
        navigate("/layout");
      } else {
        toast.error(`${data.error}`);
      }
    } else {
      toast.error("Delete Canceled..");
    }
  }

  return (
  <>
    <section className="w-full bg-white px-2 sm:px-4 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Link
            to="/layout"
            className="text-xl rounded-full p-2 sm:p-3 flex items-center hover:text-blue-500 hover:bg-blue-300 transition-all"
          >
            <FaArrowLeft />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold">Bootcamp Details</h1>
        </div>

        {/* Bootcamp Cover */}
        <div
          className={`w-full border h-[350px] sm:h-[350px] bg-black text-white bg-[url(${location.state.photo})] rounded-t-2xl flex items-end pb-10`}
        >
          <div className="pl-2 sm:pl-10">
            <div className="text-xs w-fit p-1 pl-2 pr-2 rounded-xl bg-[#ffffff80] mb-2">
              <p>{location.state.courses.length} Courses</p>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold">{location.state.name}</h1>
            <p className="w-full sm:w-[80%] text-sm sm:text-xl">{location.state.description}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="border border-gray-200 rounded-b-2xl h-auto sm:h-[70px] flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-5 p-3 sm:p-5 justify-end">
          {user !== "user" && (
            <>
              <Link
                className="flex items-center gap-1 border border-gray-200 p-2 rounded hover:text-blue-500 hover:bg-blue-200 transition-all"
                to="/layout/editBootCamp"
                state={location.state}
              >
                <BiEdit />
                Edit Bootcamp
              </Link>
              <button
                className="text-red-600 flex items-center gap-1 border border-gray-200 p-2 rounded hover:bg-red-200 transition-all"
                onClick={() => handleDeleteBootCamp(location.state.id)}
              >
                <RiDeleteBinLine />
                Delete Bootcamp
              </button>
            </>
          )}
        </div>

        {/* Courses Header */}
        <div className="flex flex-wrap justify-between mt-5 mb-5 items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-bold">Courses</h1>
          {user === "publisher" && (
            <Link
              className="flex items-center gap-2 sm:gap-4 text-lg sm:text-xl p-2 text-white bg-[#0da10d] rounded-xl hover:bg-green-600 transition-all"
              to="/layout/addCources"
              state={location.state}
            >
              <FaPlus />
              Add Course
            </Link>
          )}
        </div>

        {/* Courses List */}
        <div className="flex flex-col gap-5">
          {courses?.length > 0 ? (
            courses.map((course, index) => {
              const {
                title,
                duration,
                description,
                price,
                minimumSkill,
                scholarshipAvailable,
                image,
                id,
              } = course;

              return (
                <div
                  key={index}
                  className="bg-white border border-gray-300 rounded-3xl shadow-lg p-4 flex flex-col sm:flex-row gap-4 sm:gap-10"
                >
                  {/* Course Image */}
                  {image ? (
                    <img
                      src={image}
                      alt={title}
                      className="w-full sm:w-[300px] h-[200px] object-contain rounded-2xl bg-blue-200"
                    />
                  ) : (
                    <div className="w-full sm:w-[300px] h-[200px] bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}

                  {/* Course Info */}
                  <div className="flex-1 flex flex-col">
                    <h2 className="text-lg sm:text-xl font-bold mb-2">{title}</h2>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3">{description}</p>

                    <div className="flex flex-wrap gap-3 sm:gap-5 mb-4">
                      <p className="flex items-center gap-1 text-gray-600"><IoPlayOutline /> Interactive lessons</p>
                      <p className="flex items-center gap-1 text-gray-600"><GoBook /> Hands-on projects</p>
                    </div>

                    <div className="flex flex-wrap sm:flex-nowrap justify-between gap-2">
                      <Link
                        to="/layout/displayCources/courseProfile"
                        state={course}
                        className="text-lg sm:text-2xl text-white py-2 px-4 sm:px-6 bg-blue-500 rounded-xl hover:bg-blue-600 transition-all text-center"
                      >
                        Know More
                      </Link>

                      {user === "publisher" && (
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                          <Link
                            state={course}
                            to="/layout/editCource"
                            className="flex items-center gap-1 border border-gray-200 p-2 rounded hover:text-blue-500 hover:bg-blue-200 transition-all"
                          >
                            <BiEdit />
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(course)}
                            className="text-red-600 flex items-center gap-1 border border-gray-200 p-2 rounded hover:bg-red-200 transition-all"
                          >
                            <RiDeleteBinLine />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center h-80">
              <h1 className="text-center text-gray-500 text-xl">No courses available.</h1>
            </div>
          )}
        </div>
      </div>
    </section>
  </>
);

}

export default DisplayCources
