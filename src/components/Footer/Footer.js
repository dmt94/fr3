import React from 'react';
import './Footer.css'


const Footer = () => {
  return (
    <footer id="footer">
      <h4>CREATED BY DMT</h4>
      <div className='links-div'>
        <a href='https://github.com/dmt94' className='links'>GitHub</a>
        <a href='https://github.com/dmt94' className='links'>My Website</a>
        <a href='https://github.com/dmt94/fr34' className='links'>Source Code</a>
      </div>
      <div>
        <span>Logos and Favicons made by <a href='https://www.flaticon.com/authors/eucalyp'>Eucalyp</a></span>
      </div>
    </footer>
  )
}

export default Footer;