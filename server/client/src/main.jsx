import React from 'react'
// import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client"
import PostProvider from './contexts/PostsContext.jsx'
import App from './App.jsx'
import UserProvider from './contexts/UserContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PostProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </PostProvider>
  </React.StrictMode>,
)
