import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';

import style from './css/noteContainer.module.css';
import axios from 'axios';

function NoteContainer({ NoteDoc, content, dateofmade, madeby, onEditClick, onViewDetails }) {
    const [data, setData] = useState({
      username: '',
      name: ''
    });
    const [open, setOpen] = useState(false);
    
    const date = new Date(dateofmade._seconds * 1000);
    const formattedDate = date.toLocaleString();

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
            name: decodedToken.name,
          })
        }
      }
      
      // console.log('Decoded Token:', decodedToken);
    }, []);

    const handleOpen = () =>{
      setOpen(!open);
    }

    const handleDelete = async () => {
      try {
        const response = await axios.delete(`https://hiddengrmtech-backend-test.vercel.app/deleteNote/${NoteDoc}`);
        console.log(response.data.message);
      } catch (err) {
        console.log(err);
      }
      window.location.reload();
    }

  return (
    <div className={style.container}>
        <h1 onClick={onViewDetails}>{NoteDoc}</h1>
        <p>{formattedDate}</p>
        <p>โดย: {madeby}</p>
        { madeby === data.name ? (
          <div className={style.Editmode}>
            <img 
              alt='edit Image' 
              src='./Notes/menuButton.svg' 
              onClick={handleOpen}
            />
            {open && (
              <div className={style.menuList}>
                <div onClick={onEditClick}> 
                  Edit
                </div>
                <div onClick={handleDelete}>
                  Delete
                </div>
              </div>
            )}
        </div>
        ):(
          <div>
          </div>
        ) }
    </div>
  )
}

export default NoteContainer