import React from 'react';
import './MainTitle.css';

class MainTitle extends React.Component {
  constructor (props) {
    super(props);

    // Necessario per accedere al corretto valore di `this` all'interno della callback
    this.handleRegenerate = this.handleRegenerate.bind(this);
  }

  handleRegenerate () {
    this.props.onRegenerate();
  }

  render () {
    return (
      <div className='jumbotron text-white text-center rounded bg-dark'>
        <div className='col-md-12 px-0'>
          <h1 id='title'>{this.props.title}</h1> {/* className='display-4' */}
          <button type='button' className='btn btn-success' onClick={this.handleRegenerate}>Rigenera</button>
          {/*
          <p className='lead my-3'></p>
          <p className='lead mb-0'></p>
          */}
        </div>
      </div>
    );
  }
}

export default MainTitle;
