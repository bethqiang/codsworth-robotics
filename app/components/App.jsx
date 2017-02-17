import React from 'react';

import Navbar from './Navbar';

export default function (props) {
  return (
    <div id="main" className="container">
      <Navbar />
      <div className="col-xs-12">
        {
          props.children && React.cloneElement(props.children, props)
        }
      </div>
    </div>
  );
}
