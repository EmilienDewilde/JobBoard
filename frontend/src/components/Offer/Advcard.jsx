import React, { useEffect, useState } from "react";
import {Link, useLocation, useParams } from 'react-router-dom';
import './styles/adv.css'

const Adv = () => {
    const [ad, setAd] = useState({ offer: [] })
    const [chargement, setChargement] = useState(true);
    const search = useLocation()
    const id = useParams().id
    const getOffer = async () => {
        try{
             setChargement(true);
            const res=await fetch(`http://localhost:5000/offers/${id}`)
            const data = await res.json()
            setAd(data)
        }
        finally{
            setChargement(false);
        }
    }
    useEffect(() => {
        if (id){
            getOffer()}
    },[id])

    if (chargement) {
        return <div>Loading...</div>;
    }

  return (
    <div className="adv-card">
        <h3>{ad.offer.title}</h3>
        <div className="company">{ad.offer.company}</div>
        <div className="description">{ad.offer.description}</div>
        <div className="location">{ad.offer.location}</div>
        <div className="salary">{ad.offer.salary}</div>
        <div className="button-container">
            <Link to={`/Offers/${id}/Apply`}><button>Apply</button></Link>
        </div>
        {/* <pre>{JSON.stringify(ad.offer)}</pre> */}
    </div>
  );
};
export default Adv;