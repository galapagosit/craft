import { connect } from 'react-redux'
import { signupAsync } from '../modules/signup'

import Signup from '../components/Signup'

const mapDispatchToProps = {
  signupAsync
}

const mapStateToProps = (state) => ({
  user : state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
