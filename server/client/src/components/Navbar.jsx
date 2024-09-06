import { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import { loggedOut } from "../controllers/usersController"

import LogoutModal from "./LogoutModal"

const Navbar = () => {
  const [menuToggle, setMenuToggle] = useState("translate-x-full")
  const [closeTransition, setCloseTransition] = useState('opacity-0')

  const {user} = useContext(UserContext)

  const handleMenuToggle = function() {
    setMenuToggle("translate-y-0")
    setTimeout(()=> {
      setCloseTransition('opacity-100')
    },500)
  }

  const handleCloseMenu = ()=> {
    setCloseTransition('opacity-0')
    setTimeout(()=> {
      setMenuToggle("translate-x-full")
    },20)
  }
  
  const [logoutToggle, setLogoutToggle] = useState(false)
  const [close, setClose] = useState(false)
  const handleLogoutToggle = ()=> {
    setLogoutToggle(true)
    setClose(false)
  }
  const handleLogout = ()=> {
    setClose(true)
    setTimeout(()=> {
      setLogoutToggle(false)
    },800)
  }


  const [rentalsAtag, setRenalAtag] = useState(false)
  const [aboutsAtag, setAboutAtag] = useState(false)
  const [contactAtag, setContactAtag] = useState(false)
  const [dashboardAtag, setDashboardAtag] = useState(false)
  
  const handleRentalAtag = ()=>  {
    setRenalAtag(true)
    setAboutAtag(false)
    setContactAtag(false)
    setDashboardAtag(false)
  }
  const handleAboutAtag = ()=> {
    setRenalAtag(false)
    setAboutAtag(true)
    setContactAtag(false)
    setDashboardAtag(false)
  }
  const handleContactAtag = ()=> {
    setRenalAtag(false)
    setAboutAtag(false)
    setContactAtag(true)
    setDashboardAtag(false)
  }
  const handleDashboardAtag = ()=> {
    setRenalAtag(false)
    setAboutAtag(false)
    setContactAtag(false)
    setDashboardAtag(true)
  }
  const handleRegisterAtag = ()=> {
    setRenalAtag(false)
    setAboutAtag(false)
    setContactAtag(false)
    setDashboardAtag(false)
  }

useEffect(()=> {
  if(window.location.pathname === "/dashboard"){
    setDashboardAtag(true)
  }
  if(window.location.pathname === "/"){
    setRenalAtag(true)
  }
  if(window.location.pathname === "/contact"){
    setContactAtag(true)
  }
  if(window.location.pathname === "/about"){
    setAboutAtag(true)
  }
},[])

const onBeforeUnload = async()=> {
  if(!localStorage.getItem('email')) {
    try {
      await loggedOut(user.email)
      return
    } catch (error) {
      console.log(error)
    }
  } else {
    return
  }
}
window.addEventListener('beforeunload',onBeforeUnload)

  return (  
    <> 
      <div className="h-[90px] w-full fixed top-0 left-0 xs:hidden lg:flex bg-white z-20 shadow-md"></div>
      <nav className="bg-sky-500 h-20 w-full fixed top-0  shadow-sky-400 justify-center xs:hidden lg:flex z-40 " >
        <div className="w-full grid grid-cols-4 px-5 justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-white gap-2" onClick={handleRentalAtag}>
              <i className="bi bi-house-fill text-4xl"></i>
              <p className="text-3xl font-black">HanapBahay</p>
            </Link>
          </div>

          <ul className={`grid grid-flow-col ${user.email ? "grid-cols-4" : "grid-cols-3"} lg:text-xl font-sans text-white col-span-2 `}>
            <Link to="/" className="relative flex items-center justify-center" onClick={handleRentalAtag}>
              <li className="peer z-30 bg-sky-500 text-center" >Rentals</li>
              <i className={`bi bi-house-door-fill absolute z-20 top-1/2  peer-hover:translate-y-4 text-black peer-hover:text-sky-200 rounded-full peer-hover:opacity-100  bg-sky-500 duration-500 ease-out  ${rentalsAtag ? "opacity-100 translate-y-4": "opacity-0 -translate-y-1/2"} transition h-14  w-14 py-1 text-center border-8 border-white`} ></i>

            </Link>
            {user.email && (
            <Link to="/dashboard" className="relative flex items-center justify-center" onClick={handleDashboardAtag}>
              <li className="peer z-30 bg-sky-500 text-center" >Dashboard</li>
              <i className={`bi bi-credit-card-2-front-fill absolute z-20 top-1/2  peer-hover:translate-y-4 peer-hover:text-sky-200 text-black rounded-full peer-hover:opacity-100  bg-sky-500 duration-500 ease-out ${dashboardAtag ? "opacity-100 translate-y-4": "opacity-0 -translate-y-1/2"} transition h-14  w-14 py-1 text-center border-8 border-white`} ></i>
              </Link>
            )}
            <Link to="/about" className="relative flex items-center justify-center" onClick={handleAboutAtag}>
              <li className="peer z-30 bg-sky-500 text-center" >About Us</li>
              <i className={`bi bi-people-fill absolute z-20 top-1/2  peer-hover:translate-y-4 peer-hover:text-sky-200 text-black rounded-full peer-hover:opacity-100  bg-sky-500 duration-500 ease-out ${aboutsAtag ? "opacity-100 translate-y-4": "opacity-0 -translate-y-1/2"} transition h-14  w-14 py-1 text-center border-8 border-white`} ></i>
            </Link>
            <Link to="/contact" className="relative flex items-center justify-center" onClick={handleContactAtag}>
            <li className="peer z-30 bg-sky-500 text-center" >Contact</li>
            <i className={`bi bi-telephone-fill absolute z-20 top-1/2  peer-hover:translate-y-4 peer-hover:text-sky-200 text-black rounded-full peer-hover:opacity-100  bg-sky-500 duration-500 ease-out ${contactAtag ? "opacity-100 translate-y-4": "opacity-0 -translate-y-1/2"} transition h-14  w-14 py-1 text-center border-8 border-white`} ></i>
            </Link>
          </ul>
      
          {!user.email ? (
            <div className="flex items-center justify-end gap-5 text-white">
              <ul className="flex gap-6 font-semibold ">
                <Link to="/register" className="flex gap-1 hover:scale-110 transition duration-200 ease-in-out"onClick={handleRegisterAtag}>
                  <i className="bi bi-person-fill-add"></i>
                  Sign Up
                </Link>
                <Link to="/login" className="flex gap-1 hover:scale-110 transition duration-200 ease-in-out" onClick={handleRegisterAtag}>
                  <i className="bi bi-door-open-fill"></i>
                  Log In
                </Link>
              </ul>
            </div> 
          ) : (
            <div className="text-white flex justify-end items-center font-semibold">
              <div className="flex gap-1 cursor-pointer hover:scale-110 duration-200 ease-in-out transition" onClick={handleLogoutToggle}>
                <i className="bi bi-door-closed-fill"></i>
                  Logout
              </div>
            </div>
          )}
        </div>
      </nav> 
      <nav className="xs:flex lg:hidden h-16 w-full fixed top-0 shadow justify-center z-40 ">
        <div className="w-full flex relative bg-sky-500 ">
          <div className="w-full flex px-5 justify-between">
            <a href="/" className="flex items-center text-white gap-2 w-96">
              <i className="bi bi-house-fill text-4xl"></i>
              <p className="text-3xl font-black">HanapBahay</p>
            </a>
            <div className="flex items-center">
              <i className="bi bi-list text-4xl border-2 sm:text-5xl border-white rounded text-white cursor-pointer" onClick={handleMenuToggle} ></i>
            </div>
          </div>
          <div className={`absolute left-0 flex items-end justify-between w-full h-screen flex-row top-0 transition text-white  duration-500 ease-in-out  z-50 ${menuToggle}`}>
            <div className={`xs:w-36 md:w-full bg-black/20 h-full ${closeTransition}`} onClick={handleCloseMenu}>
            </div>
            <ul className={`flex items-start gap-2 w-64 pt-4 h-screen flex-col text-2xl font-semibold text-white relative bg-sky-500`}>
              <a href="/"><li className="px-4 py-2 border-b w-64">Rentals</li></a>
              {user.email && (
              <a href="/dashboard"><li className="px-4 py-2 border-b w-64">Dashboard</li></a>
              )}
              <a href='/about'><li className="px-4 py-2 border-b w-64">About Us</li></a>
              <a href='/contact'><li className="px-4 py-2 border-b w-64">Contact</li></a>
              {!user.email && 
                <a href="/register"><li className="px-4 py-2 border-b w-64">Sign up</li></a>
              }
              {!user.email && 
              <a href="/login"><li className="px-4 py-2">Login</li></a>
              }
              {user.email &&
                <li className="cursor-pointer px-4 py-2" onClick={handleLogoutToggle}>Logout</li>
              }
              <div className="bg-sky-600 w-64 px-4 py-2 text-2xl font-semibold flex  gap-2 items-center absolute bottom-0">
                <i className="bi bi-house-fill"></i>
                <p className="text-base">HanapBahay 2024</p>
              </div>
            </ul>
           
          
          </div>
          
        </div>
      </nav>
      {logoutToggle && 
        <LogoutModal logout={handleLogout} closeModal={close}/>
      }
    </>
   
    

  )
}

export default Navbar
