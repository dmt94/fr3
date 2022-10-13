import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png';



const Logo = () => {
  return (
    <div className='main-logo-div'>
      <Tilt className='logo-div'>
        <Tilt className="Tilt br2 shadow-2" options={{max: 55}} style={{height: '150px', width: '150px',}}>
          <div className='inner-tilt'>
            <img src={ brain } alt='brain logo'/>
          </div>
        </Tilt>
      </Tilt>
      
    </div>
  )
}

export default Logo;