import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import { Navigate, Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; 
import { logout } from './redux/userSlice'
import Auth from './components/Auth'

const App = () => {

  const [isCollapsed,setIsCollapsed] = useState(false);

  const togglHandler = ()=>{
    setIsCollapsed(!isCollapsed);
  }
  const dispatch = useDispatch();
  const token = Cookies.get('access_token');
  const currentUser = useSelector((state) => state.user.username);


  const isTokenExpired = (token) => {
    if (!token) return true;
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
}

useEffect(() => {
    // Check token expiration on component mount
  
    if (isTokenExpired(token)) {
        dispatch(logout());
        Cookies.remove('access_token')
    }

    // Set up an interval to periodically check token expiration
    const intervalId = setInterval(() => {
        if (isTokenExpired(token)) {
            dispatch(logout());
            Cookies.remove('access_token')
        }
    }, 60000); // Check every minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
}, [token, dispatch]);



  return (
    <div className=''>
      <Header togglHandler={togglHandler}/>
      {
        currentUser ? <Outlet /> : <Auth/>
      }
    </div>
  )
} 

export default App
