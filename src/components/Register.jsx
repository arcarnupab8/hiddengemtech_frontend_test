import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import style from './css/members.module.css';
import axios from 'axios';

function Register() {

  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    password: '',
    cpassword: '',
    name: ''
  })
  const [status, setStatus] = useState('');

  const handdleSubmit = async (e) =>{
    e.preventDefault();

    if (data.password !== data.cpassword) {
      setStatus('Password not Match!');
      return;
    }

    try{

      const response = await axios.post('https://hiddengrmtech-backend-test.vercel.app/register', {
        username: data.username,
        password: data.password,
        name: data.name,
      });

      // console.log(response.data);
      setStatus(response.data.message);

    } catch (err) {
      // console.log(err.response.data.message);
      setStatus(err.response.data.message);
    }
  }

  return (
    <div className={style.container}>
      <div className={style.backButton}>
        <img alt='Back Button' src='./member/backButton.svg' onClick={() => navigate('/')}/>
      </div>

      <div className={style.content}>

        <h1>Register</h1>

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

          <div>
            <label>Confirm Password</label>
            <input
              type='password'
              name='cpassword'
              value={data.cpassword}
              onChange={(e) => setData({ ...data, cpassword: e.target.value })}
              required
            />
          </div>

          <div>
            <label>Name</label>
            <input
              type='text'
              name='name'
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
            />
          </div>

          <input type='submit' value=' Register '/>

          <div>
            <p>{status}</p>
          </div>
        </form>

      </div>
      <div className={style.registerButton}>
        <p>Do you already have an account?</p>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  )
}

export default Register