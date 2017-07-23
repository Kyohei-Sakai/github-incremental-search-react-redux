import axios from 'axios'
import Constants from '../../../constants'

// ------------------------------------
// Constants
// ------------------------------------

export const SEARCH_REPOS_WITH_TEXT = 'SEARCH_REPOS_WITH_TEXT'
export const SEARCH_REPOSITORY = 'SEARCH_REPOSITORY'
export const FAIND_WATCHED_REPOSITORY = 'FAIND_WATCHED_REPOSITORY'
export const CHANGE_WATCH_STATUS = 'CHANGE_WATCH_STATUS'
export const CHANGE_SEARCH_REQUEST_LIMIT = 'CHANGE_SEARCH_REQUEST_LIMIT'

// ------------------------------------
// Actions
// ------------------------------------

export function searchReposWithText(e) {
  return {
    type    : SEARCH_REPOS_WITH_TEXT,
    payload : e.target.value
  }
}

export function changeLimit(bool) {
  return {
    type    : CHANGE_SEARCH_REQUEST_LIMIT,
    payload : bool
  }
}

export const getRepositories = () => {
  return (dispatch, getState) => {
    const API_URL = `${Constants.GITHUB_BASE_URL}/search/repositories`
    axios.get(API_URL, {
        params: {
          access_token: Constants.GITHUB_ACCESS_TOKEN,
          q: `${getState().repository.word}`,
          sort: 'stars',
        }
      })
      .then((response) => {
        console.log(response)
        dispatch({
          type    : SEARCH_REPOSITORY,
          payload : response.data.items
        })
        if (getState().repository.reqLimit) {
          dispatch(changeLimit(false))
        }
      })
      .catch((error) => {
        console.log(error)
        dispatch(changeLimit(true))
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
      .then((response) => {
        console.log(response)
        dispatch({
          type    : FAIND_WATCHED_REPOSITORY,
          payload : response.data
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export function changeWatchStatus(e) {
  return {
    type    : CHANGE_WATCH_STATUS,
    payload : e.target.value
  }
}

export const unWatchRepository = (e) => {
  return (dispatch, getState) => {
    dispatch(changeWatchStatus(e))
    const repo = getState().repository.watchedRepos[e.target.value]
    const API_URL = `${Constants.GITHUB_BASE_URL}/repos/${repo.full_name}/subscription`
    axios.delete(API_URL, {
        params: {
          access_token: Constants.GITHUB_ACCESS_TOKEN,
        }
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export const watchRepository = (e) => {
  return (dispatch, getState) => {
    dispatch(changeWatchStatus(e))
    const repo = getState().repository.searchRepos[e.target.value]
    console.log(repo)
    const API_URL = `${Constants.GITHUB_BASE_URL}/repos/${repo.full_name}/subscription`
    axios.put(API_URL, {
        subscribed: true,
      }, {
        params: {
          access_token: Constants.GITHUB_ACCESS_TOKEN,
        }
      })
      .then((response) => {
        console.log(response)
        dispatch(getWathedRepositories())
        dispatch(getRepositories())
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export const actions = {
  searchReposWithText,
  searchAndGetRepos,
  getRepositories,
  getWathedRepositories,
  changeWatchStatus,
  changeLimit,
  unWatchRepository,
  watchRepository,
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
  [CHANGE_WATCH_STATUS] : (state, action) => {
    return Object.assign({}, state, {
      changedRepo: action.payload,
    })
  },
  [CHANGE_SEARCH_REQUEST_LIMIT] : (state, action) => {
    return Object.assign({}, state, {
      reqLimit: action.payload,
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
    changedRepo: {},
    reqLimit: false,
}
export default function repositoryReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
