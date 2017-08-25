import fetch from 'isomorphic-fetch';

export const getPositionsAsync = () => {
  return (dispatch, getState) => {
    return fetch(`${CONFIG.BASE_URL}/positions`, {
      method: 'GET',
      headers: CONFIG.COMMON_HEADERS,
      mode: 'cors',
      credentials: 'include'
    }).then(
      response => response.json()
    ).then(json => {
      dispatch({
        type: 'GET_POSITIONS_ASYNC',
        payload: json
      })
    })
  }
}

export const createPositionAsync = (form) => {
  return (dispatch, getState) => {
    return fetch(`${CONFIG.BASE_URL}/positions`, {
      method: 'POST',
      headers: CONFIG.COMMON_HEADERS,
      body: JSON.stringify(form)
    }).then(
      response => response.json()
    ).then(json => {
      dispatch({
        type: 'CREATE_POSITION_ASYNC',
        payload: json
      })
    })
  }
}

export const actions = {
  getPositionsAsync,
  createPositionAsync,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ['GET_POSITIONS_ASYNC']: (state, positions) => {
    return positions
  },
  ['CREATE_POSITION_ASYNC']: (state, position) => {
    return [...state, position]
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  positions: []
}
export default function positionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
