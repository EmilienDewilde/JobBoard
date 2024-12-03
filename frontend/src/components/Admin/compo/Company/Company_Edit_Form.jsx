// CreateCompanyForm.jsx
import React, { useState } from 'react';
import '../style/Admin_CSS.css';

export function EditCompanyForm({ onClose,name, id }) {
    const [company, setCompany] = useState({
        id: id,
        new_name: '',
    });

    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const EditCompany = async () => {
        if (!token) {
          setError('No token found, please login first.');
          return;
        }
        try {
            const response = await fetch(`http://localhost:5000/companies`, {
              method: 'PUT',
              headers: {
                  "Content-Type": "application/json",
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({company}),
            });
      
            if (response.ok) {
              const updatedCompany = await response.json();
              window.location.reload();
              console.log('Company updated successfully:', updatedCompany);
            } else {
              console.error('Error updating company:', response.statusText);
            }
          } catch (error) {
            console.error('Network error:', error);
          }
        };

      return (
          <div className="modal">
                <div className="modal-content">
                <h2>Edit This Company:</h2>
              <form>
              <label className="label_profile" htmlFor="name">Company name:</label>
              <input className="input_company"
                  type="text"
                  id="name"
                  value={company.new_name}
                  placeholder={name}
                  
                  onChange={(e) => setCompany({ ...company, new_name: e.target.value })}
                  />
              <button className="btn_profile" type="submit" onClick={EditCompany}>Update Company</button>
                <button className="btn_profile" type="button" onClick={onClose}>Cancel</button>
          </form>
        </div>
    </div>
      );
  }
