import React from 'react'
import Button from 'material-ui/Button';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import AddIcon from 'material-ui-icons/Add';
import FolderIcon from 'material-ui-icons/Folder';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';


const styleSheet = createStyleSheet((theme) => ({root: {}}));

const DragHandle = SortableHandle(() =>
  <Avatar>
    <FolderIcon/>
  </Avatar>
); // This can be any component you want

const SortableItem = SortableElement(({position}) =>
  <ListItem button>
    <DragHandle/>
    <ListItemText primary={position.name} secondary="Jan 9, 2016"/>
  </ListItem>
);

const SortableList = SortableContainer(({positions}) => {
  return (
    <div>
      <List>
        {positions.map((position, index) => (
          <SortableItem key={`item-${index}`} index={index} position={position} />
        ))}
      </List>
    </div>
  );
});


class PositionView extends React.Component {
  state = {
    dialog_open: false,
    //positions: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
    add_position: {
      name: ''
    },
  };

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      positions: arrayMove(this.props.positions, oldIndex, newIndex),
    });
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
        <h4>Position</h4>
        <Button fab color="primary" aria-label="add" className={classes.button}
                onClick={event => this.setState({dialog_open: true})}>
          <AddIcon/>
        </Button>

        <SortableList positions={this.props.position.positions} onSortEnd={this.onSortEnd} useDragHandle={true} />

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
