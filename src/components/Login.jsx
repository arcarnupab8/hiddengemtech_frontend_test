import React, { useState } from 'react'

import style from './css/members.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    password: ''
  })
  const [status, setStatus] = useState('');

  const handdleSubmit = async (e) =>{
    e.preventDefault();

    // console.log(data);
    try{

      const response = await axios.post('https://hiddengrmtech-backend-test.vercel.app/login', {
        username: data.username,
        password: data.password,
      });

      // console.log(response.data);
      // setStatus(response.data.message);
      localStorage.setItem('authToken', response.data.token);

      navigate('/');

    } catch (err) {
      console.log(err);
      setStatus(err.response.data.message);
    }
  }

  return (
    <div className={style.container}>
      <div className={style.backButton}>
        <img alt='Back Button' src='./member/backButton.svg' onClick={() => navigate('/')}/>
      </div>

      <div className={style.content}>

        <h1>Log In</h1>

        <form onSubmit={handdleSubmit}>
          <div>
            <label>Username</label>
            <input
              type='text'
              name='username'
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type='password'
              name='password'
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </div>

          <input type='submit' value=' Log In '/>
        </form>

        <div>
          <p>{status}</p>
        </div>
      </div>
      <div className={style.registerButton}>
        <p>Don’t have an account?</p>
        <Link to='/register'>{' '}Register</Link>
      </div>
    </div>
  )
}

export default Login