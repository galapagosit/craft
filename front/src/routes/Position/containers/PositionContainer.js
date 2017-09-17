import { connect } from 'react-redux'
import {
  getPositionsAsync,
  createPositionAsync,
  getMovesAsync,
  createMoveAsync,
} from '../modules/position'

import Position from '../components/Position'

const mapDispatchToProps = {
  getPositionsAsync,
  createPositionAsync,
  getMovesAsync,
  createMoveAsync,
}

const mapStateToProps = (state) => ({
  position : state.position
})

export default connect(mapStateToProps, mapDispatchToProps)(Position)
