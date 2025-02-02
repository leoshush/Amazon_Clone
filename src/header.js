import React from 'react'
import './Header.css'
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import {Link} from "react-router-dom"; 
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import Login from './Login';
function Header() {
  const [{basket,user},dispatch] = useStateValue();
  const handleAuthentication = () =>{
    if(user) {
      auth.signOut();
    }
  }
  return (
    <div className='header'>
      <Link to="/">
      <img className="header_logo" src="https://www.pngmart.com/files/Amazon-Logo-Download-PNG-Image.png" alt=''></img>   
      </Link>
     <div className='header_search'>
        <input className='header_searchInput' type='text'/>
       <SearchIcon className="header_searchIcon"/>
     </div>

    <div className='header_nav'>
      <Link to={!user && '/login'}>
   <div onClick={handleAuthentication} className='header_option'>
   <span className='header_optionline1'>Hello {!user ? 'Guest': user.email}</span>
    <span className='header_optionline2'>{user? 'Sign Out':'Sign In'}</span>   
   </div>
   </Link>
   <div className='header_option'>
   <span className='header_optionline1'>Returns</span>
    <span className='header_optionline2'>& Orders</span>
   </div>
   <div className='header_option'>
    <span className='header_optionline1'>Your </span>
    <span className='header_optionline2'>Prime</span>
    
   </div>
   <Link to='/Checkout'>
   <div className='header_optionBasket'>
    <ShoppingBasketIcon/>
    <span className='header_optionline2 header_basketCount'>{basket.length}</span>
   </div>
   </Link>
   
    </div>
    </div>
  )
}

export default Header