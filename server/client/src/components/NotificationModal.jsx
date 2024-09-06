/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


const NotificationModal = ({children, bg, query, navigation}) => {

  const [notification, setNotification] = useState(false)
  const [transition, setTransition] = useState('w-full')
  const navigate = useNavigate()  

  useEffect(()=> {
    setNotification(query)
    setTimeout(()=> {
      setTransition("w-0")
    },20)
    if(query){
      let timer = setTimeout(()=> {
        setNotification(false)
        if(navigation){
          navigate(navigation)
        } else {
          location.reload()
        }
      },5000)
      return ()=> clearTimeout(timer)
    }
  },[])

  function handleCloseNotification() {
    if(navigation){
      navigate(navigation)
      setNotification(false)
    } else {
      location.reload()
    }
  }
 

  return ( 
    <>
      { notification &&
        <div className={`fixed flex flex-col  md:top-24 md:right-4 ${bg} rounded shadow-xl h-14 xs:w-full md:w-96  text-white font-bold tracking-wider overflow-hidden`}>
          <div className="px-2 h-full flex justify-between items-center">
            <p className="py-3 px-2">{children}</p>
            <i className="bi bi-x-square text-3xl cursor-pointer" onClick={handleCloseNotification}></i>
          </div>
            <div className={`${transition} h-2 bg-black transition-width duration-[5000ms] ease-linear `}></div>
        </div> 
      }
    </>
  )
}

export default NotificationModal
