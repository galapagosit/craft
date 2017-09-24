import React, {Component} from 'react';
import {render} from 'react-dom';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from 'react-sortable-hoc';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import AccessibilityIcon from 'material-ui-icons/Accessibility';
import DirectionsWalkIcon from 'material-ui-icons/DirectionsWalk';


const PositionDragHandle = SortableHandle(() => {
  return (
    <ListItemIcon>
      <AccessibilityIcon/>
    </ListItemIcon>
  )
});

const Position = SortableElement(({position}) => {
  return (
    <div style={{textAlign: 'center'}}>
      <ListItem button>
        <PositionDragHandle/>
        <ListItemText primary={position.name}/>
      </ListItem>
    </div>
  );
});

const MoveDragHandle = SortableHandle(() => {
  return (
    <ListItemIcon>
      <DirectionsWalkIcon/>
    </ListItemIcon>
  )
});

const Move = SortableElement(({move}) => {
  return (
    <div style={{textAlign: 'center'}}>
      <ListItem button>
        <MoveDragHandle/>
        <ListItemText primary={move.name}/>
      </ListItem>
    </div>
  );
});

const SortableList = SortableContainer(({positions, moves}) => {
  return (
    <div>
      {positions.map((position, index) => (
        <Position key={`positions-${index}`} index={index} position={position}/>
      ))}
      {moves.map((move, index) => (
        <Move key={`moves-${index}`} index={index + positions.length - 1} move={move}/>
      ))}
    </div>
  );
});

class PositionList extends Component {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
  };
  onSortEnd = ({oldIndex, newIndex}) => {
    const {items} = this.state;

    this.setState({
      items: arrayMove(items, oldIndex, newIndex),
    });
  };

  render() {
    return <SortableList positions={this.props.positions} moves={this.props.moves} onSortEnd={this.onSortEnd} useDragHandle={true}/>;
  }
}

export default PositionList;
