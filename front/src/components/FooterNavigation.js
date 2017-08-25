import React from 'react'

import PropTypes from 'prop-types';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';

import RestoreIcon from 'material-ui-icons/Restore';
import AccessibilityIcon from 'material-ui-icons/Accessibility';
import DirectionsWalkIcon from 'material-ui-icons/DirectionsWalk';
import BugReportIcon from 'material-ui-icons/BugReport';
import Settingscon from 'material-ui-icons/Settings';
import {browserHistory} from 'react-router'


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

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
    switch (value) {
      case 0:
        browserHistory.push('/counter')
        break
      case 1:
        browserHistory.push('/position')
        break
      default:
        console.log('no root');
        break
    }
  };

  render () {
    const classes = this.props.classes;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <BottomNavigation value={value} onChange={this.handleChange} showLabels>
          <BottomNavigationButton label="Recent" icon={<div style={buttonStyle}><RestoreIcon /></div>} />
          <BottomNavigationButton label="Position" icon={<div style={buttonStyle}><AccessibilityIcon /></div>} />
          <BottomNavigationButton label="Move" icon={<div style={buttonStyle}><DirectionsWalkIcon /></div>} />
          <BottomNavigationButton label="Issue" icon={<div style={buttonStyle}><BugReportIcon /></div>} />
          <BottomNavigationButton label="Setting" icon={<div style={buttonStyle}><Settingscon /></div>} />
        </BottomNavigation>
      </div>
    )
  }
}

FooterNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(FooterNavigation);
