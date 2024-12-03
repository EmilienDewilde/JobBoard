import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import de useNavigate
import './styles/Login.css';



export function Login({}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      
      const loginData = { username, password };
  
      try {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });
  
        if (response.ok) {
          const data = await response.json();
          if (data.error !== undefined) {
            return setErrorMessage(data.error);
          }
          // Stocke le JWT dans le localStorage
          localStorage.setItem('token', data.token);
          localStorage.setItem('myId',data.myId)
          localStorage.setItem('is_login',true)
          console.log("heoge")
          await navigate('/');
          alert('Login successful!');
          } else {
          setErrorMessage('Invalid username or password');
          }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred during login');
      }
    };

    const is_login = localStorage.getItem('is_login');
    console.log("dazdz",is_login)


    if (localStorage.getItem('token') !== null || localStorage.getItem('is_login') == 'true') {
      return(
        <div className="container">
          <h1>403</h1>
          <p>You are already Loged in</p>
          <a href="/">Go Back to Home</a>
        </div>
      )
    }
    return (
      <div className="container_login" style={{ maxWidth: '400px', margin: 'auto' }}>
        <h2 className='title_login'>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label className="label_login">Username:</label>
            <input className="input_login"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              />
          </div>
          <div>
            <label className="label_login">Password:</label>
            <input className="input_login"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />
          </div>
          <button className="btn_submit" type="submit">Login</button>
            {errorMessage && <p className="error-message" style={{ color: 'red' }}>{errorMessage}</p>}
          <p className="text_login">Register<a href="/Register"> here</a></p>
        </form>
      </div>
    );
  };