import { addInquiry } from '../controllers/rentPostController'
import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { PostsContext } from '../contexts/PostsContext'



const InquiryModal = (props) => {
  const {posts, setPosts} = useContext(PostsContext)



  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const newInquiry = {
    name: name,
    email: email,
    phone: phone
  }

  const [validName, setValidName] = useState()
  const [validEmail, setValidEmail] = useState()
  const [validPhone, setValidPhone] = useState()
  const [fieldsRequired, setFieldRequired] = useState(false)

  const handleAddInquiry = async(e) => {
    const formName = document.querySelector("input[type=text]").checkValidity()
    const formEmail = document.querySelector("input[type=email]").checkValidity()
    const formPhone = document.querySelector("input[type=tel]").checkValidity()


    if(!formName || !formEmail || !formPhone) {
      e.preventDefault()
      setValidName(!formName)
      setValidEmail(!formEmail)
      setValidPhone(!formPhone)
      setFieldRequired(true)
    } else {

      try {
        e.preventDefault()
        props.handleToggle()
        const data = await addInquiry(props.rents._id, newInquiry)
        const updatePosts = posts.filter((post)=> post._id !== props.rents._id)
        setPosts([...updatePosts, data.rents])
        props.thankModal()
      } catch (error) {
        console.log(error)
      }
    }
    
  }

  return (

    <div className={`w-full h-screen fixed left-0 -top-24 opacity-0 items-center justify-center z-50 ${props.transition} transition-all duration-1000`}>
      <div className='w-full h-screen flex items-center justify-center'>
        <form className="bg-white  md:w-2/3 lg:w-96 md:h-1/2 lg:h-4/6 flex flex-col items-center justify-center p-5 gap-5 rounded-md shadow-md shadow-sky-500" onSubmit={handleAddInquiry} noValidate> 
          <h1 className='text-3xl font-bold' >For Inquiry</h1>
            <div className=' w-full h-5'>
              {
                fieldsRequired && (<p className='text-xs text-end font-semibold text-red-500'>All fields are required.</p>)
              }
              
            </div>
          <label className='w-full'>
            <span className={`font-semibold ${validName && 'after:content-["*"]'} after:text-red-500`}>Name :</span> 
            <input type="text" className='w-full ring-2 p-1 rounded ring-sky-300' onChange={(e)=> setName(e.target.value)} required/>
          </label>
          <label className='w-full'>
          <span className={`font-semibold ${validEmail && 'after:content-["*"]'} after:text-red-500`}>Email :</span> 
          <input type="email" className='w-full ring-2 p-1 rounded ring-sky-300' pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" onChange={(e)=> setEmail(e.target.value)} required/>
          </label>
          <label className='w-full'>
          <span className={`font-semibold ${validPhone && 'after:content-["*"]'}  after:text-red-500`}>Contact No. :</span> 
          <input type="tel" className='w-full ring-2 p-1 rounded ring-sky-300' pattern="[0][9][0-9]{9}" onChange={(e)=> setPhone(e.target.value)} required/>
          </label>

        <div className='flex gap-5'>
          <button className='bg-sky-500 w-24 py-2 rounded-md border-2 border-sky-500 hover:bg-white hover:text-sky-500 duration-300 transition ease-in-out font-bold text-white'>Submit</button>
          <div className="bg-slate-500 py-2 w-24 text-center cursor-pointer rounded-md border-2 border-slate-500 hover:bg-white hover:text-slate-500 duration-300 transition ease-in-out font-bold text-white" onClick={props.handleToggle}>Cancel</div>
        </div>


        </form>
      </div>
    </div>

    

  )
}

InquiryModal.propTypes = {
  handleToggle: PropTypes.func,
  transition: PropTypes.string,
  rents: PropTypes.object,
  thankModal: PropTypes.func
}

export default InquiryModal
