import React from 'react';
import './Rank.css';

const Rank = () => {
  return (
    <div>
      <div className='div-msg'>
        <div className='white f3'>
          {'Andrei, your current rank is...'}
        </div>
        <div className='rank-number f1'>
          {'#5'}
        </div>
      </div>
    </div>
  )
}

export default Rank;