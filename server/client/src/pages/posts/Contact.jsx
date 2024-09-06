/* eslint-disable no-unused-vars */
import { useState } from "react"
import { newMessage } from "../../controllers/rentPostController"
import NotificationModal from "../../components/NotificationModal"

const Contact = () => {
  const [message, setMessages] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [error, setError] = useState(null)

  const [transition, setTransition] = useState('opacity-0')
  setTimeout(()=> {
    setTransition('opacity-100')
  },20)

  const handleSubmitMessage = async(e)=> {
    e.preventDefault()  
    const contactForm = document.querySelector('form')
    const input = document.getElementsByClassName('need-validation')
    const label = document.getElementsByClassName('inputLabel')
    if(!contactForm.checkValidity()) {
      Array.from(input).forEach((element,index)=> {
        if(!element.checkValidity()) {
          label[index].classList.add('after:content-["*"]')
        } else {
          label[index].classList.remove('after:content-["*"]')
        }
      })
    } else {
      try {
        const res = await newMessage(message.name, message.email, message.message)
        location.reload()
      } catch (error) {
        setError(error)
      }
    }

  } 


  return (

    <div className={`w-full pt-20 flex justify-center ${transition} duration-500 transition ease-in`}>
      <div className="xs:w-full lg:w-8/12 flex xs:flex-col lg:flex-row relative justify-end items-center">
        <form className="lg:w-8/12 lg:h-[500px] md:h-[600px] xs:py-5 rounded-md bg-sky-300 shadow-md lg:hover:scale-[1.03] flex lg:p-10 lg:ps-40 lg:hover:shadow-xl duration-500 transition ease-out" onSubmit={handleSubmitMessage} noValidate>
            <div className="w-full h-full items-center justify-center flex flex-col">
              <p className="text-4xl font-black text-sky-100 tracking-widest">Contact Us</p>
              <div className="w-full h-full flex flex-col gap-2 p-5">
                <label >
                  <span className="font-bold text-base inputLabel after:text-xl after:ps-2 after:text-red-500">Name :</span>
                  <input type="text" className="w-full p-2 rounded mt-1 need-validation" value={message.name} onChange={(e)=> setMessages({...message, name: e.target.value})} required/>
                </label>
                <label >
                  <span className="font-bold text-base inputLabel after:text-xl after:ps-2 after:text-red-500">Email Address :</span>
                  <input type="email" className="w-full p-2 rounded mt-1 need-validation" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" value={message.email} onChange={(e)=> setMessages({...message, email: e.target.value})} required/>
                </label>
                <label className="h-full">
                  <span className="font-bold text-base inputLabel after:text-xl after:ps-2 after:text-red-500">Message :</span>
                  <textarea name="" id="" className="w-full h-full resize-none rounded p-2 need-validation" value={message.message} onChange={(e)=> setMessages({...message, message: e.target.value})} required></textarea>
                </label>
              </div>
                <button className="mt-5 p-1.5  bg-sky-800 text-white font-black rounded  border-2 border-sky-800 w-40 duration-300 ease-out hover:text-sky-800 hover:bg-sky-200 tracking-widest ">Submit</button>
            </div>
        </form>
        
        <div className="lg:absolute lg:w-5/12 grid grid-cols-2 grid-rows-2 gap-3 xs:px-2 lg:px-0 h-96 lg:left-10 lg:top-1/2 xs:mt-2 lg:mt-0 lg:-translate-y-1/2">
          <div className="shadow-md rounded-tl-md border bg-white hover:scale-[1.03] hover:skew-x-3 hover:shadow-xl duration-500 transition ease-out flex items-center justify-center flex-col text-sky-500">
            <i className="bi bi-geo-alt-fill text-5xl"></i>
            <p className="text-base font-semibold">Our Main Office</p>
            <p className="text-center text-xs px-5 pt-2">Brgy Santa Monica Novaliches Quezon City</p>
          </div>
          <div className="shadow-md rounded-tr-md border bg-white hover:scale-[1.03] hover:-skew-x-3 hover:shadow-xl duration-500 transition ease-out flex items-center justify-center flex-col text-sky-500">
            <i className="bi bi-telephone-fill text-5xl"></i>
            <p className="text-base font-semibold">Phone Number</p>
            <p className="text-center text-xs px-5 pt-2">(+63) 984-556-5654</p>
          </div>
          <div className="shadow-md rounded-bl-md border bg-white hover:scale-[1.03] hover:-skew-x-3 hover:shadow-xl duration-500 transition ease-out flex items-center justify-center flex-col text-sky-500">
            <i className="bi bi-envelope-at-fill text-5xl"></i>
            <p className="text-base font-semibold">Email Address</p>
            <p className="text-center text-xs px-5 pt-2">hanapbahay2024@gmail.com</p>
            <p className="text-center text-xs px-5 pt-2">From HanapBahay</p>
          </div>
          <div className="shadow-md rounded-br-md border bg-white hover:scale-[1.03] hover:skew-x-3 hover:shadow-xl duration-500 transition ease-out flex items-center justify-center flex-col text-sky-500">
            <i className="bi bi-facebook text-5xl"></i>
            <p className="text-base font-semibold">Facebook</p>
            <p className="text-center text-xs px-5 pt-2">www.facebook.com/HanapBahay</p>
          </div>
        </div>


      </div>
      {error &&
        <NotificationModal query={error} bg='bg-red-500'>
          You dont have permission to do that!.
        </NotificationModal>
      }
    </div>
  )
}

export default Contact
