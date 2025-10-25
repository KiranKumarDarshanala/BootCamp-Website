import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MyContext } from '../context/GlobalContext';
import { toast } from 'react-toastify';
import { FaHandPointRight } from "react-icons/fa";
import { FaArrowLeft } from 'react-icons/fa6';
import { MdOutlineCurrencyRupee } from "react-icons/md";

const CourseProfile = () => {
    let location = useLocation();
    let { courses, user } = useContext(MyContext);
    // console.log(location.state);
    let { title, duration, description, price, minimumSkill, scholarshipAvailable, image } = location?.state;

    let handleEnrole = () => {
        if (confirm("Are you ready to enrole the course ?")) {
            toast.success(`You are enroled the course ${title} !! `)
        } else {
            toast("Course Enrole cancelled.!!");
        }
    }




   return (
  <section className="w-full px-2 sm:px-4 py-4">
    {/* Header */}
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <Link
        to="/layout"
        state={location.state}
        className="text-xl rounded-full p-2 sm:p-3 flex items-center hover:text-blue-500 hover:bg-blue-300 transition-all"
      >
        <FaArrowLeft />
      </Link>
      <h1 className="text-xl sm:text-2xl font-bold">Course Information</h1>
    </div>

    {/* Course Card */}
    <div className="w-full">
      {location.length === undefined ? (
        <div className="w-full border border-gray-400 rounded-3xl p-4 sm:p-6 shadow-lg bg-white flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Course Image */}
          <img
            className="w-full sm:w-1/3 border border-gray-200 bg-blue-100 rounded-3xl h-[300px] object-contain"
            src={image}
            alt={title}
            loading="lazy"
          />

          {/* Course Details */}
          <div className="flex flex-col flex-1 gap-2">
            <p className="text-gray-500 text-sm sm:text-base">Title :</p>
            <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>

            <p className="text-gray-500 text-sm sm:text-base">Description :</p>
            <p className="text-sm sm:text-base">{description}</p>

            <p className="text-gray-500 text-sm sm:text-base">More Details :</p>
            <h3 className="flex gap-2 items-center text-sm sm:text-base">
              <FaHandPointRight />
              It's a <b>{duration}</b> program
            </h3>
            <p className="flex gap-2 items-center text-sm sm:text-base">
              <FaHandPointRight />
              This course costs <b className="flex items-center"><MdOutlineCurrencyRupee className="relative left-1" />{price}</b>
            </p>
            <p className="flex gap-2 items-center text-sm sm:text-base">
              <FaHandPointRight /> It is a <b>{minimumSkill}</b> course
            </p>
            <p className="flex gap-2 items-center text-sm sm:text-base">
              <FaHandPointRight /> This course {scholarshipAvailable ? "provides Scholarship" : "does not provide Scholarship"}
            </p>

            {/* Enroll Button */}
            <div className="flex justify-end mt-4">
              <button
                className="text-lg sm:text-xl px-4 sm:px-6 py-2 border border-gray-400 hover:bg-blue-400 hover:text-white transition-all rounded-2xl"
                onClick={handleEnrole}
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  </section>
);

}

export default CourseProfile
