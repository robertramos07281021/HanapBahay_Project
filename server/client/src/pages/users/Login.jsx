import { useContext, useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import { loginUser } from "../../controllers/usersController"
import NotificationModal from "../../components/NotificationModal"

const Login = () => {



  const {setUser} = useContext(UserContext)

  const [transition, setTransition] = useState("opacity-0")
  setTimeout(()=> {
    setTransition("translate-y-64 opacity-100")
  })
  
  const [passEye, setPassEye] = useState(true)
  function handlePassEye() {
    setPassEye(!passEye)
  }

  const [error, setError] = useState(false)
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  async function handleLogin(e) {
    e.preventDefault()
    const form = document.querySelector('form')
    const input = document.getElementsByClassName('need-validation')
    const label = document.getElementsByClassName('inputLabel')
    if(!form.checkValidity()) {
      Array.from(input).forEach((element,index) => {
        if(!element.checkValidity()) {
          label[index].classList.add('after:content-["Required"]')
        } else {
          label[index].classList.remove('after:content-["Required"]')
        }
      })
    } else {
      try {
        await loginUser(email, password)
        setUser({email, rentals:[]})
        location.assign("/dashboard")
      } catch(error) {
        if(error.message == "This account is already login") {
          setAlreadyLoggedIn(true)
          setPassword("")
        } else {
          setError(true)
          setEmail("")
          setPassword("")
        }
        Array.from(label).forEach(element => {
          element.classList.remove('after:content-["Required"]')
        })
      }
    }

  
  }

  return (
    <div>
      { alreadyLoggedIn &&
        <NotificationModal bg="bg-red-500" query={alreadyLoggedIn} >
          This Account Is already loggin!.
        </NotificationModal>
      } 
      <form className={`absolute bottom-1/2 left-1/2 -translate-x-1/2 ${transition} border min-h-4/6 xs:w-full md:w-96 lg:w-3/12 bg-sky-500 p-10 flex flex-col items-center justify-center rounded-xl gap-5 shadow-xl duration-700 transition ease-in`} onSubmit={handleLogin} noValidate>
        <h1 className="text-white font-bold text-3xl">Log In</h1>

        <div className="w-full flex flex-col gap-5">
          <div className="h-5">
            { error && 
              <p className="text-center text-sm text-red-500 bg-white/40 font-bold drop-shadow-md  ">Email or Password incorrect </p>
            }
          </div>
          <label className="w-full relative">
            <span className="text-white font-bold text-xl after:text-red-500 after:text-xs after:ps-2 inputLabel">Email</span>
            <input type="email" className="w-full p-2 rounded drop-shadow-2xl need-validation" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
            <i className="bi bi-person-fill absolute top-8 right-2 text-lg mt-0.5"></i>
          </label>
          <label className="w-full relative">
            <span className="text-white font-bold text-xl after:text-red-500 after:text-xs after:ps-2 inputLabel">Password</span>
            <input type={passEye ? "password" : "text"} className="w-full p-2 rounded drop-shadow-2xl need-validation" value={password} onChange={(e)=> setPassword(e.target.value)} required/>
            {passEye ? 
              <i className="bi bi-eye-fill absolute top-8 right-2 text-lg mt-0.5" onClick={handlePassEye}></i>
              :<i className="bi bi-eye-slash-fill absolute top-8 right-2 text-lg mt-0.5" onClick={handlePassEye}></i>}
          </label>

          <button className="bg-sky-300 p-1 rounded-md text-sky-800 font-bold text-lg mt-5 drop-shadow-2xl hover:text-white hover:bg-sky-800 transition duration-300 ease-in-out">Login</button>
          <p className="text-center text-white font-semibold">Not a member? <a href="/register" className="text-sky-800 font-bold underline hover:text-white hover:scale-105 duration-300 transition ease-in-out">Sign up now</a></p>
        </div>

      </form>
    </div>
   

  )
}

export default Login
