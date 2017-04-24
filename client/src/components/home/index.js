import React from 'react';

import Search from '../search';
import Movie from '../movie';
import Music from '../music';

export default function Home(props) {
  return (
    <div className='home'>
      <Search />
      <Movie />
      <Music />
    </div>
  );
}