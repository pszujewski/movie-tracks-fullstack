import React from 'react';
import {connect} from 'react-redux';
import {signOut} from '../../actions/register';

export function Notify(props) {

  function handleSignOut(event) {
    event.preventDefault();
    props.dispatch(signOut());
  }

  return (
    <div className='notify'>
      <h3>You are signed in as {props.user.data.fullName}</h3>
      <div className='btn-container'>
        <button onClick={e => handleSignOut(e)}>Sign Out</button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(Notify);