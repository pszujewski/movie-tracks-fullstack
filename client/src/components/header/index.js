import React from 'react';
import FaFilm from 'react-icons/lib/fa/film';
import { Link } from 'react-router-dom';
import './header.css';

export default function Header(props) {
  return (
    <nav className='row'>
      <div className='seven columns'>
        <div className='flexbox'>
          <h2><FaFilm /></h2>
          <h1><Link to='/'>Movie Tracks</Link></h1>
        </div>
      </div>
      <div className='five columns'>
        <ul className='row'>
          <li className='three columns'>About</li>
          <li className='three columns'><Link to='/login'>Log In</Link></li>
          <li className='three columns'><Link to='/signup'>Sign Up</Link></li>
          <li className='three columns'>Favorites</li>
        </ul>
      </div>
    </nav>
  );
}