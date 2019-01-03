import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthData } from '../../actions/authActions';
import { withAuth } from '@okta/okta-react';

import LoginForm from '../LoginForm/LoginForm';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      let that = this;
      this.props.auth.getUser().then(user=>that.props.setAuthData(user));
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  render() {
    if (this.state.authenticated === null) return null;
    return this.state.authenticated ?
      <Redirect to={{ pathname: '/dashboard' }}/> :
      <LoginForm baseUrl={this.props.baseUrl} />;
  }
};

const mapStateToProps = (state) => ({
  globalAuth: state.auth
});

export default connect(mapStateToProps, { setAuthData })(withAuth(Login));
