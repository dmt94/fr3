import React from 'react';
import './Footer.css'


const Footer = () => {
  return (
    <footer id="footer">
      <h4>CREATED BY DMT</h4>
      <p>Creatively Curated with React ⚛️ </p>
      <div className='links-div'>
        <a href='https://github.com/dmt94' className='links'>GitHub</a>
        <a href='https://github.com/dmt94' className='links'>My Website</a>
        <a href='https://github.com/dmt94/fr34' className='links'>Source Code</a>
      </div>
      <div>
        <span className='credit-span'>Logos and Favicon made by <a href='https://www.flaticon.com/authors/eucalyp'>Eucalyp</a></span>
      </div>
    </footer>
  )
}

export default Footer;