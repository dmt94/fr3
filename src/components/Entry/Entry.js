import React from 'react';
import './Entry.css';
import Logo from '../Logo/Logo';

const Entry = ({name, entries, clear, faceCount, celebrityFaceCount}) => {
  return (
    <div className='main-div'>
      <div className='main-logo-entry-div'>
        <div className='logo-area'>
            <Logo />
          </div>
          <div className='div-msg entry-count-div'>
            <div className='white f3 entry-info'>
              <h4 className='user-name'>{name}</h4>
              <p>your current entry count:</p>
            </div>
            <div className='f1 entry-button-div'>
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
        </div>
        <div className='main-counter-div'>
          <div className='counter-div box-number-faces'>
            <p>NUMBER OF FACES DETECTED</p>
            <h4 className='counter number-face-count'>{faceCount}</h4>
          </div>
          <div className='counter-div box-number-celebrities'>
            <p>NUMBER OF POSSIBLE PUBLIC FIGURES DETECTED</p>
            <h4 className='counter number-celebrity-face-count'>{celebrityFaceCount}</h4>
          </div>
        </div>
    </div>      
  )
}

export default Entry;