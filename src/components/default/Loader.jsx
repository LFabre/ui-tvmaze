import React from 'react';

import './../../css/Default.css';

const LoaderStyle = {
  display: 'flex',
  flex: '1',
  alignItems: 'center',
  justifyContent: 'center'
}

const Loader = () => (
  <div style={LoaderStyle}>
    <div className='loader'> </div>
  </div>
);


export default Loader;