import React from 'react';
import './BoundingBox.css';

const Box = ({ person }) => {
  const { id, name, value, boundingBox } = person;

  return (
    <div 
      className='bounding-box' 
      key={id}
      style={
        {
          top: boundingBox.topRow, 
          right: boundingBox.rightCol,
          bottom: boundingBox.bottomRow,
          left: boundingBox.leftCol,
        }
      }
      >
      <p className='celebrity-name'>
        {value > 0.3 ? name : ''}
      </p>
    </div>
  )
}

export default Box;