import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../context/GlobalContext'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from './Loader';
import { FaPlus } from 'react-icons/fa';
import { LuBookOpen } from 'react-icons/lu';
import { FaArrowTrendUp } from "react-icons/fa6";
import { TbUsers } from 'react-icons/tb';
import { MdAccessTime } from "react-icons/md";

const DisplayBootCamps = () => {
    // let location = useLocation();
    // console.log(location.state.id);
    let [bootCamps, setBootCamps] = useState();
    let [bootCampCount, setBootcampcount] = useState(0);
    let [courseCount, setCoursecount] = useState(0);
    let { token, userName, user } = useContext(MyContext);
    let navigate = useNavigate();

    useEffect(() => {
        let fetchBootcamp = async () => {
            let response = await fetch("http://localhost:5000/api/v1/bootcamps");
            let data = await response.json();
            console.log(data.data);
            setBootCamps(data.data);
            setBootcampcount(data.data.length);
        }
        fetchBootcamp();
    }, []);

    let handleDelete = async (id) => {
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
            {/* Header Section */}
            <div className="border border-blue-400 bg-blue-100 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
                        Welcome back, {userName} 👋
                    </h1>
                </div>

                {user === "publisher" && (
                    <div>
                        <NavLink
                            className="flex items-center justify-center gap-2 bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition-all"
                            to="/layout/addBootCamp"
                        >
                            <FaPlus className="text-lg" />
                            <span className="text-sm sm:text-base">Create BootCamp</span>
                        </NavLink>
                    </div>
                )}
            </div>

           {/* Dashboard Stats Section */}
<section className="w-[90vw]  bg-[#f9f9f9] p-4 sm:p-5 overflow-x-auto scrollbar-hide ">
  <div
    className="
      flex 
      sm:flex-row 
      flex-nowrap 
      justify-start 
      sm:justify-evenly 
      items-center 
      gap-4 sm:gap-6 md:gap-10
      overflow-x-auto sm:overflow-x-visible 
      snap-x snap-mandatory 
      scrollbar-hide 
      scroll-smooth
      px-2 sm:px-0
    "
  >
    {/* Card 1 */}
    <div className="snap-center shrink-0 border border-gray-200 rounded-2xl shadow h-[110px] sm:h-[130px] w-[85vw] sm:w-[280px] md:w-[300px] flex items-center pl-5 gap-4 bg-white">
      <LuBookOpen className="text-[#2364d6] p-2 bg-blue-200 rounded-xl w-[40px] h-[40px]" />
      <div>
        <p className="text-gray-700 text-sm sm:text-base">Total Bootcamps</p>
        <h1 className="text-xl sm:text-2xl font-bold">{bootCampCount}</h1>
      </div>
    </div>

    {/* Card 2 */}
    <div className="snap-center shrink-0 border border-gray-200 rounded-2xl shadow h-[110px] sm:h-[130px] w-[85vw] sm:w-[280px] md:w-[300px] flex items-center pl-5 gap-4 bg-white">
      <FaArrowTrendUp className="text-[#26d623] p-2 bg-green-200 rounded-xl w-[40px] h-[40px]" />
      <div>
        <p className="text-gray-700 text-sm sm:text-base">Total Courses</p>
        <h1 className="text-xl sm:text-2xl font-bold">{courseCount}</h1>
      </div>
    </div>

    {/* Card 3 */}
    <div className="snap-center shrink-0 border border-gray-200 rounded-2xl shadow h-[110px] sm:h-[130px] w-[85vw] sm:w-[280px] md:w-[300px] flex items-center pl-5 gap-4 bg-white">
      <TbUsers className="text-[#b223d6] p-2 bg-violet-200 rounded-xl w-[40px] h-[40px]" />
      <div>
        <p className="text-gray-700 text-sm sm:text-base">Active Students</p>
        <h1 className="text-xl sm:text-2xl font-bold">1,743</h1>
      </div>
    </div>
  </div>
</section>




            {/* Bootcamps Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-6 py-3">
                <h1 className="text-lg sm:text-xl font-bold">All Bootcamps</h1>
                <p className="text-gray-500 text-sm sm:text-base">
                    {bootCampCount} bootcamps available
                </p>
            </div>

            {/* Bootcamp Cards Section */}
            <section className="w-full max-w-full mx-auto bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 p-4 sm:p-6">
                {bootCamps?.length > 0 ? (
                    bootCamps.map((element) => {
                        const { name, email, website, photo, id } = element;
                        return (
                            <div
                                key={id}
                                className="overflow-hidden border border-gray-300 rounded-3xl hover:shadow-2xl flex flex-col transition-all bg-white"
                            >
                                {/* Bootcamp Image */}
                                <div className="relative">
                                    <img
                                        className="w-full h-[220px] sm:h-[260px] md:h-[280px] object-cover"
                                        src={
                                            photo ||
                                            "https://imgs.search.brave.com/C74hlXS1r5BlFBWYXj8_Wq_W2x6uifAqTKrbUKrRmsc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRpYS5pc3RvY2twaG90by5jb20vaWQvMTE0ODE4NTk5OC92ZWN0b3IvZGlnaXRhbC1qYXZhLWNvZGUtdGV4dC1jb21wdXRlci1zb2Z0d2FyZS1jb2RpbmctdmVjdG9yLWNvbmNlcHQtcHJvZ3JhbW1pbmctY29kaW5nLXNjcmlwdC5qcGc_cz02MTJ4NjEyJnc9MCZrPTIwJmM9YTgyOEZ1aUZtU1JPQ0NtYzdnbEpLcjFEU3hrakhFdnBkcTU4RF9tM1RWdz0"
                                        }
                                        alt={name}
                                        loading="lazy"
                                    />
                                    <div className="absolute top-3 right-3 text-xs sm:text-sm px-2 py-1 rounded-lg bg-white/80">
                                        <p>{element.courses.length} Courses</p>
                                    </div>
                                </div>

                                {/* Bootcamp Details */}
                                <div className="p-4 sm:p-5">
                                    <h1 className="text-lg sm:text-xl font-semibold">{name}</h1>
                                    <h3 className="text-gray-700 text-sm sm:text-base font-light">{email}</h3>
                                    <p className="text-gray-500 text-sm sm:text-base">{website}</p>
                                </div>

                                {/* Bootcamp Info */}
                                <div className="flex justify-around items-center mt-auto pb-4 sm:pb-6">
                                    <div className="text-center">
                                        <LuBookOpen className="text-lg sm:text-xl text-gray-600 mx-auto" />
                                        <p className="text-gray-600 text-sm">
                                            {element.courses.length} Courses
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <MdAccessTime className="text-lg sm:text-xl text-gray-600 mx-auto" />
                                        <p className="text-gray-600 text-sm">Self-Paced</p>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div className="text-center mb-4">
                                    <Link
                                        className="text-base sm:text-lg md:text-xl text-white py-2 px-6 rounded-xl bg-blue-500 hover:bg-blue-600 transition-all inline-block w-[80%]"
                                        to="/layout/displayCources"
                                        state={element}
                                    >
                                        View More
                                    </Link>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <section className="h-[60vh] w-full flex items-center justify-center text-gray-600 text-lg">
                        <h1>No Bootcamps Found.</h1>
                    </section>
                )}
            </section>
        </>
    );

}

export default React.memo(DisplayBootCamps);
