import './App.css';
import React, { Fragment, useEffect } from 'react'
import Header from './header';
import Home from './Home';
import { Link } from 'react-router-dom';
import {  BrowserRouter as Router, Routes,Route } from 'react-router-dom';
// import { BrowserRouter, HashRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import {loadStripe} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const promise = loadStripe("pk_test_51OB61lSIReqVYUxHBXauLNP9Ez3Ym2Epdky7zujw1bmDjdtRAzaSRK3F4YTlF5YzDendPa3raoP7Np36Eeq3e4OW00YGUIF5lj");

function App() {
  const [{},dispatch]=useStateValue();
  useEffect(()=>{
   //will only run once when the app component loads..
      auth.onAuthStateChanged(authUser => {
        console.log("The user is >>> ",authUser);

        if(authUser){
          //the user just logged in / the user was logged in
        dispatch({
          type:'SET_USER',
          user:authUser
        })
        }
        else
        {
          dispatch({
            type:'SET_USER',
            user:null
          })
          //the user is logged out
        }
      })
    } ,[])


  return (
    //BEM
       <Router>
      <div className="app">
         <Elements stripe={promise}>
        <Routes>
         <Route path="/" element={<><Header /> <Home /></>} />
  
         <Route path='/login' element={<Login/>}/>
         <Route  path='/checkout' element={<><Header /> <Checkout/></>}/>
        
         <Route path='/payment' element={<><Header /> <Payment/></>}>
         {/* <Elements stripe={promise}>
          <Payment/>
         </Elements> */}
         </Route>
  
      </Routes>
      </Elements>
      </div>
        </Router>
     
  );
}

export default App;
