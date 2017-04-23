// For querying the MovieDB for a movie title's ID
//const MDB_SEARCH_URL="https://api.themoviedb.org/3/search/movie?api_key=1710c94a1d9a1c75e363bf47a0f446b3";
// The url path for getting the poster image in the Movie DB
const MOVIE_API_KEY = "?api_key=1710c94a1d9a1c75e363bf47a0f446b3";

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