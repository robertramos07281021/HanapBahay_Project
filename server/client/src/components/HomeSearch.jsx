import { useEffect, useState } from "react"
import { getRentalsPosts } from "../controllers/rentPostController"

const HomeSearch = () => {
  const [newData, setNewData] = useState([])

  useEffect(() => {
    let timer = setTimeout(async () => {
      const data = await getRentalsPosts()
      setNewData(data.rentals)
    })
    return ()=> clearTimeout(timer)
  }, [])

  const cities = []
  const price = []
  const bedrooms = []
  const types = []

  Array.from(newData).forEach(element => {
      if(!cities.includes(element.city)){
        cities.push(element.city)
      }
      if(!price.includes(element.price)){
        price.push(element.price)
      }
      if(!bedrooms.includes(element.bedrooms)) {
        bedrooms.push(element.bedrooms)
      }
      if(!types.includes(element.classes.toUpperCase())){
        types.push(element.classes.toUpperCase())
      }
  })

  const [searchTransition, setSearchTransition] = useState('xs:-translate-x-[30rem]')
  const handleOpenSearch = ()=> {
    setSearchTransition("xs:-translate-x-0")

  }
  const handleCloseSearch = ()=> {
    setSearchTransition("xs:-translate-x-[30rem]")
  }

  const rents = document.getElementsByClassName("rentals")
  const classes = document.getElementsByClassName('types')
  const city = document.getElementsByClassName('city')
  const amount = document.getElementsByClassName('price')
  const beds = document.getElementsByClassName('bedrooms')


  const handleSearchTypes = (value)=> {
    Array.from(classes).forEach((element,index) => {
      if(element.innerHTML != value && value != ""){
        if(!rents[index].classList.contains('hidden')){
          rents[index].classList.add('hidden')
        }
      } else {
        rents[index].classList.remove('hidden')
      }
    })
  }
  

  const handleSearchCity = (value)=> {
    Array.from(city).forEach((element,index) => {
      if(element.innerHTML.search(value) < 0 && value != ""){
        if(!rents[index].classList.contains('hidden')){
          rents[index].classList.add('hidden')
        }
      } else {
        rents[index].classList.remove('hidden')
      }
    })
  }




  const handleSearchPrice = (value) => {
    Array.from(amount).forEach((element,index) => {
      if(element.innerHTML != value && value != ""){
        if(!rents[index].classList.contains('hidden')){
          rents[index].classList.add('hidden')
        }
      } else {
        rents[index].classList.remove('hidden')
      }
    })
  }
  const handleSearchBedrooms = (value) => {
    Array.from(beds).forEach((element,index) => {
      if(element.innerHTML != value && value != ""){
        if(!rents[index].classList.contains('hidden')){
          rents[index].classList.add('hidden')
        }
      } else {
        rents[index].classList.remove('hidden')
      }
    })
  }



  return (
    <>
      <div className={`fixed top-24 z-30 left-2 rounded-full xs:flex lg:hidden flex items-center justify-center h-11 w-11 shadow-md text-white bg-sky-500 border  `} onClick={handleOpenSearch}> 
          <i className="bi bi-arrow-right-circle text-3xl h-full w-full flex items-center justify-center rounded-full "></i>
        </div>
        <div className={`md:w-96 xs:w-full xs:border lg:border-0 xs:h-96 lg:h-80 lg:sticky xs:fixed xs:left-0 xs:top-28 z-50 bg-white lg:top-28 rounded   xs:shadow-md md:shadow-none xs:pt-3 lg:pt-6 py-6 px-3 flex-col gap-5 ${searchTransition} lg:translate-x-0 relative transition duration-500 ease-out lg:flex flex`}>
        <i className="bi bi-x-circle text-3xl text-end xs:block lg:hidden" onClick={handleCloseSearch}></i>

        <label className="text-sm">
            <p className="font-semibold">Types :</p> 
          <select className="w-full border rounded p-1" onChange={(e)=> handleSearchTypes(e.target.value)}>
            <option value="" className="text-xs" >Select Type</option>
            {types.sort().map((classes, index)=> <option key={index} value={classes.toUpperCase()} className="text-xs">{classes.toUpperCase()}</option>)}
          </select>
        </label>
        <label className="text-sm">
        <p className="font-semibold">City :</p> 
          <select className="w-full border rounded p-1" onChange={(e)=> handleSearchCity(e.target.value)}>
            <option value="">Select City</option>
            {cities.sort().map((city,index) => <option key={index} value={city} className="text-xs">{city}</option>)}
          </select>
          
        </label>
        <label className="text-sm">
        <p className="font-semibold">Price :  &#x20B1;</p> 
          <select className="w-full border rounded p-1" onChange={(e)=> handleSearchPrice(e.target.value)}>
            <option value="" >Monthly Price</option>
            {price.sort((a,b)=> {return a-b}).map((monthly, index)=> <option key={index} value={monthly} className="text-xs">{monthly}</option>)}
          </select>
        </label>
        <label className="text-sm">
        <p className="font-semibold">Bedrooms :</p> 
          <select className="w-full border rounded p-1" onChange={(e)=> handleSearchBedrooms(e.target.value)}>
            <option value="">How many bedrooms</option>
            {bedrooms.sort().map((bedroom, index)=> <option key={index} className="text-xs">{bedroom}</option>)}
          </select>
        </label>
      </div>
    </>
  )
}

export default HomeSearch
