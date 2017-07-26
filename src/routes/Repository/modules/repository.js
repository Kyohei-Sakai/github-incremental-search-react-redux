import axios from 'axios'
import Constants from '../../../constants'

// ------------------------------------
// Constants
// ------------------------------------

export const CHANGE_SEARCH_KEYWORD = 'CHANGE_SEARCH_KEYWORD'
export const CHANGE_SEARCHED_REPOS = 'CHANGE_SEARCHED_REPOS'
export const CHANGE_SEARCH_REQUEST_LIMIT = 'CHANGE_SEARCH_REQUEST_LIMIT'
export const CHANGE_SORT_PARAM = 'CHANGE_SORT_PARAM'
export const DELETE_SEACHED_REPOS_LIST_ALL = 'DELETE_SEACHED_REPOS_LIST_ALL'
export const CHANGE_WATCHED_REPOS = 'CHANGE_WATCHED_REPOS'
export const CHANGE_FILTER_KEYWORD = 'CHANGE_FILTER_KEYWORD'
export const CHANGE_FILTER_WATCHED_ROPOS = 'CHANGE_FILTER_WATCHED_ROPOS'
export const DELETE_REPO_FROM_WATCHED_LIST = 'DELETE_REPO_FROM_WATCHED_LIST'

// ------------------------------------
// Actions
// ------------------------------------

export function changeSearchKeyword(text) {
  return {
    type    : CHANGE_SEARCH_KEYWORD,
    payload : text
  }
}

export function changeSearchedRepos(data) {
  return {
    type    : CHANGE_SEARCHED_REPOS,
    payload : data
  }
}

export function changeSearchRequestLimit(bool) {
  return {
    type    : CHANGE_SEARCH_REQUEST_LIMIT,
    payload : bool
  }
}

export function changeSortParam(text) {
  return {
    type    : CHANGE_SORT_PARAM,
    payload : text
  }
}

export function deleteSeachedReposListAll() {
  return {
    type    : DELETE_SEACHED_REPOS_LIST_ALL,
    payload : []
  }
}

export function changeWatchedRepos(data) {
  return {
    type    : CHANGE_WATCHED_REPOS,
    payload : data
  }
}

export function changeFilterKeyword(text) {
  return {
    type    : CHANGE_FILTER_KEYWORD,
    payload : text
  }
}

export function changeFilterWatchedRopos(data) {
  return {
    type    : CHANGE_FILTER_WATCHED_ROPOS,
    payload : data
  }
}

export function deleteRepoFromWatchedList(index) {
  return {
    type    : DELETE_REPO_FROM_WATCHED_LIST,
    payload : index
  }
}

export const filterWatchedRepos = (e) => {
  return (dispatch, getState) => {
    const filterWord = e.target.value
    dispatch(changeFilterKeyword(filterWord))
    const watchedRepos = getState().repository.watchedRepos
    var RefineRepos = []
    watchedRepos.forEach((repo) => {
      if (repo.full_name.indexOf(filterWord) === -1) {
        return;
      } else {
        RefineRepos.push(repo)
      }
    })
    dispatch(changeFilterWatchedRopos(RefineRepos))
  }
}

export const selectSortParam = (e) => {
  return (dispatch, getState) => {
    dispatch(changeSortParam(e.target.value))
  }
}

export const searchReposWithKeyword = (e) => {
  return (dispatch, getState) => {
    const searchWord = e.target.value
    dispatch(changeSearchKeyword(searchWord))
    if (searchWord === '') {
      dispatch(deleteSeachedReposListAll())
    } else {
      dispatch(getReposWithKeyword())
    }
  }
}

export const getReposWithKeyword = () => {
  return (dispatch, getState) => {
    const { searchWord, sortParam } = getState().repository
    const API_URL = `${Constants.GITHUB_BASE_URL}/search/repositories`
    axios.get(API_URL, {
        params: {
          access_token: Constants.GITHUB_ACCESS_TOKEN,
          q: searchWord,
          sort: sortParam,
          per_page: 50,   // default: 30, max: 100
        }
      })
      .then((response) => {
        console.log(response)
        dispatch(changeSearchedRepos(response.data.items))
        if (getState().repository.reqLimit) {
          dispatch(changeSearchRequestLimit(false))
        }
      })
      .catch((error) => {
        console.log(error)
        dispatch(changeSearchRequestLimit(true))
      })
  }
}

