import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
//import './index.css'
import {
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom"
import './components/styles/index.css'
import {Offers, adloader as loader} from './components/Offers.jsx'
import {Home} from './components/Home.jsx'
import { Login } from './components/Login.jsx'
import { Profile } from './components/Profile.jsx'
import {Admin} from './components/Admin.jsx'
import {Register} from './components/Register.jsx'
import Adv from './components/Offer/Advcard.jsx'
import Apply from './components//postulepage.jsx'



const router=createBrowserRouter([
  {
    path:"/",
    element:<Home />,
  },
  {
    path:"/Home",
    element:<Home />,
  },
  {
    path:"/Login",
    element:<Login />,
  },
  {
  path:"/Register",
  element:<Register />,
  },
  {
    path:"/Profile",
    element:<Profile />,
  },
  {
    path:'/Admin',
    element:<Admin />
  },
  {
    path:'/Offers',
    element:<Offers />,
    loader: loader,
    children:[
      {
        path:'/Offers/:id',
        element:<Adv />,
      }
    ]
  },
  {
    path:'/Offers/:id/Apply',
    element:<Apply />,
  }
  // {
  //   path:'/test',
  //   element:<App />,
  // }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
