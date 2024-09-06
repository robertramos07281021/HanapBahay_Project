/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react"
import { deleteRental, updateIfRented } from "../controllers/rentPostController"
import { UserContext } from "../contexts/UserContext"
import { Link } from "react-router-dom"
import ConfirmationModal from "./ConfirmationModal"


const UserReantals = ({rent,index}) => {
  const {user, setUser} = useContext(UserContext)
  const [rentalTransitionRight, setRentalTransitionRight] = useState("even:translate-x-5")
  const [rentalTransitionLeft, setRentalTransitionLeft] = useState("odd:-translate-x-5")
  const [opacityTransition, setOpacityTransition] = useState("opacity-0")

  setTimeout(()=> {
    setRentalTransitionRight("even:translate-x-0")
    setOpacityTransition("opacity-100")
    setRentalTransitionLeft("odd:translate-x-0")
  })
  
  const [inquiry, setInquiry] = useState("flex")
  useEffect(()=> {
    if(rent.inquiries.length === 0) {
      setInquiry("xs:hidden")
    }
  },[])



  //transition for buttons of delete and update for rented or not rented.
  const [transition, setTransision] = useState(false)
  
  //delete rented, button.
  const [deleteModalBG, setDeleteModalBG] = useState(false)
  const handleDeleteRental = ()=> {
    setDeleteModalBG(true)
    setTransision(false)
  }
  const handleCandelDeleteRental = ()=> {
    setTransision(true)
    setTimeout(()=> {
      setDeleteModalBG(false)
      setTransision(false)
    },800)
  }

  const [deleteLoading, setDeleteLoading] = useState(false)
  const handleCandelConfirmDelete = async() => {
    try {
      setTransision(true)
      setDeleteModalBG(false)
      setDeleteLoading(true)

      const data = await deleteRental(rent._id)
      const updateRental = user.rentals.filter((rental) => rental._id !== rent._id)
      setUser({email: localStorage.getItem('email'),rentals: updateRental})
      setTimeout(()=> {
        setDeleteLoading(false)
        location.assign('/dashboard?rentaldeleted=true')
      })
    } catch (error) {
      console.log(error)
    }
  }
  

  //update if rented or not rented, button.
  const [updateRented, setUpdateRented] = useState(false)
  function handleRented() {
    setUpdateRented(true)
    setTransision(false)
  }
  const handleCancelUpdateRented = ()=> {
    setTransision(true)
    setTimeout(()=> {
      setUpdateRented(false)
      setTransision(true)
    },800)
  }
  const handleSubmitRented= async() => {
    const res = await updateIfRented(rent._id)
    setUpdateRented(false)
    setDeleteLoading(true)
    setTimeout(()=> {
      setDeleteLoading(false)
      location.assign('/dashboard?rentalrented=true')
    },500)
  }


  return (
    <>
      {deleteLoading && 
      <div className="w-screen h-screen fixed top-0 left-0 bg-white z-50" >
          <i className="bi bi-house-fill text-5xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 after:animate-spin-slow after:absolute after:border-8 after:w-20 after:h-20 after:left-0 after:top-0 px-4 text-sky-500 pt-3 after:rounded-full after:border-dotted after:border-sky-500 z-50"></i>
      </div>
      }

      {updateRented &&
        <ConfirmationModal cancelModal={handleCancelUpdateRented} modalTransition={transition} submit={handleSubmitRented} submitButton="orange" buttonValue="Update" cancelSubmit="slate">
          <p className="text-2xl font-bold">Rented Confirmation</p>
          {rent.rented ? 
            (<p className="text-base font-semibold text-justify indent-5">Are you sure this {rent.classes.toUpperCase()} with No.{index + 1} label is not rented?</p>)
            : 
            (<p className="text-base font-semibold text-justify indent-5">Are you sure this {rent.classes.toUpperCase()} with No.{index + 1} label is already rented?</p>) 
          }
        </ConfirmationModal>  
      }
    
      {deleteModalBG &&
        <ConfirmationModal cancelModal={handleCandelDeleteRental} modalTransition={transition} submit={handleCandelConfirmDelete} submitButton="red" buttonValue="Delete" cancelSubmit="slate">
          <p className="text-2xl font-bold">Delete Confirmation</p>
          <p className="text-base font-semibold text-justify indent-5">Do you want to delete No.{index + 1} Rental? This action cannot be undone and you will be unable to recover any data.</p>
        </ConfirmationModal>
      }

      <div className={`md:w-8/12 lg:w-9/12 xs:w-full lg:h-[504px] grid lg:grid-cols-8 xs:grid-cols-1 xs:gap-y-2 lg:gap-2 p-2 bg-sky-300 rounded shadow-lg md:hover:duration-300 md:hover:shadow-sky-500 md:hover:shadow-2xl md:hover:scale-[1.01] transition duration-700 ease-in ${rentalTransitionRight} ${opacityTransition} ${rentalTransitionLeft} relative`}  >
        <div className={`absolute z-50 text-3xl h-12 w-12 ${rent.rented ? "bg-orange-300" : "bg-sky-300"}  border-8 border-white/50 flex justify-center items-center rounded-full right-1/2 translate-x-1/2 -top-5 font-black md:right-0 md:h-16 md:w-16 md:-top-8`}>
          {index + 1}
        </div>
        {/* for images */}
        <div className=" bg-white/50 h-full backdrop-blur-[2px] rounded flex flex-col col-span-2 gap-2 p-2 ">
          <img src={rent.images[3]} alt="" className=" h-[290px] w-full"/>
          <div className="w-full grid grid-cols-3  gap-2  ">
            <img src={rent.images[1]} alt="" className="h-24 w-full "/>
            <img src={rent.images[0]} alt="" className="h-24 w-full " />
            <img src={rent.images[2]} alt="" className="h-24 w-full"/>
          </div>
          <div className="w-full mt-5 flex gap-2 ">
            <Link to="/update" className="w-full rounded border-2 py-2 bg-green-500 border-green-500 text-white font-bold text-lg hover:bg-green-100 hover:text-green-500 transition duration-300 ease-out flex justify-center" state={rent}>
              Update
            </Link>
            <button className="w-full border-2 py-2 rounded  bg-red-500 border-red-500 text-white font-bold text-lg hover:bg-red-100 hover:text-red-500 transition duration-300 ease-out" onClick={handleDeleteRental}>Delete</button>
          </div>
        </div>
        {/* for details */}
        <div className="h-full flex flex-col gap-2 p-2 xs:col-span-2 lg:col-span-3 backdrop-blur-[2px] bg-white/50 rounded relative">
        <button className="absolute bottom-36 right-2 border-2 w-36 py-2 rounded bg-orange-500 border-orange-500 text-white font-bold hover:text-orange-500 hover:bg-orange-100 transition duration-300 ease-out" onClick={handleRented}>
           {rent.rented ?  'Not Rented':'Rented'}
          </button>
          <div className="">
            <h1 className="text-xl font-bold">Address :</h1>
            <div className="ps-5">
              <p>{rent.address1}</p>
              <p>{rent.address2}</p>
              <p>{rent.city}</p>
              <p>{rent.region}</p>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold">Type :</h1>
            <p className="ps-5">{rent.classes.toUpperCase()}</p>
          </div>
          <div className="flex">
            <div className="w-full">
              <h1 className="text-xl font-bold">Bedroom/s :</h1>
              <p>{rent.bedrooms}</p>
            </div>
            <div className="w-full">
              <h1 className="text-xl font-bold">Bathroom/s :</h1>
              <p>{rent.bathrooms}</p>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold">Price :</h1>
            <p>{rent.price} <span className="font-semibold">/ month</span></p>
          </div>
          <div className="w-full mt-1">
            <h1 className="text-xl font-bold">Description :</h1>
            <div className="w-full h-32 indent-5 text-justify overflow-hidden overflow-y-auto p-2 border-2 border-sky-500 rounded">
              {rent.description}
            </div>
          </div>
        </div>
        {/* for Inquiries*/}
        <div className={`col-span-3 bg-white/50 rounded h-96 w-full lg:h-[488px] lg:flex flex-col gap-2 p-2 ${inquiry}`}>
          <h1 className="text-xl font-bold">Inquiries :</h1>
          <div className="flex flex-col overflow-hidden overflow-y-auto h-full border-2 rounded border-sky-500">
            {rent.inquiries.map((inquiry, index)=> (
              <div key={index} className="px-5 py-1">
                <h1 className="font-semibold">{inquiry.name} -</h1>
                <div className="ps-5">
                  <p>{inquiry.email}</p>
                  <p>{inquiry.phone}</p>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-sky-300 via-sky-800 to-ksy-300 mt-4">
                </div>
    
              </div>
            ))}

          </div>
        </div>
      </div>
    </>

  )
}

export default UserReantals
