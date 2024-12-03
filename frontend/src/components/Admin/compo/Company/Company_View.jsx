import React, { useState, useEffect } from 'react';
import '../style/Admin_CSS.css';

export function ViewCompany({ onClose, id }) {
    const [companies, setCompanies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const token = localStorage.getItem('token');

const fetchCompanyData = async () => {
    if (!token) {
      setErrorMessage('No token found, please login first.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/companies`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setCompanies(data);
        setLoading(false);
      } else {
        setError('Failed to fetch companies data');
        setLoading(false);
      }
    } catch (err) {
      setError('Network error');
      setLoading(false);
    }
  };

  // Utilisation de useEffect pour ne pas déclencher fetchCompanyData à chaque rendu
  useEffect(() => {
    fetchCompanyData();
  }, []);

  return (
    <div className="modal">
          <div className="modal-content">
          <h2>View All Companies:</h2>
          {loading && <p>Loading...</p>}
        {error && <p className='err'>{error}</p>}
        {!loading && !error && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(companies.companies).map((company) => (
                <tr key={company[0]} >
                  <td>{company[1][0]}</td>
                  <td>{company[1][1]}</td>
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