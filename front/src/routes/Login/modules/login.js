import fetch from 'isomorphic-fetch';
import {browserHistory} from 'react-router'

export const loginAsync = (form) => {
  return (dispatch, getState) => {
    return fetch(`${CONFIG.BASE_URL}/login`, {
      method: 'POST',
      headers: CONFIG.COMMON_HEADERS,
      body: JSON.stringify(form)
    }).then(
      response => response.json()
    ).then(json => {
      dispatch({
        type: 'LOGIN_ASYNC',
        payload: json
      })
      browserHistory.push('/')
    })
  }
}

export const actions = {
  loginAsync,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ['LOGIN_ASYNC']: (state, action) => {
    return {...state, is_login: true}
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  is_login: false
}
export default function loginReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
