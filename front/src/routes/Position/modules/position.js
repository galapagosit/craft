import fetch from 'isomorphic-fetch';

export const getPositionsAsync = () => {
  return (dispatch, getState) => {
    return fetch(`${CONFIG.BASE_URL}/positions`, {
      ...CONFIG.FETCH_BASE_PARAMS,
      method: 'GET',
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
      ...CONFIG.FETCH_BASE_PARAMS,
      method: 'POST',
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

export const getMovesAsync = () => {
  return (dispatch, getState) => {
    return fetch(`${CONFIG.BASE_URL}/moves`, {
      ...CONFIG.FETCH_BASE_PARAMS,
      method: 'GET',
    }).then(
      response => response.json()
    ).then(json => {
      dispatch({
        type: 'GET_MOVES_ASYNC',
        payload: json
      })
    })
  }
}

export const createMoveAsync = (form) => {
  return (dispatch, getState) => {
    return fetch(`${CONFIG.BASE_URL}/moves`, {
      ...CONFIG.FETCH_BASE_PARAMS,
      method: 'POST',
      body: JSON.stringify(form)
    }).then(
      response => response.json()
    ).then(json => {
      dispatch({
        type: 'CREATE_MOVE_ASYNC',
        payload: json
      })
    })
  }
}

export const actions = {
  getPositionsAsync,
  createPositionAsync,
  getMovesAsync,
  createMoveAsync,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ['GET_POSITIONS_ASYNC']: (state, action) => {
    return {...state, positions: action.payload}
  },
  ['CREATE_POSITION_ASYNC']: (state, action) => {
    return {...state, positions: [...state.positions, action.payload]}
  },
  ['GET_MOVES_ASYNC']: (state, action) => {
    return {...state, moves: action.payload}
  },
  ['CREATE_MOVE_ASYNC']: (state, action) => {
    return {...state, moves: [...state.moves, action.payload]}
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  positions:[],
  moves:[]
}
export default function positionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
