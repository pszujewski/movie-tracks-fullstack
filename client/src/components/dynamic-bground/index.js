import React from 'react';
import {connect} from 'react-redux';
import './dynamic-bground.css';

export function DynamicBackGround(props) {
  function getImage() {
    if (typeof props.movie.poster !== 'undefined') {
      return { "background-image": `url(${props.movie.poster})` };
    }
  }
  return (
    <div>
      <div className='faded'></div> 
      <div className='dynamic-background' style={getImage()}></div> 
    </div>
  );
}

const mapStateToProps = (state) => ({
  movie: state.movie.movieData
});

export default connect(mapStateToProps)(DynamicBackGround);