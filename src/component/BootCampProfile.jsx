import React, { useContext } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { MyContext } from '../context/GlobalContext';
import { toast } from 'react-toastify';

const BootCampProfile = () => {
    let { token } = useContext(MyContext);
    let location = useLocation();
    let navigate = useNavigate();
    console.log(location);
    let { description, email, name, website, photo } = location.state;


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
            <section className="p-4">
                <br />
                <Link
                    className="text-2xl text-white py-2 px-6 border bg-emerald-900 rounded-[20px] m-2 hover:bg-white hover:text-black transition-all inline-block"
                    to="/layout/"
                    state={location.state}
                >
                    Back
                </Link>

                <div className="w-full max-w-[auto] mx-auto min-h-[50vh] flex flex-col md:flex-row justify-center items-center gap-6 p-4">
                    {location.state.length === undefined ? (
                        <div className="w-full h-[450px]  rounded-3xl p-4 shadow-2xl flex flex-col md:flex-row bg-white gap-6 shadow-white">
                            <img
                                className="w-full md:w-[500px] rounded-3xl h-auto max-h-[100%] object-cover"
                                src={photo}
                                alt={name}
                                loading="lazy"
                            />
                            <div className="flex justify-center flex-col flex-1">
                                <h1 className="text-3xl font-bold p-2">{name}</h1>
                                <h3 className="text-xl font-medium p-2">{email}</h3>
                                <p className="p-2">{description}</p>
                                <p className='p-2'>{website}</p>
                                <br />
                                <div className='flex justify-evenly'>
                                    <Link
                                        className="text-2xl text-white py-2 px-6 border bg-emerald-900 rounded-[20px] m-2 hover:bg-white hover:text-black transition-all inline-block"
                                        to="/layout/displayCources"
                                        state={location.state}
                                    >
                                        View Courses
                                    </Link>
                                    <Link
                                        className="text-2xl text-white py-2 px-6 border bg-emerald-900 rounded-[20px] m-2 hover:bg-white hover:text-black transition-all"
                                        to="/layout/editBootCamp"
                                        state={location.state}
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="text-2xl text-white py-2 px-6 border bg-emerald-900 rounded-[20px] m-2 hover:bg-white hover:text-black transition-all"
                                        onClick={() => handleDelete(location.state.id)}
                                    >
                                        Delete
                                    </button>

                                </div>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </section>

        </>
    )
}

export default BootCampProfile
