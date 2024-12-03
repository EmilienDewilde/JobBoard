// CreateCompanyForm.jsx
import React, { useState } from 'react';
import '../style/Admin_CSS.css';

export function DeleteCompanyForm({ onClose,name }) {


    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const DeleteCompany = async () => {
        if (!token) {
          setError('No token found, please login first.');
          return;
        }
        try {
            const response = await fetch(`http://localhost:5000/companies`, {
              method: 'DELETE',
              headers: {
                  "Content-Type": "application/json",
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({name}),
            });
      
            if (response.ok) {
              const updatedCompany = await response.json();
              console.log('Company updated successfully:', updatedCompany);
            } else {
              console.error('Error updating company:', response.statusText);
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
                <h2>Delete Company:</h2>
                <p> Are You Sure ? </p>
              <button className="btn_profile" type="submit" onClick={DeleteCompany}>Delete</button>
                <button className="btn_profile" type="button" onClick={onClose}>Cancel</button>
        </div>
    </div>
      );
  }
