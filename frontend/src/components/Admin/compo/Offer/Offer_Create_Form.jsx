import React, { useState } from 'react';
import '../style/Admin_CSS.css';

export function CreateOfferForm({ onClose }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        salary: 0,
        company:'',
        location:'',
    });
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const Createoffer = async () => {
        if (!token) {
          setError('No token found, please login first.');
          return;
        }
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:5000/offers`, {
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
            setError('Failed to fetch offer data');
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
                <h2>Create New offer</h2>
                <form onSubmit={handleSubmit}>
                    <label className="label_offer">Title:</label>
                    <input className='input_offer'
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <label className="label_offer">descritipon:</label>
                    <input className='input_offer'
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <label className="label_offer">salary:</label>
                    <input className='input_offer'
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <label className="label_offer">company:</label>
                    <input className='input_offer'
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <label className="label_offer">location:</label>
                    <input className='input_offer'
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                    <button className="btn_profile" type="submit" onClick={Createoffer}>Add offer</button>
                    <button className="btn_profile" type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}
