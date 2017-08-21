import { connect } from 'react-redux'
import { loginAsync } from '../modules/login'

import Login from '../components/Login'

const mapDispatchToProps = {
  loginAsync
}

const mapStateToProps = (state) => ({
  user : state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