export const getWathedRepos = () => {
  return (dispatch, getState) => {
    const API_URL = `${Constants.GITHUB_BASE_URL}/user/subscriptions`
    axios.get(API_URL, {
        params: {
          access_token: Constants.GITHUB_ACCESS_TOKEN,
          per_page: 100,
        }
      })
      .then((response) => {
        console.log(response)
        dispatch(changeWatchedRepos(response.data))
        dispatch(changeFilterWatchedRopos(response.data))
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export const unWatchRepo = (e) => {
  return (dispatch, getState) => {
    const index = Number(e.target.value)
    const repo = getState().repository.filteredRepos[index]
    const API_URL = `${Constants.GITHUB_BASE_URL}/repos/${repo.full_name}/subscription`
    axios.delete(API_URL, {
        params: {
          access_token: Constants.GITHUB_ACCESS_TOKEN,
        }
      })
      .then((response) => {
        console.log(response)
        dispatch(deleteRepoFromWatchedList(index))
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export const watchRepo = (e) => {
  return (dispatch, getState) => {
    const repo = getState().repository.searchedRepos[e.target.value]
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
        dispatch(getWathedRepos())
        dispatch(getReposWithKeyword())
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export const actions = {
  changeSearchKeyword,
  changeSearchedRepos,
  changeSearchRequestLimit,
  changeSortParam,
  deleteSeachedReposListAll,
  changeWatchedRepos,
  changeFilterKeyword,
  changeFilterWatchedRopos,
  deleteRepoFromWatchedList,
  filterWatchedRepos,
  selectSortParam,
  searchReposWithKeyword,
  getReposWithKeyword,
  getWathedRepos,
  unWatchRepo,
  watchRepo,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CHANGE_SEARCH_KEYWORD] : (state, action) => {
    return Object.assign({}, state, {
      searchWord: action.payload,
    })
  },
  [CHANGE_SEARCHED_REPOS] : (state, action) => {
    return Object.assign({}, state, {
      searchedRepos: action.payload,
    })
  },
  [CHANGE_SEARCH_REQUEST_LIMIT] : (state, action) => {
    return Object.assign({}, state, {
      reqLimit: action.payload,
    })
  },
  [CHANGE_SORT_PARAM] : (state, action) => {
    return Object.assign({}, state, {
      sortParam: action.payload,
    })
  },
  [DELETE_SEACHED_REPOS_LIST_ALL] : (state, action) => {
    return Object.assign({}, state, {
      searchedRepos: action.payload,
    })
  },
  [CHANGE_WATCHED_REPOS] : (state, action) => {
    return Object.assign({}, state, {
      watchedRepos: action.payload,
    })
  },
  [CHANGE_FILTER_KEYWORD] : (state, action) => {
    return Object.assign({}, state, {
      filterWord: action.payload,
    })
  },
  [CHANGE_FILTER_WATCHED_ROPOS] : (state, action) => {
    return Object.assign({}, state, {
      filteredRepos: action.payload,
    })
  },
  [DELETE_REPO_FROM_WATCHED_LIST] : (state, action) => {
    const filteredRepos = [].concat(state.filteredRepos)
    const deleteIndex = action.payload
    const newWatchedRepos = filteredRepos.filter((repo, index) => {
      return index != deleteIndex
    })
    return Object.assign({}, state, {
      filteredRepos: newWatchedRepos,
    })
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    searchedRepos: [],
    searchWord: '',
    reqLimit: false,
    sortParam: '',  // stars, forks, updated | default: sorted by best match.
    watchedRepos: [],
    filterWord: '',
    filteredRepos: [],
}

export default function repositoryReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
