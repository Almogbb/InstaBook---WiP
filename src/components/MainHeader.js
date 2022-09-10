import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './MainHeader.scss';

function MainHeader() {
  const loggedInUser = useSelector((state) => state.users.loggedInUser);

  return (
    <header className='main-header flex-center'>
      <div className='header-layout flex-center'>
        <h1 className='logo'>InstaBook</h1>

        <nav>
          <ul>
            {loggedInUser && <li>user name</li>}
            {!loggedInUser && (
              <Fragment>
                <li>
                  <NavLink to='/login'>Login</NavLink>
                </li>
                <li>
                  <NavLink to='/signup'>Sign-Up</NavLink>
                </li>
              </Fragment>
            )}
          </ul>
        </nav>
        {/* <div className='main-filter flex-center'>
          <label htmlFor='search'>search</label>
          <input className='search-input' name='search' type='text' />
        </div> */}
      </div>
    </header>
  );
}

export default MainHeader;
