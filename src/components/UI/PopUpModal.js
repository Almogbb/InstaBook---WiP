import { Fragment } from 'react';

import './PopUpModal.scss';

const PopUpModal = (props) => {
  // control open and close from main app i render this - use props to pass it
  return (
    <Fragment>
      <div className='modal-container'>
        <div className='modal-content'>
          <p onClick={props.onClick} className='close-btn'>
            X
          </p>
          <div className='content'>{props.children}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default PopUpModal;
