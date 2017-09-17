import React from 'react'
import Button from 'material-ui/Button';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import PositionList from './PositionList';
import PositionDrawer from './PositionDrawer';
import AppBar from '../../../components/AppBar';


const styleSheet = createStyleSheet((theme) => ({root: {}}));


class PositionView extends React.Component {
  state = {
    drawer_open: false,
    position_dialog_open: false,
    move_dialog_open: false,
    add_position: {
      name: ''
    },
    add_move: {
      name: ''
    },
  };

  componentDidMount() {
    this.props.getPositionsAsync()
    this.props.getMovesAsync()
  }

  handleRequestClosePosition = () => {
    this.setState({
      position_dialog_open: false,
      drawer_open: false
    })
    this.setState({add_position: {name: ''}})
  }

  handleRequestCloseMove = () => {
    this.setState({
      move_dialog_open: false,
      drawer_open: false
    })
    this.setState({add_move: {name: ''}})
  }

  addPosition = () => {
    this.props.createPositionAsync(this.state.add_position)
    this.setState({position_dialog_open: false})
    this.setState({add_position: {name: ''}})
  }

  addMove = () => {
    this.props.createMoveAsync(this.state.add_move)
    this.setState({move_dialog_open: false})
    this.setState({add_move: {name: ''}})
  }

  handleClickMenu = (event) => {
    this.setState({drawer_open: true})
  }

  updateState = (state) => {
    this.setState(state);
  }

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <AppBar onClickMenu={this.handleClickMenu}/>

        <div style={{paddingTop: '64px'}}>
          <PositionDrawer open={this.state.drawer_open} updateState={this.updateState}/>
          <PositionList positions={this.props.position.positions} moves={this.props.position.moves}/>

          <Dialog open={this.state.position_dialog_open} onRequestClose={this.handleRequestClosePosition}>
            <DialogTitle>
              {"Add position"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Add new position. You can nest position under other position.
              </DialogContentText>
              <TextField
                id="name"
                label="name"
                InputProps={{placeholder: 'Add new position'}}
                helperText="ex. Bottom Closed Guard"
                value={this.state.add_position.name}
                onChange={event => this.setState({add_position: {name: event.target.value}})}
                fullWidth
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleRequestClosePosition} color="primary">
                Cancel
              </Button>
              <Button onClick={this.addPosition} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={this.state.move_dialog_open} onRequestClose={this.handleRequestCloseMove}>
            <DialogTitle>
              {"Add move"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Add new move. You can nest position under other position.
              </DialogContentText>
              <TextField
                id="name"
                label="name"
                InputProps={{placeholder: 'Add new move'}}
                helperText="ex. Flower Sweep"
                value={this.state.add_move.name}
                onChange={event => this.setState({add_move: {name: event.target.value}})}
                fullWidth
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleRequestCloseMove} color="primary">
                Cancel
              </Button>
              <Button onClick={this.addMove} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </div>

      </div>
    )
  }
}

PositionView.defaultProps = {
  position: {
    positions: [],
    moves: [],
  }
};


export default withStyles(styleSheet)(PositionView);
