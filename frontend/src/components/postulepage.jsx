import './styles/postulepage.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Apply = () => {
    const token = localStorage.getItem('token');
    const [email, setemail] = useState('');
    const [message, setmessage] = useState('');
    const id = window.location.pathname.split('/')[2]
    const navigate = useNavigate();
    const isconnected = async () => {
        const resp = await fetch('http://localhost:5000/users/me',
            {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
            }})
        const data = await resp.json()
        setemail(data.email)
    }
    if (token){
        useEffect(() => {
            isconnected()
        },[])
    }

    const handleApply = async (e) => {
        e.preventDefault();  
        const offer_id = id
        const info = { offer_id, email, message }
        const response = await fetch(`http://localhost:5000/offers/${id}`, {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(info),
            })
            if (response.ok) {
                alert('Postulation successful!');
                navigate(`/Offers`)
                }
    }
    return(
    <>
    <form id="apply-form" onSubmit={handleApply}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" onChange={(e)=>setemail(e.target.value)} value={token?email:null} required></input>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" onChange={(e)=>setmessage(e.target.value)} required></textarea>
        <button type="submit">Apply</button>
    </form>
    </>
)}
export default Apply;