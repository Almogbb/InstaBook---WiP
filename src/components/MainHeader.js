import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import './MainHeader.scss';

function MainHeader() {
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.users.loggedInUser);

  function moveToHomeRoute() {
    navigate('/');
  }

  return (
    <header className='main-header flex-center'>
      <div className='header-layout flex-center'>
        <h1 className='logo' onClick={moveToHomeRoute}>
          InstaBook
        </h1>

        <nav>
          <ul>
            {loggedInUser && <li>{loggedInUser.name}</li>}
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
