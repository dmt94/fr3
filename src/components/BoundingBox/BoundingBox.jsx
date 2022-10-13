import React from 'react';
import './BoundingBox.css';

const Box = ({ person }) => {
  const { id, name, value, boundingBox, prediction } = person;
  let percent = (prediction * 100).toFixed(2);

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
      <div className='face-description-div'>
        <p className='prediction-percentage'>
          Prediction Percent:
        </p>
        <h2 className='prediction-percentage-value'>
          {prediction > 0.07 ? `${percent}%` : null}
        </h2>
      </div>
      <p className='celebrity-name'>
        {value > 0.07 ? name : null}
      </p>
    </div>
  )
}

export default Box;