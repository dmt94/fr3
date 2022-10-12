import React from 'react';
import './Rank.css';
import Logo from '../Logo/Logo';

const Entry = ({name, entries, clear}) => {
  return (
    <div className='main-logo-entry-div'>
      <div className='logo-area'>
        <Logo />
      </div>
      <div className='div-msg entry-count-div'>
        <div className='white f3 entry-info'>
          {`${name}, your current entry count:`}
        </div>
        <div className='entry-number f1'>
          {entries}
        </div>
        <button 
            className='clear-btn grow'
            onClick={clear}
            >CLEAR
        </button>
      </div>
    </div>
  )
}

export default Entry;