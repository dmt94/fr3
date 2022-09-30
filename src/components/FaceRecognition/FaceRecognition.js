import React from 'react';

const FaceRecognition = ({imageUrl}) => {
  return (
    <div className='center'>
      <img 
        src={imageUrl} 
        alt='a woman in a traintrack' 
        className=''
        />
    </div>
  )
}

export default FaceRecognition;