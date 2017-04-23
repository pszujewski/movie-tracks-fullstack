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
  .then(dataJson => {
    return dataJson.results.map(movie => {
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
     .then(dataJson => {
      const titles = [];
      dataJson.genres.forEach(genre => {
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

// Actions for fetching one particular movie
export const FETCH_MOVIE_REQUEST = 'FETCH_MOVIE_REQUEST';
export const fetchMovieRequest = () => ({
    type: FETCH_MOVIE_REQUEST,
    loading: true
});

export const FETCH_MOVIE_SUCCESS = 'FETCH_MOVIE_SUCCESS';
export const fetchMovieSuccess = movie => ({
    type: FETCH_MOVIE_SUCCESS,
    loading: false,
    movie
});

export const fetchMovie = (searchTerm) => dispatch => {
  dispatch(fetchMovieRequest());
  const searchUrl = getSearchMovieUrl(searchTerm);
  return fetch(searchUrl)
  .then(data => data.json())
  .then(dataJson => {
    console.log('first response received');
    console.log(dataJson);
    const id = dataJson.results[0].id;
    const urlSearchID = `https://api.themoviedb.org/3/movie/${id}${MOVIE_API_KEY}`
    return fetch(urlSearchID)
  })
  .then(movie => movie.json())
  .then(movieJson => {
    console.log('second response received');
    const movieData = {
      title: movieJson.title,
      tagline: movieJson.tagline,
      poster: `https://image.tmdb.org/t/p/w500${movieJson.poster_path}`,
      year: movieJson.release_date.substr(0, 4),
      description: movieJson.overview,
      rating: movieJson.vote_average,
      site: movieJson.homepage,
    };
    return dispatch(fetchMovieSuccess(movieData))
  })
  .catch(err => console.error(err));
}
