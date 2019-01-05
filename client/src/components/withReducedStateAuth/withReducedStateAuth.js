import React, { Component } from 'react';
import { connect } from 'react-redux';
import hoistNonReactStatics from 'hoist-non-react-statics'
import { setAuthData, resetAuthData } from '../../actions/authActions';

export default function withReducedStateAuth(Component) {
  const mapStateToProps = (state) => ({
    globalAuth: state.auth
  })
  return connect(mapStateToProps, { setAuthData, resetAuthData })(Component)
}
