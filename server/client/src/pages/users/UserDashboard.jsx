/* eslint-disable react-hooks/exhaustive-deps */
import UserReantals from "../../components/UserReantals"
import { Link } from "react-router-dom"
import {getUserRentals} from "../../controllers/rentPostController"
import { useContext, useEffect, } from "react"
import { UserContext } from "../../contexts/UserContext"
import NotificationModal from "../../components/NotificationModal"

const UserDashboard =() => {
  const {user, setUser} = useContext(UserContext)
  useEffect(()=> {
    setTimeout(async()=> {
      const {userRents, email} = await getUserRentals();
      setUser({email, rentals: userRents})
    })
  },[])

  return (
    <div className="w-full flex flex-col items-center gap-10 xs:pt-20 lg:mt-10 ">
      <div className=" flex justify-between xs:flex-col xs:gap-2 md:gap-0 md:flex-row lg:w-9/12 xs:w-full xs:px-2 md:px-10 lg:px-0 ">
        <h1 className="text-sky-500 font-bold xs:text-[.8em] md:text-xs lg:text-base">Welcome <span className="lg:text-xl xs:text-[1em] md:text-base text-black">{user.email}</span></h1>
        <Link to="/add" className="flex "><button className=" drop-shadow-xl px-10  border-2 border-blue-500 rounded md:text-lg lg:text-xl bg-blue-500 text-white py-1  hover:text-blue-500 hover:bg-blue-200 hover:scale-[1.05] font-semibold transition duration-500 ease-out">Add Rental</button></Link>
      
      </div>
      {
        user.rentals.length <= 0 &&
        <div className="text-5xl font-bold w-full h-full flex items-center justify-center">
          No rentals added
        </div>
      }
      {
        user.rentals.map((rental,index) => ( 
          <UserReantals key={rental._id} rent={rental} index={index}/>
        ))
      }
      <NotificationModal text="text-white" bg="bg-orange-500" query={window.location.search === "?rent_updated=true" || window.location.search === "?rentalrented=true"} navigation="/dashboard">
        Successfully Updated!
      </NotificationModal>
      <NotificationModal text="text-white" bg="bg-green-500" query={window.location.search === "?successfulyadded=true" || window.location.search === "?rentaldeleted=true"} navigation="/dashboard">
        {window.location.search === "?successfulyadded=true" && "Successfully Added!"}
        {window.location.search === "?rentaldeleted=true" && "Successfully Deleted!"}
      </NotificationModal>
    </div>
  )
}

export default UserDashboard
