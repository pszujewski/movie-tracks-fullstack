export const ADD_FAVORITE_REQUEST = 'ADD_FAVORITE_REQUEST';
export const addFavoriteRequest = () => ({
    type: ADD_FAVORITE_REQUEST,
    loading: true
});

export const ADD_FAVORITE_SUCCESS = 'ADD_FAVORITE_SUCCESS';
export const addFavoriteSuccess = user => ({
    type: ADD_FAVORITE_SUCCESS,
    loading: false,
    user
});

export const addNewFavorite = (newFavorite) => dispatch => {
  dispatch(addFavoriteRequest());
  fetch('../../../api/favorites', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "PUT",
    body: JSON.stringify(newFavorite)
  })
  .then(res => {
    console.log('PUT Success');
    return res.json(); 
  })
  .then(userDoc => {
    return dispatch(addFavoriteSuccess(userDoc));
  });
}

export const REMOVE_FAVORITE_REQUEST = 'REMOVE_FAVORITE_REQUEST';
export const removeFavoriteRequest = () => ({
    type: REMOVE_FAVORITE_REQUEST,
    loading: true
});

export const REMOVE_FAVORITE_SUCCESS = 'REMOVE_FAVORITE_SUCCESS';
export const removeFavoriteSuccess = user => ({
    type: REMOVE_FAVORITE_SUCCESS,
    loading: false,
    user
});

export const deleteFavorite = (ids) => dispatch => {
  dispatch(removeFavoriteRequest());
  fetch('../../../api/favorites', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "DELETE",
    body: JSON.stringify(ids)
  })
  .then(result => {
    console.log('DELETE Success');  
    return result.json();
  })
  .then(jsonValue => {
    return dispatch(removeFavoriteSuccess(jsonValue));
  })
  .catch(err => console.log(err))
}