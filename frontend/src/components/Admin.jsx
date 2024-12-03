import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";



import './styles/Admin.css';

import { Admin_Users } from './Admin/Admin_Users';
import { Admin_Offers } from './Admin/Admin_Offers';
import { Admin_Companies } from './Admin/Admin_Companies';
import DropdownMenu from './DropMenu';

export function Admin(){

    // const is_admin = localStorage.getItem('is_admin');
    const is_login = localStorage.getItem('is_login');
    const token = localStorage.getItem('token');

    const [users, setUsers] = useState([]);
    const [offers, setOffers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const myId = localStorage.getItem('myId')
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const is_admin = localStorage.getItem('is_admin'); 
    const [errorMessage, setErrorMessage] = useState('');     
    const page = 'admin';



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


      const fetchOfferData = async () => {
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
            setOffers(data);
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
        fetchOfferData();
      }, []);


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
        fetchCompanyData();
      }, []);


    


    if (is_admin === "false"  || localStorage.getItem('token') == null) {
        return(
            <div className="container">
              <h1>404</h1>
              <p>Oops! The page you're looking for doesn't exist.</p>
              <a href="/">Home</a>
          </div>
          )
    }






    return (<>
            <header className="header-bar">
          <div className='header-content'>
            <DropdownMenu is_admin={is_admin} is_login={is_login} page={page}/>
            <h1 className='title'>Admin</h1>
          </div>
        </header>
            <div className='container_admin'>
                <Admin_Users users={users}/>
                <Admin_Offers offers={offers}/>
                <Admin_Companies companies={companies}/>
            </div>
           </>
    )
}