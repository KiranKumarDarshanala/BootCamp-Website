import React from 'react'
import { Link } from 'react-router-dom'

const UnknownLink = () => {
  return (
    <>
      <section className="w-full min-h-screen bg-white flex justify-center items-center px-4 text-center shadow-inner">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-8">
            Unknown Link
          </h1>
          <Link
            to="/layout"
            className='w-full p-3 mb-4 rounded-xl text-center text-xl font-medium bg-blue-700 text-white hover:bg-blue-900 transition-all'
          >
            Go to Home
          </Link>
        </div>
      </section>

    </>
  )
}

export default UnknownLink
