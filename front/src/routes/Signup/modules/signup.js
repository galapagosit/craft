import fetch from 'isomorphic-fetch';

export const signupAsync = () => {
  return (dispatch, getState) => {
    return fetch(`http://localhost:1323/register`).then(
        response => response.json()
      ).then(json =>
        dispatch({
          type: 'SIGNUP_ASYNC',
          payload: json
        })
      )
  }
}

export const actions = {
  signupAsync,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ['SIGNUP_ASYNC']    : (state, action) => {
    return {...state, is_login: true}
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  is_login: false
}
export default function signupReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
