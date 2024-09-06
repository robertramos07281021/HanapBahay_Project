import { useState } from "react"

const AboutUs = () => {

  const [transition, setTransition] = useState('opacity-0')
  setTimeout(()=> {
    setTransition('opacity-100')
  },20)

  return (

    <div className={`w-full pt-20 flex flex-col gap-10 h-full ${transition} transition duration-500 ease-in`}>
      <div className="border flex justify-center bg-gradient-to-r from-sky-100 via-sky-800 to-sky-100 mix-blend-multiply relative ">
        <img src="/bgAboutUs.png" className="h-52 w-2/4 saturate-50 opacity-90" alt="" />
        <p className="absolute text-white -bottom-7 text-7xl font-black drop-shadow-lg stroke-white">About Us</p>
      </div>

      <div className="flex items-center flex-col">
        <p className="xs:text-base xs:p-2 xs:text-center lg:p-0 lg:text-2xl font-semibold">We Bring to You The Easy Way To Find Rental House, Appartment or Room.</p> 
        <p className="lg:text-sm xs:text-xs p-2 text-center">HanapBahay specializes in rentals or helping you to find tenants around the Philippines.</p>
      </div>

      <div className=" w-full flex justify-center">
        <div className="lg:w-4/6  grid lg:grid-flow-col lg:grid-cols-3 text-center ">
          <div className="flex flex-col px-4 gap-2">
            <i className="bi bi-houses text-7xl text-sky-500"></i>
            <hr className="border-2 rounded border-sky-500"/>
            <h1 className="w-full clear-start font-semibold">Available Properties for Rent</h1>
            <p className="text-sm text-justify indent-5 pt-5">Whether you are looking for a home, appartment, or even room. Count on HanapBahay to help you to find the perfect match. Browse the current listings of the rentals.</p>
          </div>
          <div className="flex flex-col px-4 gap-2">
            <i className="bi bi-key-fill text-7xl text-sky-500"></i>
            <hr className="border-2 rounded border-sky-500"/>
            <h1 className="w-full clear-start font-semibold">You Need Tenants</h1>
            <p className="text-sm text-justify indent-5 pt-5">We helping you for your rental house, appartment, or room to have a tenant. Just add your rentals on your dashboard and give a good quality details. Make it real the more good detail the more you have tenant.</p>
          </div>
          <div className="flex flex-col px-4 gap-2">
            <i className="bi bi-diagram-3-fill text-7xl text-sky-500"></i>
            <hr className="border-2 rounded border-sky-500"/>
            <h1 className="w-full clear-start font-semibold">Management</h1>
            <p className="text-sm text-justify indent-5 pt-5">This year, HanapBahay will bring you a smooth process of discovering the rentals that match your needs or tenants, Whether family, friends, or solo. We assure you that you don`t need to make more extra time to find the rents and more focus on your day-to-day activities.</p>
          </div>

        
        </div>
      </div>
    </div>
  )
}

export default AboutUs
