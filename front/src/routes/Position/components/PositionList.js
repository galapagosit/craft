import React from 'react'
import FolderIcon from 'material-ui-icons/Folder';
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';


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
          <div>
            <Divider />
            <SortableItem key={`item-${index}`} index={index} position={position} />
          </div>
        ))}
      </List>
    </div>
  );
});




export default SortableList;
