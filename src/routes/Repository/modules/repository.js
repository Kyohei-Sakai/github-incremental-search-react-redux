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
export const DELETE_REPO_FROM_WATCHED_LIST = 'DELETE_REPO_FROM_WATCHED_LIST'
export const DELETE_LIST_ALL = 'DELETE_LIST_ALL'
export const CHANGE_SORT_PARAM = 'CHANGE_SORT_PARAM'
export const CHANGE_REFINE_WORD = 'CHANGE_REFINE_WORD'
export const REFINE_SEARCH_WATCHED_ROPOS = 'REFINE_SEARCH_WATCHED_ROPOS'

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

export function changeWatchStatus(e) {
  return {
    type    : CHANGE_WATCH_STATUS,
    payload : e.target.value
  }
}

export function deleteRepoFromWatchedList(index) {
  return {
    type    : DELETE_REPO_FROM_WATCHED_LIST,
    payload : index
  }
}

export function deleteListAll() {
  return {
    type    : DELETE_LIST_ALL,
    payload : []
  }
}

export function changeSort(text) {
  return {
    type    : CHANGE_SORT_PARAM,
    payload : text
  }
}

export function changeRefineWord(text) {
  return {
    type    : CHANGE_REFINE_WORD,
    payload : text
  }
}

export const refineWatchedRepos = (e) => {
  return (dispatch, getState) => {
    const word = e.target.value
    dispatch(changeRefineWord(word))
    const watchedRepos = getState().repository.watchedRepos
    var RefineRepos = []
    watchedRepos.forEach((repo) => {
      if (repo.full_name.indexOf(word) === -1) {
        return;
      } else {
        RefineRepos.push(repo)
      }
    })
    dispatch({
      type    : REFINE_SEARCH_WATCHED_ROPOS,
      payload : RefineRepos
    })
  }
}

export const changeSortParam = (e) => {
  return (dispatch, getState) => {
    dispatch(changeSort(e.target.value))
  }
}

export const getRepositories = () => {
  return (dispatch, getState) => {
    const { word, sortParam } = getState().repository
    const API_URL = `${Constants.GITHUB_BASE_URL}/search/repositories`
    axios.get(API_URL, {
        params: {
          access_token: Constants.GITHUB_ACCESS_TOKEN,
          q: word,
          sort: sortParam,
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
    if (e.target.value === '') {
      dispatch(deleteListAll())
    } else {
      dispatch(getRepositories())
    }
  }
}

export const getWathedRepositories = () => {
  return (dispatch, getState) => {
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
        dispatch({
          type    : REFINE_SEARCH_WATCHED_ROPOS,
          payload : response.data
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export const unWatchRepository = (e) => {
  return (dispatch, getState) => {
    dispatch(changeWatchStatus(e))
    const index = Number(e.target.value)
    const repo = getState().repository.watchedRepos[index]
    const API_URL = `${Constants.GITHUB_BASE_URL}/repos/${repo.full_name}/subscription`
    axios.delete(API_URL, {
        params: {
          access_token: Constants.GITHUB_ACCESS_TOKEN,
        }
      })
      .then((response) => {
        console.log(response)
        console.log(index)
        dispatch(deleteRepoFromWatchedList(index))
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
  deleteRepoFromWatchedList,
  deleteListAll,
  changeSortParam,
  changeRefineWord,
  refineWatchedRepos,
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
  [DELETE_REPO_FROM_WATCHED_LIST] : (state, action) => {
    const watchedRepos = [].concat(state.watchedRepos)
    const deleteIndex = action.payload
    const newWatchedRepos = watchedRepos.filter((repo, index) => {
      return index != deleteIndex
    })
    return Object.assign({}, state, {
      watchedRepos: newWatchedRepos,
    })
  },
  [DELETE_LIST_ALL] : (state, action) => {
    return Object.assign({}, state, {
      searchRepos: action.payload,
    })
  },
  [CHANGE_SORT_PARAM] : (state, action) => {
    return Object.assign({}, state, {
      sortParam: action.payload,
    })
  },
  [CHANGE_REFINE_WORD] : (state, action) => {
    return Object.assign({}, state, {
      refineWord: action.payload,
    })
  },
  [REFINE_SEARCH_WATCHED_ROPOS] : (state, action) => {
    return Object.assign({}, state, {
      refineWatchedRepos: action.payload,
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
    sortParam: '',  // stars, forks, updated | default: sorted by best match.
    refineWord: '',
    refineWatchedRepos: [],
}

export default function repositoryReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
