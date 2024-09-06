import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const Loyout = () => {
  return (
    <>
      <header >
        <Navbar/>
      </header>
      <main className="mb-5 flex justify-center min-h-screen">
      <Outlet/>
      </main>
      <footer>
        <Footer/>
      </footer>
    </>

  )
}

export default Loyout
