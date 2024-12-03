// CreateUserForm.jsx
import React, { useState } from 'react';
import '../style/Admin_CSS.css';

export function EditUserForm({ onClose,username,email}) {
    const [user, setUser] = useState({
        new_username: '',
        email: '',
        password: '',
        username: username,
    });

    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const EditUser = async () => {
        if (!token) {
          setError('No token found, please login first.');
          return;
        }
        try {
            const response = await fetch(`http://localhost:5000/users`, {
              method: 'PUT',
              headers: {
                  "Content-Type": "application/json",
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({user}),
            });
      
            if (response.ok) {
              const updatedUser = await response.json();
              window.location.reload();
              console.log('User updated successfully:', updatedUser);
            } else {
              console.error('Error updating user:', response.statusText);
            }
          } catch (error) {
            console.error('Network error:', error);
          }
        };

      return (
          <div className="modal">
                <div className="modal-content">
                <h2>Edit This User:</h2>
              <form>
              <label className="label_profile" htmlFor="username">Username:</label>
              <input className="input_user"
                  type="text"
                  id="username"
                  value={user.new_username}
                  placeholder={username}
                  
                  onChange={(e) => setUser({ ...user, new_username: e.target.value })}
                  />
              <label className="label_profile" htmlFor="email">Email:</label>
              <input className="input_user"
                  type="email"
                  id="email"
                  placeholder={email}
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
              <label className="label_profile" htmlFor="password">Password:</label>
              <input className="input_user"
                  type="password"
                  id="password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  />
              <button className="btn_profile" type="submit" onClick={EditUser}>Update User</button>
                <button className="btn_profile" type="button" onClick={onClose}>Cancel</button>
          </form>
        </div>
    </div>
      );
  }
