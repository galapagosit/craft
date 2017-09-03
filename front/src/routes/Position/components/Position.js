import React from 'react'
import Button from 'material-ui/Button';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import AddIcon from 'material-ui-icons/Add';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';



const styleSheet = createStyleSheet((theme) => ({root: {}}));


class PositionView extends React.Component {
  state = {
    dialog_open: false,
    add_position: {
      name: ''
    },
  };

  componentDidMount() {
    this.props.getPositionsAsync()
  }

  handleRequestClose = () => {
    this.setState({dialog_open: false})
    this.setState({add_position: {name: ''}})
  }

  addPosition = () => {
    this.props.createPositionAsync(this.state.add_position)
    this.setState({dialog_open: false})
    this.setState({add_position: {name: ''}})
  }

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <Button fab color="primary" aria-label="add" className={classes.button}
                onClick={event => this.setState({dialog_open: true})}>
          <AddIcon/>
        </Button>


        <Dialog open={this.state.dialog_open} onRequestClose={this.handleRequestClose}>
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
            <Button onClick={this.handleRequestClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.addPosition} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    )
  }
}

PositionView.defaultProps = {
  position:{
    positions: [],
  }
};


export default withStyles(styleSheet)(PositionView);
