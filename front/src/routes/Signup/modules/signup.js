import fetch from 'isomorphic-fetch';
import {browserHistory} from 'react-router'

export const signupAsync = (form) => {
  return (dispatch, getState) => {
    return fetch(`${CONFIG.BASE_URL}/signup`, {
      method: 'POST',
      headers: CONFIG.COMMON_HEADERS,
      body: JSON.stringify(form),
      mode: 'cors',
      credentials: 'include'
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
