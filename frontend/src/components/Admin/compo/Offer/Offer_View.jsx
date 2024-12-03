import React, { useState, useEffect } from 'react';
import '../style/Admin_CSS.css';

export function ViewOffer({ onClose, id }) {
    const [offers, setoffers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const token = localStorage.getItem('token');

const fetchofferData = async () => {
    if (!token) {
      setErrorMessage('No token found, please login first.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/offers`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setoffers(data);
        setLoading(false);
      } else {
        setError('Failed to fetch offer data');
        setLoading(false);
      }
    } catch (err) {
      setError('Network error');
      setLoading(false);
    }
  };

  // Utilisation de useEffect pour ne pas déclencher fetchofferData à chaque rendu
  useEffect(() => {
    fetchofferData();
  }, []);

  return (
    <div className="modal">
          <div className="modal-content">
          <h2>View All offer:</h2>
          {loading && <p>Loading...</p>}
        {error && <p className='err'>{error}</p>}
        {!loading && !error && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>offername</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(offers.offers).map((offer) => (
                <tr key={offer[0]} >
                  <td>{offer[1][0]}</td>
                  <td>{offer[1][1]}</td>
                  <td>{offer[1][2]}</td>
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