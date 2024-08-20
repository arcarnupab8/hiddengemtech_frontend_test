import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './css/noteDetails.module.css';

function NoteDetails({ id, onClose }) {
  const [data, setData] = useState({
    content: '',
    Dateofmade: '',
    madeby: ''
  });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.post('https://hiddengrmtech-backend-test.vercel.app/getNoteInfo', { id });
        setData({
          content: response.data.content,
          Dateofmade: response.data.Dateofmade,
          madeby: response.data.madeby
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchNote();
  }, [id]);
  // console.log(data)

  return (
    <div className={style.container}>
      <img 
        className={style.backButton}
        alt='Back Button'  
        src='./popup/backButton.svg' 
        onClick={onClose}
      />
      <div className={style.content}>
        <h1>Note Details</h1>
        <div className={style.info}>
          <p>
            <strong>ID:</strong> 
            {id}
          </p>
          <p>
            <strong>Content:</strong> 
            {data.content}
          </p>
          <p>
            <strong>Date Made:</strong> 
            {new Date(data.Dateofmade._seconds * 1000).toLocaleString()}
          </p>
          <p>
            <strong>Made By:</strong> 
            {data.madeby}
          </p>
        </div>
      </div>
    </div>
  );
}

export default NoteDetails;
