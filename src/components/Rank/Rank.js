import React from 'react';
import './Rank.css';

const Rank = ({name, entries}) => {
  return (
    <div>
      <div className='div-msg'>
        <div className='white f3'>
          {`${name}, your current entry count:`}
        </div>
        <div className='rank-number f1'>
          {entries}
        </div>
      </div>
    </div>
  )
}

export default Rank;