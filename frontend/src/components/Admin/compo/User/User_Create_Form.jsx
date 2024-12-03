import React, { useState } from 'react';
import '../style/Admin_CSS.css';

export function CreateUserForm({ onClose }) {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const CreateUser = async () => {
        if (!token) {
          setError('No token found, please login first.');
          return;
        }
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:5000/users`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData),
          });
          
          if (response.ok) {
            const data = await response.json();
            alert(data.message);
            window.location.reload();
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onClose();  // Ferme le formulaire
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Create New User</h2>
                <form onSubmit={handleSubmit}>
                    <label className="label_user">Username:</label>
                    <input className='input_user'
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <label className="label_user">Email:</label>
                    <input className='input_user'
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <label className="label_user">Password:</label>
                    <input className='input_user'
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button className="btn_profile" type="submit" onClick={CreateUser}>Add User</button>
                    <button className="btn_profile" type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}
