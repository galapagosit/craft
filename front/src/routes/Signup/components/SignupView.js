import React from 'react'
import './SignupView.scss'
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { IndexLink, Link } from 'react-router'


const styleSheet = createStyleSheet((theme) => ({
  root: {
    'margin-top': 30,
    'margin-bottom': 10,
  },
}));


class SignupView extends React.Component {
  state = {
    email: '',
    password: '',
    password_confirm: '',
  };

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <h4>Signup</h4>
        <div>
          <TextField
            id="email"
            label="Email"
            value={this.state.email}
            onChange={event => this.setState({email: event.target.value})}
            margin="normal"
          />
        </div>
        <div>
          <TextField
            id="password"
            label="Password"
            value={this.state.password}
            onChange={event => this.setState({password: event.target.value})}
            type="password"
            margin="normal"
          />
        </div>
        <div>
          <TextField
            id="password_confirm"
            label="Password(confirm)"
            value={this.state.password_confirm}
            onChange={event => this.setState({password_confirm: event.target.value})}
            type="password"
            margin="normal"
          />
        </div>
        <div className={classes.root}>
          <Button color="primary" raised>
            Signup
          </Button>
        </div>
        <div>
          <Link to='/'>login</Link>
        </div>
      </div>
    )
  }
}

export default withStyles(styleSheet)(SignupView);
