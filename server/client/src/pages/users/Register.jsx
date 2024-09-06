import { registerUser } from "../../controllers/usersController"
import { useContext, useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import { useNavigate } from "react-router-dom"


const Register = () => {
  const [transition, setTransition] = useState("opacity-0")

  const {setUser} = useContext(UserContext)
  const navigate = useNavigate()

  setTimeout(()=> {
    setTransition("translate-y-72 opacity-100")
  })

  const [inputTypePass, setInputTypePass] = useState("password")

  const [eyePass, setEyePass] = useState(true)
  function passwordEyeToggle() {
    setEyePass(!eyePass)
    if(!eyePass){
      setInputTypePass("password")
    } else {
      setInputTypePass("text")
    }
  }

  const [inputTypeConfirmPass, setinputTypeConfirmPass] = useState("password")
  const [eyeConfirmPass, setEyeConfirmPass] = useState(true)
  function confirmPasswordEyeToggle() {
    setEyeConfirmPass(!eyeConfirmPass)
    if(!eyeConfirmPass){
      setinputTypeConfirmPass("password")
    } else {
      setinputTypeConfirmPass("text")
    }
  }

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordValid, setPasswordValid] = useState("invisible")
  const [confirmPasswordValid, setConfirmPasswordValid] = useState("invisible")
  const [emailValid, setEmailValid] = useState('invisible')
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    const registerForm =  document.querySelector('form')

    if(password === "" || password.length < 8 || password.length > 16 ) {
      setPasswordValid("")
    } else {
      setPasswordValid("invisible")
    }

    if(email === "" || !document.querySelector("input[type=email]").checkValidity()) {
      setEmailValid("")
    } else {
      setEmailValid("invisible")
    }

    if(registerForm.checkValidity() && confirmPassword === password && confirmPassword !== "" && confirmPassword.length >= 8 && confirmPassword.length <= 16  && password !== "" && password.length >= 8 && password.length <= 16) {
      try {
        await registerUser(email, password, confirmPassword)
        setUser({email: email, rentals: []})
        navigate("/dashboard")
      } catch (error) {
        setError(error)
      }
      console.log(error)
      setConfirmPasswordValid("invisible")
      setPasswordValid("invisible")
    }
  
    if(confirmPassword === "" || confirmPassword !== password) {
      setConfirmPasswordValid("")
    } else {
      setConfirmPasswordValid("invisible")
    }
  }


  return (
    <form className={`xs:w-full md:w-4/6 lg:w-3/6 xl:w-2/6 h-[500px] absolute bottom-1/2 left-1/2 -translate-x-1/2 ${transition} flex items-center justify-center border duration-500 transition ease-in bg-sky-500 rounded-xl flex-col xs:p-3 md:p-5 lg:p-10 gap-5 shadow-lg`} noValidate onSubmit={handleSubmit}>
      <h1 className="text-white font-bold text-3xl">Registration</h1>
      <div className="w-full flex flex-col gap-1">
        <label className="w-full relative">
          <span className="xs:text-xl lg:text-2xl font-semibold text-white drop-shadow-2xl">Email </span>
          <input type="email" className="w-full p-2 rounded-md shadow-md focus:ring-0 " pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" onChange={(e)=> setEmail(e.target.value)} required />
          <p className={`text-xs h-4 text-red-500 font-semibold ${emailValid} bg-white/50 mt-1 `}>Email address is invalid</p>
        </label>
        <label className="w-full relative">
          <span className="xs:text-xl lg:text-2xl font-semibold text-white drop-shadow-2xl">Password </span> <span className="text-[0.7em] text-slate-300">Must be 8-16 character and no special character.</span>
          <input type={inputTypePass} className={`w-full p-2 rounded-md shadow-md`} pattern="[A-Za-z0-9]{8,16}" onChange={(e)=> setPassword(e.target.value)} required />
          <p className={`text-xs h-4 text-red-500 font-semibold ${passwordValid} bg-white/50 mt-1`}>Password is invalid</p>
          <div className="absolute lg:top-9 xs:top-8 right-2 text-2xl">
            { eyePass ? 
            <i className="bi bi-eye-fill" onClick={passwordEyeToggle}></i>
            : <i className="bi bi-eye-slash-fill" onClick={passwordEyeToggle}></i>}
          </div>
        </label>
        <label className="w-full relative">
          <span className="xs:text-xl lg:text-2xl font-semibold text-white drop-shadow-2xl">Confirm Password </span>
          <input type={inputTypeConfirmPass} className="w-full p-2 rounded-md shadow-md" onChange={(e)=> setConfirmPassword(e.target.value)} required/>
          <p className={`text-xs h-4 text-red-500  font-semibold bg-white/50 mt-1 ${confirmPasswordValid}`}>Confirm password not match or required </p>
          <div className="absolute lg:top-9 xs:top-8 right-2 text-2xl">
          { eyeConfirmPass ? 
            <i className="bi bi-eye-fill" onClick={confirmPasswordEyeToggle}></i>
            : <i className="bi bi-eye-slash-fill" onClick={confirmPasswordEyeToggle}></i>}
          </div>
        </label>

        <button className="w-full p-2 mt-5 rounded-md border-2 border-sky-300 text-sky-800 font-black text-1xl bg-sky-300 hover:text-white hover:border-sky-800 hover:bg-sky-800 transition duration-500 ease-in-out shadow-md ">Sign Up</button>
      </div>
    </form>

  )
}

export default Register
