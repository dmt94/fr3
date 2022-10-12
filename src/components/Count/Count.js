import React from 'react';
import './Count.css';

const Count = ({name, entries, clear}) => {
  return (
    <div className='main-logo-entry-div'>
      <div className='logo-area'>
      </div>
      <div className='div-msg entry-count-div'>
        <div className='white f3 entry-info'>
          {`${name}, your current entry count:`}
        </div>
        <div className='entry-number f1'>
          {entries}
        </div>
        <button 
            className='clear-btn grow w-38'
            onClick={clear}
            >CLEAR
        </button>
      </div>
    </div>
  )
}

export default Count;