export const PLAY_SONG = 'PLAY_SONG';
export const playSong = song => ({
    type: PLAY_SONG,
    song
});

export const STOP_SONG = 'STOP_SONG';
export const stopSong = () => ({
    type: STOP_SONG
});

const MOVIE_API_KEY = "?api_key=1710c94a1d9a1c75e363bf47a0f446b3";

// For querying the MovieDB for a movie title's ID
function getSearchMovieUrl(searchTerm) {
  const url = new URL(`https://api.themoviedb.org/3/search/movie${MOVIE_API_KEY}`);
  const params = {query: searchTerm};
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  return url;
}

export const FETCH_TITLES_REQUEST = 'FETCH_TITLES_REQUEST';
export const fetchTitlesRequest = () => ({
    type: FETCH_TITLES_REQUEST,
});

export const FETCH_TITLES_SUCCESS = 'FETCH_TITLES_SUCCESS';
export const fetchTitlesSuccess = titles => ({
    type: FETCH_TITLES_SUCCESS,
    loading: false,
    titles
});

const makeTitlesUrl = (id) => {
  return `https://api.themoviedb.org/3/genre/${id}/movies${MOVIE_API_KEY}&language=en-US&include_adult=false&sort_by=created_at.asc`; 
}

const getTitles = (url) => {
  return fetch(url).then(data => {
    return data.json();
  })
  .then(data => {
    return data.results.map(movie => {
      if (movie.title === "Harry Potter and the Philosopher's Stone") {
        return "Harry Potter and the Sorcerer's Stone";
      }
      return movie.title;
    });
  })
  .catch(err => console.error(err));
}

export const fetchMovieTitles = () => dispatch => {
  dispatch(fetchTitlesRequest());
  const genresUrl = `https://api.themoviedb.org/3/genre/movie/list${MOVIE_API_KEY}&language=en-US`;
  fetch(genresUrl)
    .then(data => {
      return data.json();
     })
     .then(data => {
      const titles = [];
      data.genres.forEach(genre => {
        let url = makeTitlesUrl(genre.id);
        titles.push(getTitles(url));
      });
      return Promise.all(titles);
    })
    .then(titles => {
      titles = titles.reduce((flat, toFlatten) => {
        return flat.concat(toFlatten);
      }, []);
      let filteredTitles = [];
      titles.forEach(title => {
        if (filteredTitles.indexOf(title) === -1) {
          filteredTitles.push(title);
        }
      });
      return dispatch(fetchTitlesSuccess(filteredTitles));
    })
    .catch(err => console.error(err));
}

export const ACCESS_TOKEN_REQ = 'ACCESS_TOKEN_REQ';
export const accessTokenReq = () => ({
    type: ACCESS_TOKEN_REQ,
    loading: true,
    error: false
});

export const ACCESS_TOKEN_SUCCESS = 'ACCESS_TOKEN_SUCCESS';
export const accessTokenSuccess = accessToken => ({
    type: ACCESS_TOKEN_SUCCESS,
    loading: false,
    error: false,
    accessToken
});

export const getAccessToken = () => dispatch => {
  dispatch(accessTokenReq());
  return fetch('/api/spotify/access-token').then(res => res.json())
    .then(result => { 
      return dispatch(accessTokenSuccess(result.body.access_token)); 
    })
    .catch(err => console.error(err));
}

// Functions for getting Music data
function getMusicData(userSearch, accessToken) {
  let spotifyUrl = new URL('https://api.spotify.com/v1/search/');
  let albumQuery = {
    q: userSearch,
    type: 'album'
  };
  Object.keys(albumQuery).forEach(key => spotifyUrl.searchParams.append(key, albumQuery[key]));
  return fetch(spotifyUrl, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(response => {
    return response.json();
  })
  .then(res => {
    return getAlbum(res, userSearch, accessToken);
  })
  .catch(error => {
    // If error is due to invalid token, get a new token here with getAccessToken()
    // and then call the getMusicData function again
    console.error(error);
    return Promise.reject(error);
  });
}

function getAlbum(response, searchTerm, accessToken) {
  let bestCandidate = response.albums.items[0];
  let bestScore = 0;
  let searchLowerCase = searchTerm.toLowerCase();
  response.albums.items.forEach((album, idx) => {
    let newScore = 0;
    if (album.name.toLowerCase().indexOf("soundtrack") !== -1) {
      newScore += 10;
    }
    if (album.name.toLowerCase().indexOf("motion") !== -1) {
      newScore += 7;
    }
    if (album.name.toLowerCase().indexOf("picture") !== -1) {
      newScore += 7;
    }
    if (album.name.toLowerCase().indexOf("score") !== -1) {
      newScore += 7;
    }
    if (album.name.match(searchTerm)) {
      newScore += 15;
    }
    if (album.name.toLowerCase().indexOf(searchLowerCase) !== -1) {
      newScore += 15;
    }
    if (newScore > bestScore) {
      bestScore = newScore;
      bestCandidate = album;
    }
  });
  if (searchTerm === 'Guardians of the Galaxy') { bestCandidate = response.albums.items[0]; }
  return getTracks(bestCandidate, accessToken);
}

function getTracks(bestCandidate, accessToken) {
  const albumUrl = `https://api.spotify.com/v1/albums/${bestCandidate.id}`;
  const albumData = {
    albumTitle: bestCandidate.name,
    albumSpotifyID: bestCandidate.id,
    composer: bestCandidate.artists.name,
    albumArtUrl: bestCandidate.images[1].url 
  };
  return fetch(albumUrl, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }).then(response => response.json())
  .then(data => {
    albumData.tracks = data.tracks.items;
    return albumData;
  })
  .catch(error => {
    console.error(error);
    return Promise.reject(error);
  })
}

// For getting individual movie data
export function getMovieData(searchTerm) {
  const searchUrl = getSearchMovieUrl(searchTerm);
  return fetch(searchUrl).then(response => response.json())
  .then(data => {
    const id = data.results[0].id;
    const urlSearchID = `https://api.themoviedb.org/3/movie/${id}${MOVIE_API_KEY}`
    return fetch(urlSearchID).then(response => response.json())
  })
}

// Actions for fetching music and movie data for one particular movie
export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const fetchDataRequest = () => ({
    type: FETCH_DATA_REQUEST,
    loading: true,
    error: false
});

export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const fetchDataSuccess = (movie, album) => ({
    type: FETCH_DATA_SUCCESS,
    loading: false,
    error: false,
    movie,
    album
});

export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';
export const fetchDataError = () => ({
    type: FETCH_DATA_ERROR,
    loading: false,
    error: true
});

export const fetchMovieAlbumData = (searchTerm, accessToken) => dispatch => {
  dispatch(fetchDataRequest());
  const requests = [getMovieData(searchTerm), getMusicData(searchTerm, accessToken)];
  return Promise.all(requests)
  .then(data => {
    const movie = data[0];
    const music = data[1];
    const movieData = {
      title: movie.title,
      tagline: movie.tagline,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      year: movie.release_date.substr(0, 4),
      description: movie.overview,
      rating: movie.vote_average,
      site: movie.homepage,
    };
    const musicData = {
      albumTitle: music.albumTitle,
      albumSpotifyID: music.albumSpotifyID,
      composer: music.composer,
      albumArtUrl: music.albumArtUrl,
      tracks: music.tracks 
    };
    return dispatch(fetchDataSuccess(movieData, musicData));
  })
  .catch(err => { 
    console.log('error properly received');
    console.error(err); 
    return dispatch(fetchDataError())
  });
}

