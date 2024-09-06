/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"


const Rentals = ({rental, children}) => {

  return (
    <div className=" w-full lg:hover:shadow-xl lg:hover:shadow-sky-500 shadow-md rounded-md lg:hover:scale-[1.01] transition duration-300 ease-in-out overflow-hidden">
      <div className="h-[500px] flex flex-col rounded-md">
        <div className="border h-[380px] flex ">
          <img src={rental.images[0]} alt="img" className="w-full h-[360px] rounded-t-md" />
        </div>
        <div className="bg-white rounded-b-2xl p-2 flex flex-col gap-4 h-36">
          <div>
            <p className="types">{rental.classes.toUpperCase()}</p>
            <div className="flex justify-between">
            <p className="text-2xl">P <span className="price">{rental.price}</span> / month</p>
            <p>Bedrooms: <span className="bedrooms">{rental.bedrooms}</span></p>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <p>{rental.address1} {rental.address2}</p>
              <p className="city">{rental.city}, {rental.region}</p>
            </div>
            <div className="flex items-end">
              <Link className="bg-sky-500 text-white text-xl px-6 flex items-center h-12 rounded font-bold hover:bg-white hover:text-sky-500 transition duration-300 ease-in-out border-sky-500 border-2" to="/show" state={rental} >Details</Link>
            </div>
          </div>
        </div>
     
        
      </div>
    </div>
  )
}

export default Rentals
