import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import Backdrop from './UI/Backdrop';
import PopUpModal from './UI/PopUpModal';

function CreateForm(props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClose} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <PopUpModal onClick={props.onClose} children={props.children} />,
        document.getElementById('overlay-root')
      )}
    </Fragment>
  );
}

export default CreateForm;
