import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';

import style from './css/popup.module.css'
import axios from 'axios';

function Editnote({ id, onClose }) {
    const [data, setData] = useState({
        id: id,
        content: '',
        dateofmade: '',
        madeby: '',
        newcontent: ''
    });
    const [status, setStatus] = useState('');

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
            setData(prevData => ({
                ...prevData,
                madeby: decodedToken.username,
            }));
          }
        }

        const fetchNote = async () => {
            try{
              const response = await axios.post('https://hiddengrmtech-backend-test.vercel.app/getNoteInfo', {
                id
              });
        
              setData({
                ...data,
                content: response.data.content,
                newcontent: response.data.content
              })
        
            } catch (err) {
              console.log(err);
            }
        }
        fetchNote();
        
        // console.log('Decoded Token:', decodedToken);
      }, [id]);


    const handleSubmit = async (e) =>{
        e.preventDefault();
    
        const currentTime = Date.now() / 1000;
        // console.log(data);
        try{
    
          const response = await axios.post('https://hiddengrmtech-backend-test.vercel.app/updateNote', {
            id: data.id,
            oldcontent: data.content,
            newcontent: data.newcontent,
            dateofedit: currentTime
          });
    
          setStatus(response.data.message);
    
        } catch (err) {
          // console.log(err.response.data.message);
          setStatus(err.response.data.message);
        }

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
            <h1>Edit Note : {data.id}</h1>

            <form onSubmit={handleSubmit}>

            <div>
                <label>Content</label>
                <textarea
                cols={40}
                rows={4}
                value={data.newcontent}
                onChange={(e) => setData({
                    ...data,
                    newcontent: e.target.value
                })}
                />
            </div>

            <input type='submit' value=' Submit '/>

            <div>
                <p>{status}</p>
            </div>
            </form>

        </div>
    </div>
  )
}

export default Editnote