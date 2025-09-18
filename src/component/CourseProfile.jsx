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
        <section className="p-4">
            {/* Responsive */}
            <br />
            <div className="flex items-center gap-4 mb-6">
                <Link
                    to="/layout"
                    state={location.state}
                    className="text-xl rounded-full p-3 flex items-center hover:text-blue-500 hover:bg-blue-300 transition-all"
                >
                    <FaArrowLeft />
                </Link>
                <h1 className="text-2xl font-bold">Course Information</h1>
            </div>


            <div className="w-full p-4">
                {location.length === undefined ? (
                    <div className="w-full pl-5 border border-gray-400 rounded-3xl p-4 shadow-2xl bg-white items-center gap-6 shadow-white">
                        <img
                            className="w-full border border-gray-200 bg-blue-100 rounded-3xl h-[300px] object-contain"
                            src={image}
                            alt={title}
                            loading="lazy"
                        />
                        <div className="flex flex-col flex-1">
                            <p className='text-gray-500'>Title :</p>
                            <h1 className="text-2xl font-bold">{title}</h1>
                            <p className='text-gray-500'>Description :</p>
                            <p className="p-1">{description}</p>
                            <p className='text-gray-500'>More Details :</p>
                            <h3 className="flex gap-2 items-center"><FaHandPointRight />It's a<b>{duration}</b>program</h3>
                            <p className='flex gap-2 items-center relative'><FaHandPointRight />This course cost <b className='flex items-center'><MdOutlineCurrencyRupee className='relative left-1'/>{price}</b></p>
                            <p className='flex gap-3 items-center'><FaHandPointRight />It is fully<b>{minimumSkill}</b>course</p>
                            <p className='flex gap-3 items-center'><FaHandPointRight />This courese {scholarshipAvailable?"provide Scholarship":"not provide Scholarship"}</p>

                            <br />
                            <div className='flex justify-end'>
                                <button
                                    className="text-2xl px-6 py-1 border border-gray-400 hover:bg-blue-400 hover:text-white transition-all rounded-[20px]"
                                    onClick={handleEnrole}
                                >
                                    Enrole Now
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </section>

    )
}

export default CourseProfile
