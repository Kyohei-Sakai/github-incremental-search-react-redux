import axios from 'axios'
import Constants from '../../../constants'

// ------------------------------------
// Constants
// ------------------------------------

export const SEARCH_REPOS_WITH_TEXT = 'SEARCH_REPOS_WITH_TEXT'
export const SEARCH_REPOSITORY = 'SEARCH_REPOSITORY'
export const FAIND_WATCHED_REPOSITORY = 'FAIND_WATCHED_REPOSITORY'

// ------------------------------------
// Actions
// ------------------------------------

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export function searchReposWithText(e) {
  return {
    type    : SEARCH_REPOS_WITH_TEXT,
    payload : e.target.value
  }
}

export const getRepositories = () => {
  return (dispatch, getState) => {
    const API_URL = `${Constants.GITHUB_BASE_URL}/search/repositories`
    axios.get(API_URL, {
        params: {
          q: `${getState().repository.word}`,
          sort: 'stars',
        }
      })
      .then(function (response) {
        console.log(response);
        dispatch({
          type    : SEARCH_REPOSITORY,
          payload : response.data.items
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}

export const searchAndGetRepos = (e) => {
  return (dispatch, getState) => {
    dispatch(searchReposWithText(e))
    if (e.target.value !== '') {
      dispatch(getRepositories())
    }
  }
}

export const getWathedRepositories = () => {
  return (dispatch, getState) => {
    console.log(getState().searcher)
    const API_URL = `${Constants.GITHUB_BASE_URL}/user/subscriptions`
    axios.get(API_URL, {
        params: {
          access_token: Constants.GITHUB_ACCESS_TOKEN,
        }
      })
      .then(function (response) {
        console.log(response);
        dispatch({
          type    : FAIND_WATCHED_REPOSITORY,
          payload : response.data
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}

export const actions = {
  searchReposWithText,
  getRepositories,
  getWathedRepositories,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SEARCH_REPOS_WITH_TEXT] : (state, action) => {
    return Object.assign({}, state, {
      word: action.payload,
    })
  },
  [SEARCH_REPOSITORY] : (state, action) => {
    return Object.assign({}, state, {
      searchRepos: action.payload,
    })
  },
  [FAIND_WATCHED_REPOSITORY] : (state, action) => {
    return Object.assign({}, state, {
      watchedRepos: action.payload,
    })
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    word: '',
    searchRepos: [],
    watchedRepos: [],
}
export default function repositoryReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
