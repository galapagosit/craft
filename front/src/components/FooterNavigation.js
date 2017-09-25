import React from 'react'

import PropTypes from 'prop-types';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';

import RestoreIcon from 'material-ui-icons/Restore';
import AccessibilityIcon from 'material-ui-icons/Accessibility';
import DirectionsWalkIcon from 'material-ui-icons/DirectionsWalk';
import BugReportIcon from 'material-ui-icons/BugReport';
import SettingsIcon from 'material-ui-icons/Settings';
import {browserHistory} from 'react-router'
import Divider from 'material-ui/Divider';


const styleSheet = createStyleSheet({
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: '54px'
  },
});

const navStyle = {
  'padding': '0',
  minWidth: '50px'
};

const buttonStyle = {
  'height': '24px'
};

const iconStyle = {
  'width': '20'
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
        browserHistory.push('/position/0')
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
        <Divider />
        <BottomNavigation value={value} onChange={this.handleChange} showLabels>
          <BottomNavigationButton style={navStyle} label="Recent" icon={<div style={buttonStyle}><RestoreIcon /></div>} />
          <BottomNavigationButton style={navStyle} label="Position" icon={<div style={buttonStyle}><AccessibilityIcon /></div>} />
          <BottomNavigationButton style={navStyle} label="Move" icon={<div style={buttonStyle}><DirectionsWalkIcon /></div>} />
          <BottomNavigationButton style={navStyle} label="Issue" icon={<div style={buttonStyle}><BugReportIcon /></div>} />
          <BottomNavigationButton style={navStyle} label="Setting" icon={<div style={buttonStyle}><SettingsIcon /></div>} />
        </BottomNavigation>
      </div>
    )
  }
}

FooterNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(FooterNavigation);
