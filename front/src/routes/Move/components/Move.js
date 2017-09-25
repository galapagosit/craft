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
import AppBar from '../../../components/AppBar';
import MoveCard from './MoveCard';


const styleSheet = createStyleSheet((theme) => ({root: {}}));


class MoveView extends React.Component {

  render() {
    const classes = this.props.classes;
    return (
      <div style={{margin: '0 auto'}}>
        <MoveCard />
      </div>
    )
  }
}

MoveView.defaultProps = {
  move: {
    move_details: [],
  }
};


export default withStyles(styleSheet)(MoveView);
