/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState,useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { getRegions, getCity, updateRental } from "../../controllers/rentPostController"
import NotificationModal from "../../components/NotificationModal"
import ConfirmationModal from "../../components/ConfirmationModal"

const UpdateRental = () => {
  const {state} = useLocation()

  const [formTransition, setFormTransition] = useState('-translate-y-5 opacity-0')
  setTimeout(()=> {
    setFormTransition("translate-y-0 opacity-100")
  })
  const [images, setImages] = useState([])
  const [newFormData, setNewFormData] = useState({
    address1 : state.address1,
    address2 : state.address2,
    region : state.region,
    city: state.city,
    classes: state.classes,
    price: state.price,
    bedrooms: state.bedrooms,
    bathrooms: state.bathrooms,
    description: state.description,
  })



  const [regionArray, setRegionArray] = useState([])
  const [cityArray, setCityArray] = useState([])
 
  useEffect(()=> {
    let timer = setTimeout(async () => {
      const newRegionArray = []
      const res = await getRegions()
      setRegionArray(res)
      res.forEach(element => {
        newRegionArray.push(element)
      });
      const cityValues = newRegionArray.filter(element => element.name === state.region)
      const cityRes = await getCity(cityValues[0].code)
      setCityArray(cityRes)
    })
      return ()=> clearTimeout(timer)
  },[])
  
  const navigate = useNavigate()

  async function handleSubmit(e){
    const invalid = []
    e.preventDefault()
    const input = document.getElementsByClassName('need-validation')
    const label = document.getElementsByClassName('validation-sign')
    const imageInput = document.getElementById('images')
    const imageLabel = document.getElementById('imagesLabel')

    Array.from(input).forEach((element,index)=> {
      if(!element.checkValidity()) {
        if(!invalid.includes(index)) {
          invalid.push(index)
        }
      }
    })
    Array.from(label).forEach((element, index) => {
      if(index < 5) {
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

    if(e.target.checkValidity() && (imageInput.files.length == 4 || imageInput.files.length == 0) ){
      imageLabel.classList.remove("after:content-['*']")
      if(newFormData.classes == 'room') {
        setNewFormData({...newFormData, bedrooms: 0})
      }
      setUpdateRented(true)
    } else {
      imageLabel.classList.add("after:content-['*']")
    }
  }

  const [updateRented, setUpdateRented] = useState(false)
  const [transition, setTransision] = useState(false)
  const [error, setError] = useState(false)
  const [uploading, setUploading ] = useState(false)

  async function handleUpdateSubmit() {
    try {
      setUploading(true)
      setUpdateRented(false)
      const res = await updateRental(state._id,newFormData.address1, newFormData.address2, newFormData.region, newFormData.city, newFormData.classes, newFormData.price, newFormData.bedrooms, newFormData.bathrooms, newFormData.description, images)
      setTimeout(()=> {
        navigate("/dashboard?rent_updated=true")
      },300)
    } catch (error) {
      setUpdateRented(false)
      setUploading(false)
      setError(error)
    }
  }
  function handleCancelUpdateRented() {
    setTransision(true)
    setTimeout(()=> {
      setUpdateRented(false)
      setTransision(false)
    },800)
  }

  async function handleRegion(name) {
    setNewFormData({...newFormData, region: name})
    const getTheCity = regionArray.filter(element=> element.name === name)
    const cityRes = await getCity(getTheCity[0].code)
    setCityArray(cityRes)
  }
    
  return (
    <div className="flex items-center w-screen justify-center h-full xs:pt-24 md:pt-28 lg:pt-32 lg:pb-4">
      {updateRented && 
        <ConfirmationModal cancelModal={handleCancelUpdateRented} modalTransition={transition} submit={handleUpdateSubmit} submitButton="orange" buttonValue="Update" cancelSubmit="slate">
          <p className="text-2xl font-bold">Update Confirmation</p>
          <p className="text-base font-semibold text-justify indent-5">Are you sure you want to update this rented? The previous data is unavalable if you confirm.</p>
        </ConfirmationModal>
      }
    {uploading ?
    (  
      
      <div className="w-screen h-screen fixed top-0 left-0 bg-white z-50">
        <i className="bi bi-house-fill text-5xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 after:animate-spin-slow after:absolute after:border-8 after:w-20 after:h-20 after:left-0 after:top-0 px-4 pt-3 text-sky-500 after:rounded-full after:border-dotted after:border-sky-500"></i>
      </div>
        ) :
    (
      <form className={`lg:w-9/12 2xl:8/12 xs:w-full border border-sky-300 rounded-md p-5 shadow-lg ${formTransition} transition duration-700 ease-out`}  noValidate onSubmit={handleSubmit}>
      <p className="text-center mb-5 text-3xl font-bold text-orange-300">Update Rentals</p>
      <div className="lg:flex xs:grid xs:grid-cols-1 justify-between pe-2">
        <div className=" p-2 w-full flex flex-col gap-5 xs:order-2 lg:order-1">
          <label className="w-full">
            <span className="text-sky-800 font-semibold text-lg validation-sign after:text-red-500 after:ps-1 after:font-black">Address 1 :</span>
            <input type="text" className="w-full p-2 shadow-md rounded bg-sky-300 text-sky-800 focus:outline-none need-validation" maxLength={30} defaultValue={newFormData.address1} onChange={(e)=> setNewFormData({...newFormData,address1: e.target.value})} required/>
          </label>
          <label className="w-full">
            <span className="text-sky-800 font-semibold text-lg  validation-sign after:text-red-500 after:ps-1 after:font-black">Address 2 :</span>
            <input type="text" className="w-full p-2 shadow-md rounded bg-sky-300 text-sky-800 focus:outline-none need-validation" maxLength={30} defaultValue={newFormData.address2} onChange={(e)=> setNewFormData({...newFormData,address2: e.target.value})} required/>
          </label>
          <div className="flex xs:flex-col md:flex-row lg:flex-row gap-5">
            <label className="w-full">
              <span className="text-sky-800 font-semibold text-lg validation-sign after:text-red-500 after:ps-1 after:font-black">Region :</span>
              <select className="w-full p-2 shadow-md rounded bg-sky-300 text-sky-800 focus:outline-none need-validation" value={newFormData.region} onChange={(e)=> {handleRegion(e.target.value)}} required>
                <option value="">Select Region</option>
                {regionArray.map((region, index)=> <option key={index} value={region.name} >{region.name}</option>)}
              </select>
            </label>
            <label className="w-full">
              <span className="text-sky-800 font-semibold text-lg validation-sign after:text-red-500 after:ps-1 after:font-black">City :</span>
              <select className="w-full p-2 shadow-md rounded bg-sky-300 text-sky-800 focus:outline-none need-validation" value={newFormData.city} onChange={(e)=> setNewFormData({...newFormData, city: e.target.value})} required>
                <option value="" >Select City</option>
                {cityArray.map((city,index)=> <option key={index} value={city.name}>{city.name}</option>)}
              </select>
            </label>
          </div>
        </div>
        <div className="xs:order-1 lg:order-2 flex items-center xs:justify-center xl:justify-end w-full ">
          <div className="flex flex-col xs:items-center w-full">
            <label className="w-56 h-56 rounded-md border-4 border-dashed border-sky-300 flex items-center justify-center cursor-cell">
              <div className="flex items-center justify-center rounded-full bg-sky-200 w-32 h-32 flex-col">
                <i className="bi bi-file-earmark-arrow-up-fill text-4xl text-sky-300  "></i>
                <span className="text-sky-300 font-black">Upload</span>
              </div>
              <input type="file"  id='images'  accept="image/png, image/jpeg" multiple hidden onChange={(e)=> setImages(e.target.files)}/>
            </label>
            <p className="text-sky-800 font-semibold after:text-red-500 after:ps-1 after:font-black" id="imagesLabel">Selected images: <span className="font-normal">{images.length}</span></p>
            <p className="text-sky-800 text-base xs:px-5 xs:text-center lg:px-10"><span className="font-semibold ">Note:</span> <span className="text-xs">Please add 4 images or do not add to save the old images. Then rename your images from 1 to 4.</span></p>
          </div>
        </div>
      </div> 
      <div className="flex lg:flex-row xs:flex-col justify-between w-full p-2 gap-5 mt-3">
        <div className="w-full flex flex-col gap-5">
          <fieldset className="flex gap-5">
            <legend className="text-sky-800 font-semibold text-lg validation-sign after:text-red-500 after:ps-1 after:font-black">Type :</legend>
            <label >
              <input type="radio" name="type" value="house" className="align-middle mr-1 w-[unset] need-validation" defaultChecked={newFormData.classes == "house"} required onChange={(e)=> setNewFormData({...newFormData, classes: e.target.value})}/>
              House
            </label>
            <label >
              <input type="radio" name="type" value="apartment" className="align-middle mr-1 w-[unset] need-validation" defaultChecked={newFormData.classes == "apartment"} required onChange={(e)=> setNewFormData({...newFormData, classes: e.target.value})}/>
              Apartment
            </label>
            <label >
              <input type="radio" name="type" value="room" className="align-middle mr-1 w-[unset] need-validation" defaultChecked={newFormData.classes == "room"} onClick={(e)=> setNewFormData({...newFormData, classes: e.target.value})} required />
              Room
            </label>
          </fieldset>
          <label className="w-full">
            <span className="text-sky-800 font-semibold text-lg validation-sign after:text-red-500 after:ps-1 after:font-black">Price :</span>
            <input type="number" className="w-full p-2 shadow-md rounded bg-sky-300 text-sky-800 need-validation focus:outline-none" defaultValue={newFormData.price} min='1' onChange={(e)=> setNewFormData({...newFormData, price: e.target.value})}  required/>
          </label>
          <div className="w-full flex gap-5">
            <label className="w-full">
              <span className="text-sky-800 font-semibold text-lg validation-sign after:text-red-500 after:ps-1 after:font-black">Bedrooms :</span>
              <select className="w-full p-1.5 shadow-md rounded bg-sky-300 text-sky-800 focus:outline-none need-validation" defaultValue={newFormData.bedrooms} onChange={(e)=> setNewFormData({...newFormData, bedrooms: e.target.value})} required={newFormData.classes != 'room'} disabled={newFormData.classes == 'room'} >
                <option disabled>How many?</option>
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
              <select className="w-full p-1.5 shadow-md rounded bg-sky-300 text-sky-800 focus:outline-none need-validation" defaultValue={newFormData.bathrooms} onChange={(e)=> setNewFormData({...newFormData, bathrooms: e.target.value})} required>
                <option disabled>How many?</option>
                {newFormData.classes == 'room'&& <option value="0">0</option> }
                <option value="1">1</option>
                {newFormData.classes != 'room'&& <option value="2">2</option> }
                {newFormData.classes != 'room'&& <option value="3">3</option> }
                {newFormData.classes != 'room'&& <option value="4">4</option> }
              </select>
            </label>
          </div>
        </div>
        <div className="w-full mt-3">
          <label className="w-full">
            <span className="text-sky-800 font-semibold text-lg">Description : <span className="text-slate-300 text-base">(Optional)</span></span>
            <textarea name="" id=""className="w-full p-2 shadow-md rounded resize-none bg-sky-300 text-sky-800 focus:outline-none" placeholder="(Optional)"  rows={7} cols={30} defaultValue={newFormData.description} onChange={(e)=> setNewFormData({...newFormData, description: e.target.value})} ></textarea>
            <p className="text-sky-800"><span className=" font-semibold">Note:</span> Add description to attract more inquiries.</p>
          </label>
        </div>
      </div>
      <div className="flex w-full justify-between p-2 gap-5">
        <div className="w-full flex xs:gap-5 lg:gap-10 mt-3 ">
          <button className=" bg-orange-500 text-white xs:w-full md:w-56 p-2 rounded-md font-bold shadow-xl border-2 border-orange-500 hover:bg-orange-200 hover:text-orange-500 duration-200 transition ease-out">Update</button>
          <Link to="/dashboard" className="xs:w-full md:w-56">
        
          <button className=" bg-slate-500 text-white xs:w-full md:w-56 p-2 rounded-md font-bold shadow-xl border-2 border-slate-500 hover:bg-slate-200 hover:text-slate-500 duration-200 transition ease-out">Cancel</button>
          </Link>
        </div>
      </div>

    </form>
    )}
    
    { error && 
      <NotificationModal query={error} text="text-white" bg="bg-red-500">
        You dont have permission to do that!
      </NotificationModal>
    }
  </div>
  )
}

export default UpdateRental
