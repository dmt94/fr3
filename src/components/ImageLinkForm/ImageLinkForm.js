import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div className='margin-10px'>
        <p className='f3 instruction'>
          {'Copy and paste your image url below to detect face.'}
        </p>
        <div className='center'>
          <div className='form center pa4 br3 shadow-5'>
          <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
          <button 
            className='btn-custom w-30 grow f4 link ph3 pv2 dib'
            onClick={onButtonSubmit}
            >Detect
          </button>
          </div>
       </div>
    </div>
  )
}

export default ImageLinkForm;