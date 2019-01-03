import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthData} from '../actions/authActions';

import Login from '../components/Login/Login';
import Auth0Lock from 'auth0-lock';
import { AUTH_CONFIG } from './auth0-variables';

class Auth extends Component {

  constructor(props) {
    super(props);

    this.onAuthenticated.bind(this);
    this.onAuthenticated();
  }

  lock = new Auth0Lock(AUTH_CONFIG.clientId, AUTH_CONFIG.domain, {
    auth: {
      responseType: 'token id_token',
      sso: false,
    },
    container: AUTH_CONFIG.container,
    theme: {
      primaryColor: '#3a99d8'
    }
  });

  onAuthenticated() {
    const that = this;
    this.lock.on('authenticated', (authResult) => {

      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('authResult', JSON.stringify(authResult));
      localStorage.setItem('isLoggedIn', true);

      that.props.setAuthData(authResult);
    });
  }

  componentDidMount() {
    if(!localStorage.getItem('isLoggedIn')) {
      this.lock.show()
    } else {
      this.props.setAuthData(JSON.parse(localStorage.getItem('authResult')));
    }
  }

  render() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const style = { marginTop: '32px' };

    console.log('AuthState', this.props.authState);
    console.log('LocalStorage', isLoggedIn);

    return(
      <div>
        {
          isLoggedIn ?
            React.Children.only(this.props.children) :
            <div id={AUTH_CONFIG.container} style={style}></div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authState: state.auth
});

export default connect(mapStateToProps, { setAuthData })(Auth);
