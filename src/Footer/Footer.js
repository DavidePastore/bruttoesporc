import React from 'react';
import './Footer.css';

class Footer extends React.Component {
  render () {
    return (
      <div className='p-4 p-md-5 text-white rounded bg-dark'>
        <div className='col-md-12 px-0'>
          <p className='lead my-3'></p>
          <p className='lead mb-0'><a href='#' className='text-white font-weight-bold'></a></p>
        </div>
      </div>
    );
  }
}

export default Footer;
