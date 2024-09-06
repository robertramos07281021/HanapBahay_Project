/* eslint-disable react/prop-types */
import { UserContext } from "../contexts/UserContext"
import {  useContext, useState } from "react"
import { buttons } from "../OOP/ObjectOriented"
import { loggedOut } from "../controllers/usersController"

const LogoutModal = ({logout, closeModal}) => {
  const {setUser} = useContext(UserContext)
  const [hidden, setHidden] = useState(false)

  async function handleLogout() {
    setHidden(!hidden)
    try{ 
      await loggedOut(localStorage.getItem('email'))
    } catch (err){
      console.log(err)
    }
    window.location.assign('/')
    setTimeout(()=> {
      setUser({email: null, post:[]})
      localStorage.removeItem('email')
      localStorage.removeItem('token')
    })
  }
  return (
    <div className={`fixed items-center justify-center top-0 left-0 w-full h-screen bg-white/10 backdrop-blur-[.8px] z-50 ${hidden ? "hidden" : "flex"}`}>
      <div className={`w-96 h-60 bg-white flex flex-col  rounded-md shadow-lg shadow-sky-500 gap-5 ${closeModal ? "animate-bounceOut" : "animate-bounceIn"} overflow-hidden`}>
        <div className="h-5/6 px-5 py-2 flex flex-col gap-5">
          <p className="text-2xl font-bold">Lougout</p>
          <p className="text-base font-semibold text-justify"> <i className="bi bi-exclamation-circle-fill text-red-500 "></i> Are you sure you want to Logout?</p>

        </div>
        <div className="flex gap-5 h-2/6 p-2 bg-sky-100 justify-end">
          <button className={buttons.button('sky')} onClick={handleLogout}>Yes</button>
          <button className={buttons.button('slate')} onClick={logout}>No</button>
        </div>
      </div>
    </div>
  )
}

export default LogoutModal
