import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

import style from './css/history.module.css';
import { useNavigate } from 'react-router-dom';


function History() {
  const [logs, setLogs] = useState([]);
  const [data, setData] = useState({
    username: '',
    name: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem('authToken');
    if(!token){
      console.log('Not authentication.');
      setAuth(true);
      setLoading(false);
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
  }, [navigate]);
  // console.log(logs)

  useEffect(() => {
    if (data.name) { // Ensure data.name is available
      const fetchLogs = async () => {
        try {
          const response = await axios.post('https://hiddengrmtech-backend-test.vercel.app/getAllHistories', {
            name: data.name
          });
          setLogs(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchLogs();
    }
  }, [data.name]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Not found histories.</p>;
  if (auth) return <p>Not have authentication.</p>;

  return (
    <div className={style.container}>
      <h1>History</h1>
      {logs.length > 0 ? (
        <table className={style.table}>
          <thead>
            <tr>
              <th>NoteID</th>
              <th>OLD Content</th>
              <th>Date Edit</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id}>
                <td>{log.NoteId}</td>
                <td>{log.oldContent}</td>
                <td>
                  {log.Dateofedit
                    ? new Date(log.Dateofedit).toLocaleString()
                    : 'No Date'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No logs available.</p>
      )}
    </div>
  )
}

export default History