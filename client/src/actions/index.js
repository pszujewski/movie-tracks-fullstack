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
      dispatch(fetchTitlesSuccess(titles));
      return Promise.resolve();
    })
    .catch(err => console.error(err));
}

// Functions for getting Music data
function getMusicData(userSearch) {
  let spotifyUrl = new URL('https://api.spotify.com/v1/search/');
  let albumQuery = {
    q: userSearch,
    type: 'album'
  };
  Object.keys(albumQuery).forEach(key => spotifyUrl.searchParams.append(key, albumQuery[key]));
  return fetch(spotifyUrl).then(response => {
    return response.json();
  })
  .then(res => {
    return getAlbum(res, userSearch);
  })
  .catch(error => {
    console.error(error);
    return Promise.reject(error);
  });
}

function getAlbum(response, searchTerm) {
  let bestCandidate = response.albums.items[0];
  let bestScore = 0;
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
    if (album.name.match(searchTerm)) {
      newScore += 15;
    }
    if (newScore > bestScore) {
      bestScore = newScore;
      bestCandidate = album;
    }
  });
  return getTracks(bestCandidate);
}

function getTracks(bestCandidate) {
  const albumUrl = `https://api.spotify.com/v1/albums/${bestCandidate.id}`;
  const albumData = {
    albumTitle: bestCandidate.name,
    albumSpotifyID: bestCandidate.id,
    composer: bestCandidate.artists.name,
    albumArtUrl: bestCandidate.images[1].url 
  };
  return fetch(albumUrl).then(response => response.json())
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
function getMovieData(searchTerm) {
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
    loading: true
});

export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const fetchDataSuccess = (movie, album) => ({
    type: FETCH_DATA_SUCCESS,
    loading: false,
    movie,
    album
});

export const fetchMovieAlbumData = (searchTerm) => dispatch => {
  dispatch(fetchDataRequest());
  const requests = [getMovieData(searchTerm), getMusicData(searchTerm)];
  return Promise.all(requests)
  .then(data => {
    console.log('responses received -> movie and music data');
    console.log(data);
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
  .catch(err => console.error(err));
}

