import React from 'react';
import './styles/AdList.css';
import	{Link}	from	'react-router-dom';
import { useState } from 'react';

const AdList = ({ads}) => {
  if (!ads) {
    return <div>No ad available</div>;
  }
  return (
    <div className="ad-list">
      {Object.entries(ads.offers).map(([key,value]) => (
          <div className="ad-card" key={key}>
            <div className="ad-details">
              <h3>{value.title}</h3>
              <p>{value.company}</p>
              <Link to={`/Offers/${key}`}><button>Learn more</button></Link>
            </div>
          </div>
      ))}
    </div>
  );
};

export default AdList;
