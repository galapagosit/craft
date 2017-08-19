import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'signup',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Counter = require('./containers/SignupContainer').default
      const reducer = require('./modules/signup').default

      injectReducer(store, { key: 'user', reducer })

      cb(null, Counter)

    }, 'signup')
  }
})
