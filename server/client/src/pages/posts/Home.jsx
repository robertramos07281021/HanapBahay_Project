/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect, useState } from "react"
import { getRentalsPosts } from "../../controllers/rentPostController"
import { PostsContext } from "../../contexts/PostsContext"
import Rentals from "../../components/Rentals"
import HomeCarousel from "../../components/HomeCarousel"
import HomeSearch from "../../components/HomeSearch"

const Home = () => {
  const { posts, setPosts } = useContext(PostsContext)

  
  useEffect(() => {
    let timer = setTimeout(async () => {
      const data = await getRentalsPosts()
      setPosts(data.rentals)
    })
    return ()=> clearTimeout(timer)
  }, [])

  const cities = []
  const price = []
  const bedrooms = []
  const types = []

  Array.from(posts).forEach(element => {
      if(!cities.includes(element.city)){
        cities.push(element.city)
      }
      if(!price.includes(element.price)){
        price.push(element.price)
      }
      if(!bedrooms.includes(element.bedrooms)) {
        bedrooms.push(element.bedrooms)
      }
      if(!types.includes(element.classes)){
        types.push(element.classes)
      }
  })

  const [homeTransition, setHomeTransition] = useState('opacity-0')
  setTimeout(()=> {
    setHomeTransition('opacity-100')
  },20)
  return (

    <div className={`flex flex-col w-full items-center ${homeTransition} duration-500 transition ease-in`}>
        <div className="absolute top-1/2 left-1/2 xs:-translate-y-1/2 md:-translate-y-80 lg:-translate-y-48 -translate-x-1/2 lg:w-auto xs:w-full z-10 xs:p-3 xs:py-10 xs:text-center text-white lg:p-16 lg:py-auto bg-sky-500/70 rounded shadow-2xl">
          <h1 className="xs:text-xl md:text-5xl lg:text-4xl font-black tracking-wider">Welcome To HanapBahay</h1>
        </div>
        <HomeCarousel/>
      <section className=" flex gap-5 xs:w-full xs:px-2 md:px-5 bg-white">
      <HomeSearch/>
        <div className="w-full flex flex-col gap-10">
          <div className="">
            <p className="xs:text-2xl md:text-4xl text-center font-semibold">Do you need a rent? Or Do you need tenant?</p>    
            <p className="text-center xs:text-xs md:text-base">We are here to help you to find a rental house, apartment, or even room. Or find tenants for your empty rentals. </p>
          </div>
        <div className="w-full grid lg:grid-cols-2 xs:gap-10 lg:gap-5 items-center">
          {posts && posts.map((post)=> <div key={post._id} className={`flex rentals`}>
            <Rentals rental={post}/>
          </div>)}
        </div>
        </div>
     </section>
    
    </div>
   
  )
}

export default Home
