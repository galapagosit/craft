import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'move/:id',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Move = require('./containers/MoveContainer').default
      const reducer = require('./modules/move').default

      injectReducer(store, { key: 'move', reducer })

      cb(null, Move)

    }, 'move')
  }
})
