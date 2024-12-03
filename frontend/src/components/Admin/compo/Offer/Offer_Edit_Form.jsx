import React, { useState } from 'react';
import '../style/Admin_CSS.css';

export function EditOfferForm({ onClose, id, title, description, salary, company, location }) {
    const [offer, setOffer] = useState({
        id: id,
        title: '',
        description: '',
        salary: 0,
        company:'',
        location:'',
    });

    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const Editoffer = async () => {
        if (!token) {
          setError('No token found, please login first.');
          return;
        }
        try {
            const response = await fetch(`http://localhost:5000/offers`, {
              method: 'PUT',
              headers: {
                  "Content-Type": "application/json",
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({offer}),
            });
      
            if (response.ok) {
              const updatedoffer = await response.json();
              window.location.reload();
              console.log('offer updated successfully:', updatedoffer);
            } else {
              console.error('Error updating offer:', response.statusText);
            }
          } catch (error) {
            console.error('Network error:', error);
          }
        };

      return (
          <div className="modal">
                <div className="modal-content">
                <h2>Edit This offer</h2>
                <form onSubmit={Editoffer}>
                    <label className="label_offer">Title:</label>
                    <input className='input_offer'
                        type="text"
                        name="title"
                        value={offer.title}
                        placeholder={title}
                        onChange={(e) => setOffer({ ...offer, title: e.target.value })}
                    />
                    <br />
                    <label className="label_offer">descritipon:</label>
                    <input className='input_offer'
                        type="text"
                        name="description"
                        value={offer.description}
                        placeholder={description}
                        onChange={(e) => setOffer({ ...offer, description: e.target.value })}
                    />
                    <br />
                    <label className="label_offer">salary:</label>
                    <input className='input_offer'
                        type="number"
                        name="salary"
                        value={offer.salary}
                        placeholder={salary}
                        onChange={(e) => setOffer({ ...offer, salary: e.target.value })}
                    />
                    <br />
                    <label className="label_offer">company:</label>
                    <input className='input_offer'
                        type="text"
                        name="company"
                        value={offer.company}
                        placeholder={company}
                        onChange={(e) => setOffer({ ...offer, company: e.target.value })}
                    />
                    <br />
                    <label className="label_offer">location:</label>
                    <input className='input_offer'
                        type="text"
                        name="location"
                        value={offer.location}
                        placeholder={location}
                        onChange={(e) => setOffer({ ...offer, location: e.target.value })}
                    />
                    <button className="btn_profile" type="submit" onClick={EditOfferForm}>Update Offer</button>
                    <button className="btn_profile" type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}
