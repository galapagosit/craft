import { connect } from 'react-redux'
import {
} from '../modules/move'

import Move from '../components/Move'

const mapDispatchToProps = {
}

const mapStateToProps = (state) => ({
  move : state.move
})

export default connect(mapStateToProps, mapDispatchToProps)(Move)
