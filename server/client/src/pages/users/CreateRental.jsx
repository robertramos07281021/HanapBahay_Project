
import { useState, useContext, useEffect } from "react"
import { addNewRentals, getRegions, getCity } from "../../controllers/rentPostController"
import {PostsContext} from "../../contexts/PostsContext"
import { useNavigate } from "react-router-dom"
import NotificationModal from "../../components/NotificationModal"

const CreateRental = () => {
  const {posts, setPosts} = useContext(PostsContext)
  const [error, setError] = useState(false)  

  const [regionArray, setRegionArray] = useState([])
  const [rentalFormData, setRentalFormData] = useState({
    address1: '',
    address2: '',
    city: '',
    region: '',
    classes: '',
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    description: '',
  })
  const navigate = useNavigate()
  const [images, setImages] = useState([])

  useEffect(()=> {
    let timer = setTimeout(async () => {
       const res = await getRegions()
       setRegionArray(res)
      })
 
      return ()=> clearTimeout(timer)
    },[])

  const [cities, setcities] = useState([])

  const handleRegion = async(e)=> {
    const res = await getCity(e.target.value)
    setcities(res)
    const selectedRegion = regionArray.filter(region => region.code === e.target.value)
    setRentalFormData({...rentalFormData, region: selectedRegion[0].name})
  } 

  const [formTransition, setFormTransition] = useState('-translate-y-5 opacity-0')
  setTimeout(()=> {
    setFormTransition("translate-y-0 opacity-100")
  })

  const [uploading, setUploading] = useState(false)
  
  const handleSubmitForm = async(e)=> {
    const invalid = []
    e.preventDefault()
    const formsField = document.querySelectorAll(".need-validation")
    const invalidInput = document.getElementsByClassName("validation-sign")
    Array.from(formsField).forEach((field, index)=> {
      if(!field.checkValidity()){
        if(!invalid.includes(index)){
          invalid.push(index)
        }
      } else {
        if(index === 4) {
          if(field.files.length !== 4) {
            if(!invalid.includes(index)) {
              invalid.push(index)
            }
          } else {
            invalid.filter(i=> i != index)
          }
        } 
        if(index != 4) {
          invalid.filter(i=> i != index)
        }
      }
    })
    Array.from(invalidInput).forEach((element, index) => {
      if(index < 6) {
        if(invalid.includes(index)){
          element.classList.add("after:content-['*']")
        } else {
          element.classList.remove("after:content-['*']")
        }
      } else {
        if(invalid.includes(index + 2)){
          element.classList.add("after:content-['*']")
        } else {
          element.classList.remove("after:content-['*']")
        }
      }
    })

    if(invalid.length === 0) {
     
      try {
        if(rentalFormData.classes == 'room' && rentalFormData.bathrooms === ""){
          setRentalFormData({...rentalFormData, bathrooms: 1})
        }
        setUploading(true)
        const data = await addNewRentals(rentalFormData.address1, rentalFormData.address2, rentalFormData.region, rentalFormData.city, rentalFormData.classes, rentalFormData.price, rentalFormData.bedrooms, rentalFormData.bathrooms, rentalFormData.description, images)
        setPosts([...posts, data])
        setTimeout(()=> {
          navigate('/dashboard?successfulyadded=true')
        },200)
  
      } catch (error) {
        console.error(error)
        setError(true)
      }
    } 
  }



  return (
    <div className="flex items-center w-screen justify-center h-full xs:pt-24 lg:pt-32 pb-4">
      {uploading ? (
          <div className="w-screen h-screen fixed top-0 left-0 bg-white z-50">
            <i className="bi bi-house-fill text-5xl absolute text-sky-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 after:animate-spin-slow after:absolute after:border-8 after:w-20 after:h-20 after:left-0 after:top-0 px-4 pt-3 after:rounded-full after:border-dotted after:border-sky-500"></i>
          </div>
      ) :
      (
        <form className={`lg:w-9/12 2xl:8/12 xs:w-full border border-sky-300 rounded-md p-5 shadow-lg ${formTransition} transition duration-700 ease-out`} onSubmit={handleSubmitForm} noValidate>
          <p className="text-center mb-5 text-3xl font-bold text-sky-300">New Rentals</p>
          <div className="lg:flex xs:grid xs:grid-cols-1 justify-between pe-2">
            <div className=" p-2 lg:w-1/2 flex flex-col gap-5 xs:order-2 lg:order-1">
              <label className="w-full">
                <span className="text-sky-800 font-semibold text-lg validation-sign after:text-red-500 after:ps-1 after:font-black">Address 1 :</span>
                <input type="text" className="w-full p-2 shadow-md rounded bg-sky-300 text-sky-800 focus:outline-none need-validation" value={rentalFormData.address1} onChange={(e)=> setRentalFormData({...rentalFormData, address1: e.target.value})} required/>
              </label>
              <label className="w-full">
                <span className="text-sky-800 font-semibold text-lg  validation-sign after:text-red-500 after:ps-1 after:font-black">Address 2 :</span>
                <input type="text" className="w-full p-2 shadow-md rounded bg-sky-300 text-sky-800 focus:outline-none need-validation" value={rentalFormData.address2} onChange={(e)=> setRentalFormData({...rentalFormData, address2: e.target.value})} required/>
              </label>
              <div className="flex xs:flex-col md:flex-row lg:flex-row gap-5">
                <label className="w-full">
                  <span className="text-sky-800 font-semibold text-lg validation-sign after:text-red-500 after:ps-1 after:font-black">Region :</span>
                  <select className="w-full p-2 shadow-md rounded bg-sky-300 text-sky-800 focus:outline-none need-validation" onChange={handleRegion} required>
                    <option value="">Select Region</option>
                    {regionArray.map((region,index) => <option key={index} value={region.code}>{region.name}</option>)}
                  
                  </select>
                </label>
                <label className="w-full">
                  <span className="text-sky-800 font-semibold text-lg validation-sign after:text-red-500 after:ps-1 after:font-black">City :</span>
                  <select className="w-full p-2 shadow-md rounded bg-sky-300 text-sky-800 focus:outline-none need-validation" onChange={(e)=> setRentalFormData({...rentalFormData, city: e.target.value})} required>
                    <option value="" >Select City</option>
                    {cities.map(city => <option key={city.code} value={city.name}>{city.name}</option>)}
                  </select>
                </label>
              </div>
            </div>
            <div className="xs:order-1 lg:order-2 xs:flex items-center flex-col">
              <div>
                <label className="w-56 h-56 rounded-md border-4 border-dashed border-sky-300 flex items-center justify-center cursor-cell">
                  <div className="flex items-center justify-center rounded-full bg-sky-200 w-32 h-32 flex-col">
                    <i className="bi bi-file-earmark-arrow-up-fill text-4xl text-sky-300  "></i>
                    <span className="text-sky-300 font-black">Upload</span>
                  </div>
                  <input type="file" className="need-validation" id='images' accept="image/png, image/jpeg" multiple hidden onChange={(e)=> setImages(e.target.files)} required/>
                </label>
                <p className="text-sky-800 font-semibold after:text-red-500 after:ps-1 after:font-black validation-sign">Selected files: {images.length}<span className="font-normal"></span></p>
                <p className="text-sky-800 text-base"><span className="font-semibold ">Note:</span> <span className="text-xs">Please add 4 images</span></p>
              </div>
            </div>
          </div> 
          <div className="flex lg:flex-row xs:flex-col justify-between w-full p-2 gap-5 mt-3">
            <div className="w-full flex flex-col gap-5">
              <fieldset className="flex gap-5">
                <legend className="text-sky-800 font-semibold text-lg validation-sign after:text-red-500 after:ps-1 after:font-black">Type :</legend>
                <label >
                  <input type="radio" name="type" value="house" className="align-middle mr-1 w-[unset] need-validation" onClick={(e)=> setRentalFormData({...rentalFormData, classes: e.target.value})} required />
                  House
                </label>
                <label >
                  <input type="radio" name="type" value="apartment" className="align-middle mr-1 w-[unset] need-validation" onClick={(e)=> setRentalFormData({...rentalFormData, classes: e.target.value})} required />
                  Apartment
                </label>
                <label >
                  <input type="radio" name="type" value="room" className="align-middle mr-1 w-[unset] need-validation" onClick={(e)=> setRentalFormData({...rentalFormData, classes: e.target.value})} required />
                  Room
                </label>
              </fieldset>
              <label className="w-full">
                <span className="text-sky-800 font-semibold text-lg validation-sign after:text-red-500 after:ps-1 after:font-black">Price :</span>
                <input type="number" className="w-full p-2 shadow-md rounded bg-sky-300 text-sky-800 need-validation focus:outline-none" min="0" onChange={(e)=> setRentalFormData({...rentalFormData, price: e.target.value})} required/>
              </label>
              <div className="w-full flex gap-5">
                <label className="w-full">
                  <span className="text-sky-800 font-semibold text-lg validation-sign after:text-red-500 after:ps-1 after:font-black">Bedrooms :</span>
                  <select className="w-full p-1.5 shadow-md rounded bg-sky-300 text-sky-800 focus:outline-none need-validation" onChange={(e)=> setRentalFormData({...rentalFormData, bedrooms: e.target.value}) } required={rentalFormData.classes != 'room'} disabled={rentalFormData.classes == 'room'}>
                    <option value="">How many?</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </label>
                <label className="w-full">
                  <span className="text-sky-800 font-semibold text-lg validation-sign after:text-red-500 after:ps-1 after:font-black">Bathrooms :</span>
                  <select className="w-full p-1.5 shadow-md rounded bg-sky-300 text-sky-800 focus:outline-none need-validation" onChange={(e)=> setRentalFormData({...rentalFormData,bathrooms: e.target.value})} required >
                    <option value="0">How many?</option>
                    {rentalFormData.classes == 'room'&& <option value="0">0</option> }
                    <option value="1" >1</option>
                    {rentalFormData.classes != 'room'&& <option value="2">2</option> }
                    {rentalFormData.classes != 'room'&& <option value="3">3</option> }
                    {rentalFormData.classes != 'room'&& <option value="4">4</option> }
                  </select>
                </label>
              </div>
            </div>
            <div className="w-full mt-3">
              <label className="w-full">
                <span className="text-sky-800 font-semibold text-lg">Description :</span>
                <textarea name="" id=""className="w-full p-2 shadow-md rounded resize-none bg-sky-300 text-sky-800 focus:outline-none" placeholder="(Optional)"  rows={7} cols={30} onChange={(e)=> setRentalFormData({...rentalFormData, description: e.target.value})}></textarea>
                <p className="text-sky-800"><span className=" font-semibold">Note:</span> Add description to attract more inquiries.</p>
              </label>
            </div>
          </div>
          <div className="flex w-full justify-between p-2 gap-5">
            <div className="w-full mt-3">
              <button className=" bg-sky-800 text-sky-200 xs:w-full md:w-56 p-2 rounded-md font-bold shadow-xl border-2 border-sky-800 hover:bg-sky-200 hover:text-sky-800 duration-200 transition ease-out">Submit</button>
            </div>
          </div>
        </form>
      )}
      {error && 
        <NotificationModal query={error} bg="bg-red-500" >
          You dont have permission to do that!
        </NotificationModal>
       } 
    </div>
  )
}

export default CreateRental
