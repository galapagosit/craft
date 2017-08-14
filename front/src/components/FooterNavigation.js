import React from 'react'

import PropTypes from 'prop-types';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import RestoreIcon from 'material-ui-icons/Restore';
import FavoriteIcon from 'material-ui-icons/Favorite';
import LocationOnIcon from 'material-ui-icons/LocationOn';


const styleSheet = createStyleSheet({
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%'
  },
});


const buttonStyle = {
  'height': '24px'
};

class FooterNavigation extends React.Component {

  shouldComponentUpdate () {
    return false
  }

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render () {
    const classes = this.props.classes;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <BottomNavigation value={value} onChange={this.handleChange} showLabels>
          <BottomNavigationButton label="Recents" icon={<div style={buttonStyle}><RestoreIcon /></div>} />
          <BottomNavigationButton label="Favorites" icon={<div style={buttonStyle}><FavoriteIcon /></div>} />
          <BottomNavigationButton label="Nearby" icon={<div style={buttonStyle}><LocationOnIcon /></div>} />
          <BottomNavigationButton label="Nearby" icon={<div style={buttonStyle}><LocationOnIcon /></div>} />
        </BottomNavigation>
      </div>
    )
  }
}

FooterNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(FooterNavigation);
