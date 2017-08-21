import React from 'react'
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


class LoginView extends React.Component {
  state = {
    email: '',
    password: '',
  };

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <h4>Login</h4>
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
        <div className={classes.root}>
          <Button color="primary" onClick={event => this.props.loginAsync(this.state)} raised>
            Login
          </Button>
        </div>
        <div>
          <Link to='/signup'>signup</Link>
        </div>
      </div>
    )
  }
}

export default withStyles(styleSheet)(LoginView);
