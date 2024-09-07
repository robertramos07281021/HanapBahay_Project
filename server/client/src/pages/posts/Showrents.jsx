import { useState } from "react"
import { useLocation } from "react-router-dom"
import ThankYouModal from "../../components/ThankYouModal"
import InquiryModal from "../../components/InquiryModal"


const Showrents = () => {
  const {state} = useLocation()
  const [translate, setTranslate] = useState(0)
  const [maxLeft, setMaxLeft] = useState(false)
  const [maxRight, setMaxRight] = useState(true)

  const translateValue = ["-translate-x-[0%]","-translate-x-[100%]","-translate-x-[200%]","-translate-x-[300%]"]

  const handleTranslateLeft = function() {
    if(translate != 0){
      setTranslate(translate - 1) 
      setMaxLeft(true)
      setMaxRight(true)
    }
    if(translate == 1){
      setMaxLeft(false)
    }  
  }
  const handleTranslateRight = function() {
    if(translate < 3){
      setTranslate(translate + 1) 
      setMaxLeft(true)
    }
    if(translate == 2){
      setMaxRight(false)
    }  
  }
  const imagePages = [0,1,2,3]
  
  const [inquiry, setInquiry] = useState("");
  const [inquiryToggle, setInquiryToggle] = useState(false)
  const [thankYou, setThankYou] = useState(false)

  function toggleInquiry(){
    setThankYou(false)
    setInquiryToggle(true)
    setTimeout(()=>{ 
      setInquiry("opacity-100 flex translate-y-24")
    },20)
  }




  const [transitionModal, setTransitionModal] = useState("-translate-y-2/3 opacity-0")

  function toggleThankyou(){
    if(thankYou === false){
      setThankYou(!thankYou)
      setTimeout(()=> {
          setTransitionModal("opacity-100 -translate-y-1/2")
      },200)
    } else {
      setTransitionModal("-translate-y-2/3 opacity-0")
      setTimeout(()=> {
        setThankYou(!thankYou)
      },5000)
    }
  }

  function closeModal(){
    setInquiry(" opacity-0 translate-y-0")
    setTimeout(()=> {
      setInquiryToggle(false)
    },1000)
  }
  const login = localStorage.getItem('email')
  const [inquiryButton, setInquiryButton] = useState(true)

  const [transition, setTransision] = useState('opacity-0')

  setTimeout(()=> {
    setTransision('opacity-100')
    if(state.user.email === login) {
      setInquiryButton(false)
    }
  })

  console.log(state)
  return (
    <>
    <div className={`xs:w-full lg:w-6/12 flex flex-col md:h-screen lg:h-auto gap-5 mt-32 ${transition} duration-500 transition ease-in`}>
      <div className=" xs:h-80 md:h-2/4 lg:h-[500px] relative w-full overflow-hidden rounded-md shadow-md shadow-sky-500">
        <div className={`flex flex-wrap flex-col w-full h-full ${translateValue[translate]} transition duration-1000 ease-in-out` }>
            {
              state.images.map((image,index)=> <img key={index} src={image} className="w-full h-full" alt={`Images ${index +1}`}/>)
            }
        </div>
        <div className="absolute bottom-5 flex gap-5 left-1/2 -translate-x-1/2">
          {imagePages.map((pages)=> <div key={pages} className={`w-16 h-1 ${translate == pages ? "bg-sky-500" : "bg-sky-500/30"} rounded-full`}></div>)}
        </div>
        <i className={`bi bi-arrow-left-circle-fill absolute left-0 top-1/2 -translate-y-1/2 text-4xl text-sky-500/50 ${maxLeft ? "hover:text-sky-500" : ""} rounded-full ms-5 drop-shadow-xl duration-500 transition ease-in-out`}  onClick={handleTranslateLeft}></i>
        <i className={`bi bi-arrow-right-circle-fill absolute right-0 top-1/2 -translate-y-1/2 text-4xl text-sky-500/50 ${maxRight ? "hover:text-sky-500":""} rounded-full me-5 drop-shadow-xl duration-500 transition ease-in-out`} onClick={handleTranslateRight}></i>
      </div>
      <div className="flex flex-col gap-5 shadow border rounded p-5">
        
        <div className="flex justify-between">
          <div>
            <p className="xs:text-sm md:text-2xl">{state.address1} {state.address2}</p>
            <p className="xs:text-xs md:text-lg">{state.city}, {state.region}</p>
          </div>
          <div className="text-end">
            <p className="xs:text-sm md:text-2xl">P {state.price} <span className="xs:text-sm md:text-base">/month</span></p>
            <p className="text-right text-xl">{state.classes.toUpperCase()}</p>
          </div>
        </div>
        <div className="p-2 xs:text-sm md:text-base ">
          <p className="w-1/6 flex justify-between font-normal">Bedrooms: <span className="font-semibold">{state.bedrooms}</span></p> 
          <p className="w-1/6 flex justify-between font-normal">Bathrooms: <span className="font-semibold">{state.bathrooms}</span></p> 
        </div>

        <div className="p-2">
          <p className="xs:text-base md:text-xl font-semibold">Other Description:</p> 
          <p className="indent-5 text-justify xs:text-sm md:text-lg">{state.description}</p>
        </div>
          {inquiryButton &&
        <div className="flex justify-center">
          <button className="px-20 py-2 bg-sky-500 text-white rounded font-bold border-2 border-sky-500 duration-300 transition hover:bg-white hover:text-sky-500" onClick={toggleInquiry}>Inquiry</button>
        </div>
          }
       </div>
      </div>
    { inquiryToggle && <InquiryModal handleToggle={closeModal} transition={inquiry} rents={state} thankModal={toggleThankyou}/> }
    { thankYou && <ThankYouModal transition={transitionModal} thanksToggle={toggleThankyou}/> } 
    </>
  )
}

export default Showrents
