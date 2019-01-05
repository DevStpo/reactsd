import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import { resetAuthData } from '../../actions/authActions';

import withReducedStateAuth from '../withReducedStateAuth/withReducedStateAuth';
import Button from '@material-ui/core/Button';

class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  render() {
    if (this.state.authenticated === null) return null;

    const button = this.state.authenticated ?
      <Button
        onClick={() => {
          this.props.auth.logout()
          this.props.resetAuthData()
        }}
        variant="contained"
        color="primary">
        Logout
      </Button> :
      <Button onClick={() => this.props.auth.login()} variant="contained" color="primary">
        Login
      </Button>

    return (
      <div>
        {button}
      </div>
    );
  }
};

export default withReducedStateAuth(withAuth(LoginButton));
