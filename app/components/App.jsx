import React from 'react';

import Navbar from './Navbar';

export default function (props) {
  return (
    <div>
      <Navbar />
      <div>
        {
          props.children && React.cloneElement(props.children, props)
        }
      </div>
    </div>
  );
}
