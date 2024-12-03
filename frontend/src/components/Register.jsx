import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import de useNavigate
import './styles/Register.css';



export function Register(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
  
    const handleRegister = async (e) => {
      e.preventDefault();
      
      const registerData = { username, email, password };
  
      try {
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registerData),
        });
  
        if (response.ok) {
          const data = await response.json();
          if (data.error !== undefined) {
            return setErrorMessage(data.error);
          }
          // Stocke le JWT dans le localStorage
          localStorage.setItem('token', data[0]);
          localStorage.setItem('token',data[1])
          localStorage.setItem('is_login',true)
          await navigate('/');
          alert('register successful!');
          } else {
          setErrorMessage('username or password already exist');
          }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred during login');
      }
    };

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
      <div className="container_register" style={{ maxWidth: '400px', margin: 'auto' }}>
        <h2 className='title_register'>Register</h2>
        <form onSubmit={handleRegister}>
          <div>
            <label className="label_register">Username:</label>
            <input className="input_register"
              type="text"
              placeholder='Username'
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="label_register">Email:</label>
            <input className="input_register"
              type="text"
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="label_register">Password:</label>
            <input className="input_register"
              type="password"
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn_submit" type="submit">Register</button>
          {errorMessage && <p className="error-message" style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
      </div>
    );
  };