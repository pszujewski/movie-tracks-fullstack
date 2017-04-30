import React from 'react';
import { Link } from 'react-router-dom';
import './favoritenotify.css';

export default function FavoriteNotify(props) {
  return (
    <div className='favorite-notify'>
     <h3>Create an account to save your favorite movies.</h3>
     <div className='btn-bin'>
      <Link to='/login'><button>Log in</button></Link>
      <Link to='/signup'><button>Sign Up</button></Link>
     </div>
    </div>
  );
}
