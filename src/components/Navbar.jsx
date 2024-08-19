import React, { useEffect, useState } from 'react'

import style from './css/navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
 
function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [data, setData] = useState({
    username: '',
    name: '',
  });
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if(!token){
      console.log('Not authentication.');
      return
    }
    else{
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('authToken');
        console.log('Token expired. Logging out.');
        navigate('/login'); 
      }
      else{
        setData({
          username: decodedToken.username,
          name: decodedToken.name
        })
      }
    }
    
    // console.log('Decoded Token:', decodedToken);
  }, []);

  const handleLogout = () =>{
    localStorage.removeItem('authToken');
    window.location.reload();
  }

  return (
    <div className={style.container}>
        <div className={style.logoContent}>
            <img alt='Logo Image' src='./Navbar/notebook_fill-1.svg'/>
            <Link to='/'>Notes</Link>
        </div>

        <div className={style.functionsContent}>
            <Link to='/history'>History</Link>
        </div>

        <div className={style.userAuth}>
            <img alt='UserImage' src='./Navbar/User_circle.svg'/>
            {data.name ? (
              <div>
                <p>{data.name}</p>
                <img 
                  alt='LogOut Icon' 
                  src='./Navbar/Sign_out_squre.svg'
                  onClick={handleLogout}
                />
              </div>
            ):(
              <Link to='/login'>Login</Link>
            )}
        </div>

        <div className={style.bugerBar}>
          <img alt='Menu' src='./Navbar/Menu.svg' onClick={toggleSidebar}/>
        </div>

        <div className={`${style.sidebar} ${isSidebarOpen ? style.open : ''}`} onClick={toggleSidebar}>
          <div className={style.sidebarContent}>
            <Link to='/history' onClick={toggleSidebar}>History</Link>
            {data.name ? (
              <div onClick={handleLogout}>
                <p>{data.name}</p>
                <img 
                  alt='LogOut Icon' 
                  src='./Navbar/Sign_out_squre.svg'
                />
              </div>
            ):(
              <Link to='/login'>Login</Link>
            )}
          </div>
        </div>
    </div>
  )
}

export default Navbar