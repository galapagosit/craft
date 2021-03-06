import fetch from 'isomorphic-fetch';
import {browserHistory} from 'react-router'

export const signupAsync = (form) => {
  return (dispatch, getState) => {
    return fetch(`${CONFIG.BASE_URL}/signup`, {
      ...CONFIG.FETCH_BASE_PARAMS,
      method: 'POST',
      body: JSON.stringify(form),
    }).then(
      response => response.json()
    ).then(json => {
      dispatch({
        type: 'SIGNUP_ASYNC',
        payload: json
      })
      browserHistory.push('/counter')
    })
  }
}

export const actions = {
  signupAsync,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ['SIGNUP_ASYNC']: (state, action) => {
    return {...state, is_login: true}
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  is_login: false
}
export default function signupReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
