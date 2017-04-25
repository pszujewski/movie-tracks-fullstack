import React from 'react';
import {connect} from 'react-redux';

export function Notify(props) {
  return (
    <div className='notify'>
      <h3>You are signed in as {props.user.data.fullName}</h3>
      <div className='btn-container'>
        <button>Sign Out</button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(Notify);