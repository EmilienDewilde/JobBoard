import React, { useState, useEffect } from 'react';
import './styles/Profile.css';
import DropdownMenu from './DropMenu';



export function Profile(){
    const [user_id, setUser_id] = useState(1);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const is_admin = localStorage.getItem('is_admin');
    const is_login = localStorage.getItem('is_login');  
    const page = 'profile';
     


    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    });
    
    useEffect(() => {
        const token = localStorage.getItem('token');


        if (!token) {
            setErrorMessage('No token found, please login first.');
            return;
        }

        const fetchUserData = async () => {
          try {
            const response = await fetch(`http://localhost:5000/users/me`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                    

                }
            }
            
        );
        if (response.ok) {
              const data = await response.json();
              setUser_id(data.id);
              setUsername(data.username);
              setEmail(data.email);
              setLoading(false);
            } else {
              setError('Failed to fetch user data');
              setLoading(false);
            }
          } catch (err) {
            setError('Network error');
            setLoading(false);
          }
        };
        fetchUserData();
    });
    
    // requete PUT
    
    const handleSubmit = async (e) => {
        const token = localStorage.getItem('token');
        e.preventDefault();
    
        try {
          const response = await fetch(`http://localhost:5000/users/${user_id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({user}),
          });
    
          if (response.ok) {
            const updatedUser = await response.json();
            console.log('User updated successfully:', updatedUser);
          } else {
            console.error('Error updating user:', response.statusText);
          }
        } catch (error) {
          console.error('Network error:', error);
        }
      };


    if (localStorage.getItem('token') === null) {
      return(
        <div className="container">
          <h1>404</h1>
          <p>Oops! The page you're looking for doesn't exist.</p>
          <a href="/Login">Login</a>
      </div>
      )
    }
    return (
          <>
          <header className="header-bar">
          <div className='header-content'>
            <DropdownMenu is_admin={is_admin} is_login={is_login} page={page}/>
            <h1 className='title'>Profile</h1>
          </div>
        </header>
        <div className="container_profile">

            <form>
            <div className="box_profile">
            <label className="label_profile" htmlFor="username">Username:</label>
            <input className="input_profile"
                type="text"
                id="username"
                value={user.username}
                placeholder={username}
                
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                required
                />
            </div>
            <div className="box_profile">
            <label className="label_profile" htmlFor="email">Email:</label>
            <input className="input_profile"
                type="email"
                id="email"
                placeholder={email}
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
                />
            </div>
            <div className="box_profile">
            <label className="label_profile" htmlFor="password">Password:</label>
            <input className="input_profile"
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
                />
            </div>
            <button className="btn_profile" type="submit" onClick={handleSubmit}>Update User</button>
        </form>
    </div>
    </>
    );
}