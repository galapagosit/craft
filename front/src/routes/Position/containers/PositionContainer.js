import { connect } from 'react-redux'
import { getPositionsAsync, createPositionAsync } from '../modules/position'

import Position from '../components/Position'

const mapDispatchToProps = {
  getPositionsAsync,
  createPositionAsync
}

const mapStateToProps = (state) => ({
  positions : state.positions
})

export default connect(mapStateToProps, mapDispatchToProps)(Position)
