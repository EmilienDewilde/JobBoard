// CreateUserForm.jsx
import React, { useState } from 'react';
import '../style/Admin_CSS.css';

export function DeleteUserForm({ onClose,username }) {


    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const DeleteUser = async () => {
        if (!token) {
          setError('No token found, please login first.');
          return;
        }
        try {
            const response = await fetch(`http://localhost:5000/users`, {
              method: 'DELETE',
              headers: {
                  "Content-Type": "application/json",
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({username}),
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
        onClose();
        window.location.reload(); 
        };

      return (
          <div className="modal">
                <div className="modal-content">
                <h2>Delete User:</h2>
                <p> Are You Sure ? </p>
              <button className="btn_profile" type="submit" onClick={DeleteUser}>Delete</button>
                <button className="btn_profile" type="button" onClick={onClose}>Cancel</button>
        </div>
    </div>
      );
  }
