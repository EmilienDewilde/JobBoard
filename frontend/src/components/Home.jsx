import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import './styles/Home.css';

export function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [is_admin, setIsAdmin] = useState(false);
  const [is_login, setIsLogin] = useState(false);
  const token = localStorage.getItem('token');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Fonction pour récupérer les données utilisateur
  const fetchUserData = async () => {
    if (!token) {
      setErrorMessage('No token found, please login first.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.is_admin ==  null)
        setIsAdmin(data.is_admin);
        setIsLogin(data.is_login);
        if (localStorage.getItem('is_admin') == null)
          localStorage.setItem('is_admin', is_admin);
        if (localStorage.getItem('is_login') == null)
          localStorage.setItem('is_login', is_login);
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
  }, []);  // Le tableau vide signifie que l'effet se déclenche uniquement au montage du composant

  // Fonction pour gérer la déconnexion
  const handleLogout = async () => {
    if (!token) {
      setErrorMessage('No token found, please login first.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        setIsLogin(false);
        localStorage.removeItem('token');
        localStorage.removeItem('is_admin');
        localStorage.removeItem('is_login');
        setLoading(false);
        window.location.reload();
      } else {
        setError('Failed to log out');
        setLoading(false);
      }
    } catch (err) {
      setError('Network error');
      setLoading(false);
    }
  };

  // Fonction de gestion du dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h1 className="logo">MegaCorpo3000</h1>
          <nav>
            <ul className="menu">
              <li><Link to={'/Offers'}><p>Offers</p></Link></li>
              {is_login ? null : <li><Link to={'/Login'}><p>Login</p></Link></li>}
              {is_login ? <li><Link to={'/Profile'}><p>Profile</p></Link></li> : null}
              {is_admin ? <li><Link to={'/Admin'}><p>Admin</p></Link></li> : null}
              {is_login ? <li><Link onClick={handleLogout}><p>Logout</p></Link></li> : null}

            </ul>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h2>MegaCorpo3000 - Le futur de l'emploi à portée de clic !</h2>
          <Link to={'https://www.francetravail.fr/accueil/'}><button className="cta-button">En savoir plus</button></Link>
        </div>
      </section>

      <footer className="footer">
        <p>© 2024 MegaCorpo3000. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
