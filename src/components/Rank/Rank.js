import React from 'react';
import './Rank.css';
import Logo from '../Logo/Logo';

const Rank = ({name, entries}) => {
  return (
    <div className='main-logo-entry-div'>
      <div className='logo-area'>
        <Logo />
      </div>
      <div className='div-msg entry-count-div'>
        <div className='white f3 entry-info'>
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