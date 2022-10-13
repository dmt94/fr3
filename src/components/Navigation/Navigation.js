import React from 'react';
import './Navigation.css'

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
            <h4>Face Recognition</h4>
          </div>
          <p 
            onClick={() => onRouteChange('signin')}
            className='f3 link dim white pa3 pointer'> Sign In </p>
          <p 
            onClick={() => onRouteChange('register')}
            className='f3 link dim white pa3 pointer'> Register </p>
         </nav>
      )
    }
      
   
}

export default Navigation;