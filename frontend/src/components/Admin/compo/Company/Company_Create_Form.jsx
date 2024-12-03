import React, { useState } from 'react';
import '../style/Admin_CSS.css';

export function CreateCompanyForm({ onClose }) {
    const [formData, setFormData] = useState({
        name: '',
    });
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const CreateCompany = async () => {
        if (!token) {
          setError('No token found, please login first.');
          return;
        }
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:5000/companies`, {
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
            setError('Failed to fetch company data');
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
                <h2>Create New Company</h2>
                <form onSubmit={handleSubmit}>
                    <label className="label_company">Name:</label>
                    <input className='input_company'
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    
                    <button className="btn_profile" type="submit" onClick={CreateCompany}>Add Company</button>
                    <button className="btn_profile" type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}
