import React from 'react';
import FaFilm from 'react-icons/lib/fa/film';
import './header.css';

export default function Header(props) {
  return (
    <nav className='row'>
      <div className='eight columns'>
        <div className='flexbox'>
          <h2><FaFilm /></h2>
          <h1>Movie Tracks</h1>
        </div>
      </div>
      <ul className='four columns u-pull-right'>
        <li className='four columns'>About</li>
        <li className='four columns'>Log In</li>
        <li className='four columns'>Sign Up</li>
      </ul>
    </nav>
  );
}