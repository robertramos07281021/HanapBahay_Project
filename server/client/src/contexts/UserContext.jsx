/* eslint-disable react/prop-types */
import { useState, createContext } from "react"

export const UserContext = createContext()

const UserProvider = ({children}) => {

  const [user, setUser] = useState({
    email: localStorage.getItem('email'),
    rentals: []
  })
  return <UserContext.Provider value={{user, setUser}}>
    {children}
  </UserContext.Provider>
}

export default UserProvider
