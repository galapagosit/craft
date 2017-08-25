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

const styleSheet = createStyleSheet((theme) => ({
  root: {
    'margin-top': 30,
    'margin-bottom': 10,
  },
}));


class PositionView extends React.Component {
  state = {
    dialog_open: false,
    position: {
      name: ''
    }
  };

  handleRequestClose = () => {
    this.setState({dialog_open: false});
  };

  componentDidMount() {
    this.props.getPositionsAsync();
  }

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <h4>Position</h4>
        <Button fab color="primary" aria-label="add" className={classes.button}
                onClick={event => this.setState({dialog_open: true})}>
          <AddIcon/>
        </Button>

        <Dialog open={this.state.dialog_open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>
            {"Add new position"}
          </DialogTitle>
          <div>
            <TextField
              id="name"
              label="name"
              value={this.state.position.name}
              onChange={event => this.setState({
                ...this.state,
                position: {...this.state.position, name: event.target.value}
              })}
              margin="normal"
            />
          </div>
          <DialogContent>
            <DialogContentText>
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose}>
              Cancel
            </Button>
            <Button onClick={() => this.props.createPositionAsync(this.state.position)} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    )
  }
}

export default withStyles(styleSheet)(PositionView);
