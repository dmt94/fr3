import React from 'react';
import './Navigation.css'
import navbrain from './brain-front.png';

const Navigation = ({onRouteChange, isSignedIn}) => {
    if (isSignedIn) {
      return (
        <nav className='navbar' style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p 
            onClick={() => onRouteChange('signout')}
            className='f3 link dim white pa3 pointer signin-out'>
               Sign Out </p>
      </nav>
      )
   
    } else {
      return (
        <nav className='navbar' style={{display: 'flex'}}>
          <div className='logo-name'>
            <img src={ navbrain } alt='brain logo' className='navbrain-logo'/>
          </div>
          <div className='user-div'>
            <button 
              onClick={() => onRouteChange('signin')}
              className='f3 link white pointer login-btn user-btn'> Sign In </button>
            <button 
              onClick={() => onRouteChange('register')}
              className='f3 link white pointer reg-btn user-btn'> Register </button>
          </div>
         </nav>
      )
    }
      
   
}

export default Navigation;