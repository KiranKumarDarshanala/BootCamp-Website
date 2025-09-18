import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../context/GlobalContext'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../../../13.Routing/dynamic_routing/src/components/Loader';
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
            {/* Responsive */}
            <div className='border border-blue-400 bg-blue-100 rounded-2xl h-[100px] flex items-center justify-between p-5'>

                <div>
                    <h1 className='text-xl font-bold'>Welcome back, {userName} 👋</h1>
                    <p></p>
                </div>
                {
                    user != "publisher" ? <>

                    </> : <div>
                        <NavLink className={`flex p-[10px] rounded gap-4  items-center bg-blue-500 `}
                            to="/layout/addBootCamp"
                        >
                            <FaPlus className='text-[#000] text-xl' />
                            Create BootCamp
                        </NavLink>
                    </div>
                }

            </div>
            <section className='h-[150px] p-5 flex justify-evenly'>
                <div className='border border-gray-200 rounded-2xl shadow h-full w-[300px] pl-5 flex items-center gap-4'>
                    <LuBookOpen className='text-[#2364d6] p-2 rounded-xl text-xl bg-blue-200 w-[40px] h-[40px]' />
                    <div>
                        <p className='text-gray-700'>Total Bootcamps</p>
                        <h1 className='text-2xl font-bold'>{bootCampCount}</h1>
                    </div>
                </div>

                <div className='border border-gray-200 rounded-2xl shadow h-full w-[300px] pl-5 flex items-center gap-4'>
                    <FaArrowTrendUp className='text-[#26d623] p-2 rounded-xl text-xl bg-green-200 w-[40px] h-[40px]' />
                    <div>
                        <p className='text-gray-700'>Total Courses</p>
                        <h1 className='text-2xl font-bold'>{courseCount}</h1>
                    </div>
                </div>

                <div className='border border-gray-200 rounded-2xl shadow h-full w-[300px] pl-5 flex items-center gap-4'>
                    <TbUsers className='text-[#b223d6] p-2 rounded-xl text-xl bg-violet-200 w-[40px] h-[40px]' />
                    <div>
                        <p className='text-gray-700'>Active Students</p>
                        <h1 className='text-2xl font-bold'>1,743</h1>
                    </div>
                </div>
            </section>

            <div className='flex justify-between p-3'>
                <h1 className='text-xl font-bold' >All Bootcamps</h1>
                <p className='text-gray-500'>{bootCampCount} bootcamps available</p>
            </div>

            <section className="w-full max-w-[full] mx-auto bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5 inset-shadow-sm">
                {bootCamps?.length > 0 ? (
                    bootCamps.map((element) => {
                        let { name, email, description, website, address, course, photo, id } = element;
                        return (
                            <div
                                key={id}
                                className="overflow-hidden w-[350px] border border-gray-300 pb-10 rounded-3xl hover:shadow-2xl flex flex-col transition-all"
                            >
                                <div className=" relative">
                                    <img
                                        className=" w-full h-[280px] object-fill"
                                        src={
                                            photo ||
                                            "https://imgs.search.brave.com/C74hlXS1r5BlFBWYXj8_Wq_W2x6uifAqTKrbUKrRmsc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRpYS5pc3RvY2twaG90by5jb20vaWQvMTE0ODE4NTk5OC92ZWN0b3IvZGlnaXRhbC1qYXZhLWNvZGUtdGV4dC1jb21wdXRlci1zb2Z0d2FyZS1jb2RpbmctdmVjdG9yLWNvbmNlcHQtcHJvZ3JhbW1pbmctY29kaW5nLXNjcmlwdC5qcGc_cz02MTJ4NjEyJnc9MCZrPTIwJmM9YTgyOEZ1aUZtU1JPQ0NtYzdnbEpLcjFEU3hrakhFdnBkcTU4RF9tM1RWdz0"
                                        }
                                        alt={name}
                                        width={500}
                                        height={400}
                                        loading="lazy"
                                    />
                                    <div className='text-xs absolute top-4 right-4 p-1 pl-2 pr-2 rounded-xl bg-[#ffffff80]'>
                                        <p>{element.courses.length} Courses</p>
                                    </div>
                                    <div className='pl-6 pt-7'>
                                        <h1 className="text-xl font-medium">{name}</h1>
                                        <h3 className=" font-light text-gray-700">{email}</h3>
                                        {/* <p className="p-1">{description}</p> */}
                                        <p className='font-light text-gray-500'>{website}</p>
                                        {/* <p>{address}</p> */}
                                    </div>
                                </div>
                                <div className='pl-6 pt-7 flex justify-evenly'>
                                    <div className=''>
                                        <LuBookOpen className='text-xl text-gray-600' />
                                        <div className='flex items-center gap-1'>
                                            <h1 className='text-xl text-gray-600'>{element.courses.length}</h1>
                                            <h1 className='text-xl text-gray-600'>Courses</h1>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <MdAccessTime className='text-xl text-gray-600' />
                                        <div className='flex items-center gap-1'>
                                            {/* <h1 className='text-xl text-gray-600'>{element.courses.length}< /h1> */}
                                            <h1 className='text-xl text-gray-600'>Self-Paced</h1>
                                        </div>
                                    </div>

                                </div>
                                <div className="mt-auto text-center w-full ">
                                    <Link
                                        className="text-2xl text-white w-[320px] py-2 px-6 border bg-blue-500 rounded-xl m-2 hover:bg-blue-600  transition-all inline-block"
                                        to="/layout/displayCources"
                                        state={element}
                                    >
                                        View More
                                    </Link>

                                    {/* <div className="mt-5 flex flex-wrap justify-center gap-4">
                                        {user === "publisher" && (
                                            <>
                                        <Link
                                                    className="text-2xl text-white py-2 px-6 border bg-emerald-900 rounded-[20px] m-2 hover:bg-white hover:text-black transition-all"
                                                    to="/layout/editBootCamp"
                                                    state={element}
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    className="text-2xl text-white py-2 px-6 border bg-emerald-900 rounded-[20px] m-2 hover:bg-white hover:text-black transition-all"
                                                    onClick={() => handleDelete(element.id)}
                                                >
                                                    Delete
                                                </button>
                                        </>
                                        )}
                                    </div> */}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <section className="h-[83vh] w-full flex items-center justify-center">
                        <h1>No Bootcamps Found.</h1>
                    </section>
                )}
            </section>

        </>
    )
}

export default React.memo(DisplayBootCamps);
