import { BrowserRouter,Routes, Route } from "react-router-dom"
import Layout from "../src/pages/Loyout"
import Home from "./pages/posts/Home"
import Showrents from "./pages/posts/Showrents"
import Register from "./pages/users/Register"
import Login from "./pages/users/Login"
import AuthRoutes from "./routes/AuthRoutes"
import GuestRoutes from "./routes/GuestRoutes"
import UserDashboard from "./pages/users/UserDashboard"
import CreateRental from "./pages/users/CreateRental"
import UpdateRental from "./pages/users/UpdateRental"
import AboutUs from "./pages/posts/AboutUs"
import Contact from "./pages/posts/Contact"

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="show" element={<Showrents/>}/>
          <Route path="about" element={<AboutUs/>}/>
          <Route path="contact" element={<Contact/>}/>

          <Route element={<AuthRoutes/>}>
            <Route path="dashboard" element={<UserDashboard/>}/>
            <Route path="add" element={<CreateRental/>}/>
            <Route path="update" element={<UpdateRental/>}/>
          </Route>

          <Route element={<GuestRoutes/>}>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
          </Route>


        </Route>
      </Routes>
    </BrowserRouter>
  
  )
}

export default App
