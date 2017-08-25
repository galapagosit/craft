import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'position',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Position = require('./containers/PositionContainer').default
      const reducer = require('./modules/position').default

      injectReducer(store, { key: 'position', reducer })

      cb(null, Position)

    }, 'position')
  }
})
