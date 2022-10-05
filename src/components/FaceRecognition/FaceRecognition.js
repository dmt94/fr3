import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) => {
  return (
    <div className='center'>
      <div className='img-backdrop center'>
        <img 
          src={imageUrl} 
          alt="" 
          className='img-specs'
          id='inputimage'
          />
        <div 
          className='bounding-box'
          style={
            {
              top: box.topRow, 
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }
          }
          ></div>
      </div>

    </div>
  )
}

export default FaceRecognition;