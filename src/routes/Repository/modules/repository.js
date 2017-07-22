// ------------------------------------
// Constants
// ------------------------------------

export const SEARCH_REPOS_WITH_TEXT = 'SEARCH_REPOS_WITH_TEXT'

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

export const actions = {
  searchReposWithText
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SEARCH_REPOS_WITH_TEXT] : (state, action) => action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = ''
export default function repositoryReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
