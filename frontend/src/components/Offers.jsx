//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'
import HeaderBar from './Offer/Header.jsx'
import './Offer/styles/Header.css'
import AdList from './Offer/AdList.jsx'
import './Offer/styles/AdList.css'
import { useEffect, useState  } from 'react'
import { Outlet } from 'react-router-dom'
import Adv from './Offer/Advcard.jsx'
import './Offer/styles/Offers.css'
import { useLoaderData } from 'react-router-dom'

export async function adloader() {
  const res=await fetch('http://localhost:5000/offers')
  const data = await res.json()
  return data
}


export function Offers() {

  const ads = useLoaderData()
  const id = window.location.pathname.split('/')[2]

  return (
    <>
    <HeaderBar />
    <div className='content'>
      <AdList ads={ads} />
      <div id='detail'>
        {id? (
          <Outlet />
        ):(
          <div className='ad-details'>Select an ad</div>
        )}
      </div>
      </div>
    </>
  )
}

