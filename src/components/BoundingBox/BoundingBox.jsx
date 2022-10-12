import React from 'react';
import './BoundingBox.css';

const Box = ({ person }) => {
  const { id, name, value, boundingBox } = person;

  return (
    <div className='bounding-box-outer-div' key={id}>
      <div 
        className='bounding-box'
        style={
          {
            top: boundingBox.topRow, 
            right: boundingBox.rightCol,
            bottom: boundingBox.bottomRow,
            left: boundingBox.leftCol,
          }
        }
        >
      </div>
      <p className='celebrity-name'>
        {value > 0.3 ? name : ''}
      </p>
    </div>
  )
}

export default Box;