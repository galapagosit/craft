import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import AccessibilityIcon from 'material-ui-icons/Accessibility';
import DirectionsWalkIcon from 'material-ui-icons/DirectionsWalk';

const styles = createStyleSheet(theme => ({
  list: {
    width: 250,
    flex: 'initial',
  },
  listFull: {
    width: 'auto',
    flex: 'initial',
  },
}));

class PositionDrawer extends React.Component {
  render() {
    const classes = this.props.classes;

    const sideList = (
      <div>
        <List className={classes.list}>
          <ListItem button onClick={() => this.props.updateState({position_dialog_open: true, drawer_open: false})}>
            <ListItemIcon>
              <AccessibilityIcon />
            </ListItemIcon>
            <ListItemText inset primary="Add position" />
          </ListItem>
          <ListItem button onClick={() => this.props.updateState({move_dialog_open: true, drawer_open: false})}>
            <ListItemIcon>
              <DirectionsWalkIcon />
            </ListItemIcon>
            <ListItemText inset primary="Add move" />
          </ListItem>
        </List>
      </div>
    );

    return (
      <div>
        <Drawer
          anchor="right"
          open={this.props.open}
          onRequestClose={() => this.props.updateState({drawer_open: false})}
        >
          {sideList}
        </Drawer>
      </div>
    );
  }
}

PositionDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PositionDrawer);
