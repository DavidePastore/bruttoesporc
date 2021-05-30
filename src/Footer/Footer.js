import React from 'react';
import './Footer.css';

class Footer extends React.Component {
  render () {
    return (
      <div className='p-4 p-md-5 text-white rounded bg-dark'>
        <div className='col-md-12 px-0'>
          <p className='lead my-3 text-center'>
            Made with ❤ by <a href='https://github.com/DavidePastore' target='_blank' rel='noopener noreferrer' className='text-white font-weight-bold'>Davide Pastore</a> and <a href='https://github.com/MarcoDiSalvo90' target='_blank' rel='noopener noreferrer' className='text-white font-weight-bold'>Marco Di Salvo</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Footer;
