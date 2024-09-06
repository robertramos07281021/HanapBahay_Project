/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, createContext } from "react"

export const PostsContext = createContext();

const PostProvider = ({children}) => {
  const [posts, setPosts] = useState([])
  return (
    <div>
      <PostsContext.Provider value={{posts, setPosts}}>
        {children}
      </PostsContext.Provider>
    </div>
  )
}

export default PostProvider
