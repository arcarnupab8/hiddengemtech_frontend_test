import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';

import style from './css/popup.module.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Addnote({ onClose }) {
  const [data, setData] = useState({
    id: '',
    content: '',
    dateofmade: '',
    madeby: ''
  });
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

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
          ...data,
          dateofmade: currentTime,
          madeby: decodedToken.name,
        })
      }
    }
    
    // console.log('Decoded Token:', decodedToken);
  }, []);

  
  const handleSubmit = async (e) =>{
    e.preventDefault();

    try{

      const response = await axios.post('/api/addNote', {
        id: data.id,
        content: data.content,
        dateofmade: data.dateofmade,
        madeby: data.madeby
      });

      // console.log(response.data);
      setStatus(response.data.message);

    } catch (err) {
      // console.log(err.response.data.message);
      setStatus(err.response.data.message);
    }
    window.location.reload();
  }
  return (
    <div className={style.container}>
      <img 
        className={style.backButton}
        alt='Back Button'  
        src='./popup/backButton.svg' 
        onClick={onClose}
      />
      <div className={style.content}>
        <h1>Add Note</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Head Note</label>
            <input
              type='text'
              value={data.id}
              onChange={(e) => setData({
                ...data,
                id: e.target.value
              })}
            />
          </div>

          <div>
            <label>Content</label>
            <textarea
              cols={40}
              rows={4}
              value={data.content}
              onChange={(e) => setData({
                ...data,
                content: e.target.value
              })}
            />
          </div>

          <input type='submit' value=' Add+ '/>

          <div>
            <p>{status}</p>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Addnote