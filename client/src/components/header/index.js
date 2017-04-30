import React from 'react';
import FaFilm from 'react-icons/lib/fa/film';
import { Link } from 'react-router-dom';
import './header.css';

export default function Header(props) {
  return (
    <nav className='row'>
      <div className='six columns logo-bin'>
        <div className='flexbox-container'>
          <div className='flexbox'>
            <h2><FaFilm /></h2>
            <h1><Link to='/'>Movie Tracks</Link></h1>
          </div>
        </div>
      </div>
      <div className='six columns links-bin'>
        <ul className='row'>
          <li className='three columns'><Link to='/'>Search</Link></li>
          <li className='three columns'><Link to='/browse'>Browse</Link></li>
          <li className='three columns'><Link to='/register'>Register</Link></li>
          <li className='three columns'><Link to='/favorites'>Favorites</Link></li>
        </ul>
      </div>
    </nav>
  );
}