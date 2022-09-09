import React from 'react';

import './MainHeader.scss';

function mainHeader() {
  return (
    <header className='main-header flex-center'>
      <div className='header-layout flex-center'>
        <h1 className='logo'>InstaBook</h1>
        <nav>
          <ul>
            <li>user name</li>
          </ul>
        </nav>
        <div className='main-filter flex-center'>
          <label htmlFor='search'>search</label>
          <input className='search-input' name='search' type='text' />
        </div>
      </div>
    </header>
  );
}

export default mainHeader;
