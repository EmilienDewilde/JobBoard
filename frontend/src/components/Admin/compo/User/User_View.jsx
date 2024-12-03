import React, { useState, useEffect } from 'react';
import '../style/Admin_CSS.css';

export function ViewUser({ onClose, id }) {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const token = localStorage.getItem('token');

const fetchUserData = async () => {
    if (!token) {
      setErrorMessage('No token found, please login first.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/users`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
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

  // Utilisation de useEffect pour ne pas déclencher fetchUserData à chaque rendu
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="modal">
          <div className="modal-content">
          <h2>View All User:</h2>
          {loading && <p>Loading...</p>}
        {error && <p className='err'>{error}</p>}
        {!loading && !error && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(users.users).map((user) => (
                <tr key={user[0]} >
                  <td>{user[1][0]}</td>
                  <td>{user[1][1]}</td>
                  <td>{user[1][2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        <button onClick={onClose} className="button_admin">Close</button>
          
  </div>
</div>
);

}